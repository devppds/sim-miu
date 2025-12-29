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

        // Ambil data paling simpel saja dulu untuk debugging
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
        `).all();

        const { results: absensi } = await dbMiu.prepare(`
            SELECT nis_siswa, hadir, total_pertemuan FROM absensi_siswa
        `).all();

        const finalData = (santriPondok || []).map(s => {
            const dataAbsen = absensi.find(a => a.nis_siswa === s.nis);
            const persentase = (dataAbsen && dataAbsen.total_pertemuan > 0)
                ? Math.round((dataAbsen.hadir / dataAbsen.total_pertemuan) * 100)
                : 100;
            return { ...s, kehadiran: persentase };
        });

        return new Response(JSON.stringify(finalData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (e) {
        return new Response(JSON.stringify({ error: "DEBUG_ERROR", message: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
