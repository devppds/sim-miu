export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET() {
    try {
        const ctx = getRequestContext();

        // Cek apakah env tersedia
        if (!ctx || !ctx.env) {
            return Response.json({
                error: "Konfigurasi Cloudflare Error",
                details: "Aplikasi tidak bisa mendeteksi environment (RequestContext is empty)"
            }, { status: 500 });
        }

        const db = ctx.env.DB_PONDOK;
        if (!db) {
            return Response.json({
                error: "Database Tidak Terhubung",
                details: "Binding 'DB_PONDOK' tidak ditemukan. Pastikan sudah klik 'Save' di dashboard Cloudflare dan lakukan Redeploy."
            }, { status: 500 });
        }

        // Query test paling sederhana tanpa filter apapun
        const query = "SELECT * FROM santri WHERE madrasah LIKE '%MIU%' LIMIT 50";
        const result = await db.prepare(query).all();

        return Response.json({
            success: true,
            count: result.results.length,
            data: result.results,
            debug_info: {
                has_db_pondok: !!ctx.env.DB_PONDOK,
                has_db_miu: !!ctx.env.DB_MIU,
                env_keys: Object.keys(ctx.env)
            }
        });

    } catch (e) {
        return Response.json({
            error: "Gagal Query",
            message: e.message,
            stack: e.stack
        }, { status: 500 });
    }
}
