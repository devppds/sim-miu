export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET() {
    try {
        const ctx = getRequestContext();
        const db = ctx?.env?.DB_PONDOK;

        if (!db) {
            return new Response(JSON.stringify({ error: "DB_BINDING_NOT_FOUND" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { results } = await db.prepare(`
            SELECT id, stambuk_madrasah as nis, nama_siswa as nama, kelas, kamar, status_mb as status
            FROM santri WHERE madrasah LIKE '%MIU%'
            ORDER BY nama_siswa ASC LIMIT 200
        `).all();

        return new Response(JSON.stringify(results || []), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (e) {
        return new Response(JSON.stringify({ error: "SQL_ERROR", message: e.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
