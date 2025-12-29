export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET() {
    try {
        const ctx = getRequestContext();
        const dbPondok = ctx?.env?.DB_PONDOK;
        const dbMiu = ctx?.env?.DB_MIU;

        if (!dbPondok || !dbMiu) {
            return new Response(JSON.stringify({ error: "DATABASE_BINDINGS_MISSING" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 1. Ambil data Santri Pondok (Data Utama)
        let santriPondok = [];
        try {
            const { results } = await dbPondok.prepare(`
                SELECT 
                    stambuk_madrasah as nis, 
                    nama_siswa as nama, 
                    kelas, 
                    kamar, 
                    foto_santri as foto,
                    alamat,
                    nama_ayah,
                    nama_ibu,
                    no_telp_ayah,
                    tempat_lahir,
                    tanggal_lahir,
                    'PUSAT' as asal_data
                FROM santri 
                WHERE madrasah LIKE '%MIU%'
                ORDER BY nama_siswa ASC
            `).all();
            santriPondok = results || [];
        } catch (e) {
            console.error("Error fetching Pondok data:", e.message);
            // Fallback ke query paling dasar jika kolom tambahan gagal
            const { results } = await dbPondok.prepare(`
                SELECT stambuk_madrasah as nis, nama_siswa as nama, kelas, kamar FROM santri WHERE madrasah LIKE '%MIU%'
            `).all();
            santriPondok = results.map(s => ({ ...s, foto: null, asal_data: 'PUSAT' }));
        }

        // 2. Ambil data Siswa Lokal
        let siswaLokal = [];
        try {
            const { results } = await dbMiu.prepare(`SELECT * FROM siswa_lokal`).all();
            siswaLokal = results || [];
        } catch (e) {
            console.error("Error fetching Local data:", e.message);
        }

        // 3. Ambil data Absensi
        let absensi = [];
        try {
            const { results } = await dbMiu.prepare(`SELECT * FROM absensi_siswa`).all();
            absensi = results || [];
        } catch (e) {
            console.error("Error fetching Attendance data:", e.message);
        }

        // 4. Konsolidasi Data
        const allSiswa = [...santriPondok, ...siswaLokal];
        const finalData = allSiswa.map(s => {
            const dataAbsen = absensi.find(a => a.nis_siswa === s.nis);
            const persentase = (dataAbsen && dataAbsen.total_pertemuan > 0)
                ? Math.round((dataAbsen.hadir / dataAbsen.total_pertemuan) * 100)
                : 100;

            return {
                ...s,
                kehadiran: persentase,
                nama: s.nama || 'Tanpa Nama',
                nis: s.nis || '0000',
                foto: s.foto || null,
                asal_data: s.asal_data || 'LOKAL'
            };
        }).sort((a, b) => a.nama.localeCompare(b.nama));

        return new Response(JSON.stringify(finalData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (e) {
        return new Response(JSON.stringify({ error: "CRITICAL_API_FAILURE", message: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
