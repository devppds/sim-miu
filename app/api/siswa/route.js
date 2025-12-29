export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET() {
    try {
        const ctx = getRequestContext();

        // Cek apakah env tersedia
        if (!ctx || !ctx.env) {
            return Response.json({ error: "Environment not found" }, { status: 500 });
        }

        const db = ctx.env.DB_PONDOK;
        if (!db) {
            return Response.json({ error: "DB_PONDOK binding missing" }, { status: 500 });
        }

        // Query riil sesuai screenshot database Anda
        const query = `
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
        `;

        const result = await db.prepare(query).all();

        // Kita kembalikan ARRAY LANGSUNG agar kompatibel dengan Tabel di UI
        return Response.json(result.results || []);

    } catch (e) {
        console.error("API Error:", e);
        return Response.json({ error: e.message }, { status: 500 });
    }
}
