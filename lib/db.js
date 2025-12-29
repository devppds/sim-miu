export const runtime = 'edge';

/**
 * Mendapatkan data Santri dari Database Pondok Pusat (sim-ppds-db-v2)
 */
export async function getSantriData(query, params = []) {
    try {
        if (typeof window !== 'undefined') {
            console.error('SERVER ACTION CALLED FROM CLIENT SIDE');
            return [];
        }

        const { getRequestContext } = await import('@cloudflare/next-on-pages');
        const ctx = getRequestContext();
        const db = ctx.env.DB_PONDOK;

        if (!db) {
            console.error('DB_PONDOK binding not found');
            return [];
        }

        const result = await db.prepare(query).bind(...params).all();
        return result.results;
    } catch (error) {
        console.error('Error fetching data from DB_PONDOK:', error);
        return [];
    }
}

/**
 * Operasional Database Lokal MIU (sim-miu)
 */
export async function getMiuData(query, params = []) {
    try {
        if (typeof window !== 'undefined') {
            return [];
        }

        const { getRequestContext } = await import('@cloudflare/next-on-pages');
        const ctx = getRequestContext();
        const db = ctx.env.DB_MIU;

        if (!db) {
            console.error('DB_MIU binding not found');
            return [];
        }

        const result = await db.prepare(query).bind(...params).all();
        return result.results;
    } catch (error) {
        console.error('Error fetching data from DB_MIU:', error);
        return [];
    }
}
