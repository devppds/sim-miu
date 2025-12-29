import { getRequestContext } from '@cloudflare/next-on-pages';

/**
 * Mendapatkan data dari Database dengan penanganan error yang lebih aman
 */
export async function getSantriData(query, params = []) {
    try {
        const ctx = getRequestContext();
        if (!ctx || !ctx.env) {
            console.error('Cloudflare Context not found');
            return null;
        }

        const db = ctx.env.DB_PONDOK;
        if (!db) {
            console.error('DB_PONDOK binding is missing in environment');
            return null;
        }

        const result = await db.prepare(query).bind(...params).all();
        return result.results;
    } catch (error) {
        console.error('DB_PONDOK Query Error:', error.message);
        throw error;
    }
}

/**
 * Operasional Database Lokal MIU (sim-miu)
 */
export async function getMiuData(query, params = []) {
    try {
        const ctx = getRequestContext();
        const db = ctx?.env?.DB_MIU;

        if (!db) return null;

        const result = await db.prepare(query).bind(...params).all();
        return result.results;
    } catch (error) {
        console.error('DB_MIU Query Error:', error.message);
        throw error;
    }
}
