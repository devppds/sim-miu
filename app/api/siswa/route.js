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

        // 1. Ambil data Identitas dari DB_PONDOK
        const { results: santri } = await dbPondok.prepare(`
            SELECT id, stambuk_madrasah as nis, nama_siswa as nama, kelas, kamar, foto_santri as foto
            FROM santri WHERE madrasah LIKE '%MIU%'
            ORDER BY nama_siswa ASC LIMIT 200
        `).all();

        // 2. Ambil data Absensi dari DB_MIU
        const { results: absensi } = await dbMiu.prepare(`
            SELECT nis_siswa, hadir, total_pertemuan FROM absensi_siswa
        `).all();

        // 3. Gabungkan data di tingkat aplikasi (Client-side Join)
        const mergedData = santri.map(s => {
            const dataAbsen = absensi.find(a => a.nis_siswa === s.nis);
            const persentase = dataAbsen
                ? Math.round((dataAbsen.hadir / dataAbsen.total_pertemuan) * 100)
                : 100; // Default 100% jika data absen belum ada

            return {
                ...s,
                kehadiran: persentase
            };
        });

        return new Response(JSON.stringify(mergedData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (e) {
        return new Response(JSON.stringify({ error: "API_JOIN_ERROR", message: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
