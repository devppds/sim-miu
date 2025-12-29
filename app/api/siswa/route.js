export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET() {
    try {
        const ctx = getRequestContext();

        // Cek apakah context tersedia
        if (!ctx || !ctx.env) {
            return new Response(JSON.stringify({
                error: "CONTEXT_MISSING",
                message: "Cloudflare environment tidak terdeteksi."
            }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }

        // Cek apakah binding DB_PONDOK ada
        const db = ctx.env.DB_PONDOK;
        if (!db) {
            return new Response(JSON.stringify({
                error: "BINDING_MISSING",
                message: "Binding DB_PONDOK tidak ditemukan di ctx.env. Tersedia: " + Object.keys(ctx.env).join(', ')
            }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }

        // Jalankan query langsung
        const { results } = await db.prepare(`
            SELECT 
                id,
                stambuk_madrasah as nis, 
                nama_siswa as nama, 
                kelas, 
                kamar,
                status_mb as status,
                tahun_masuk
            FROM santri 
            WHERE madrasah LIKE '%MIU%'
            ORDER BY nama_siswa ASC
            LIMIT 200
        `).all();

        return new Response(JSON.stringify(results || []), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            }
        });

    } catch (e) {
        return new Response(JSON.stringify({
            error: "RUNTIME_ERROR",
            message: e.message,
            hint: "Pastikan tabel 'santri' memiliki kolom yang dipanggil."
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
