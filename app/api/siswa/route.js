export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET() {
    try {
        const ctx = getRequestContext();
        const dbPondok = ctx?.env?.DB_PONDOK;
        const dbMiu = ctx?.env?.DB_MIU;

        if (!dbPondok || !dbMiu) {
            return new Response(JSON.stringify({ error: "DB_BINDINGS_MISSING" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 1. Ambil data Santri Resmi (Hanya kolom yang pasti ada)
        const { results: santriPondok } = await dbPondok.prepare(`
            SELECT 
                stambuk_madrasah as nis, 
                nama_siswa as nama, 
                kelas, 
                kamar, 
                foto_santri as foto,
                'PUSAT' as asal_data
            FROM santri 
            WHERE madrasah LIKE '%MIU%'
            ORDER BY nama_siswa ASC
        `).all();

        // 2. Ambil data Siswa Lokal (Hanya kolom yang pasti ada)
        const { results: siswaLokal } = await dbMiu.prepare(`
            SELECT 
                nis, 
                nama, 
                kelas, 
                kamar, 
                foto_santri as foto,
                'LOKAL' as asal_data
            FROM siswa_lokal
            ORDER BY nama ASC
        `).all();

        // 3. Ambil data Absensi
        const { results: absensi } = await dbMiu.prepare(`
            SELECT nis_siswa, hadir, total_pertemuan FROM absensi_siswa
        `).all();

        // 4. Gabungkan Data
        const allSiswa = [...(santriPondok || []), ...(siswaLokal || [])];

        // 5. Konsolidasi data akhir
        const finalData = allSiswa
            .map(s => {
                const dataAbsen = absensi.find(a => a.nis_siswa === s.nis);
                const persentase = (dataAbsen && dataAbsen.total_pertemuan > 0)
                    ? Math.round((dataAbsen.hadir / dataAbsen.total_pertemuan) * 100)
                    : 100;

                return {
                    ...s,
                    kehadiran: persentase
                };
            })
            .sort((a, b) => a.nama.localeCompare(b.nama));

        return new Response(JSON.stringify(finalData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (e) {
        return new Response(JSON.stringify({ error: "API_REVERTED_ERROR", message: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
