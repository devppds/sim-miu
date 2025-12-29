export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';

/**
 * Mendapatkan data Santri dari Database Pondok Pusat (sim-ppds-db-v2)
 */
export async function getSantriData(query, params = []) {
    try {
        const ctx = getRequestContext();
        const db = ctx.env.DB_PONDOK;

        if (!db) {
            console.error('DB_PONDOK binding not found. Ensure you are running on Cloudflare Pages.');
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
        const ctx = getRequestContext();
        const db = ctx.env.DB_MIU;

        if (!db) {
            console.error('DB_MIU binding not found. Ensure you are running on Cloudflare Pages.');
            return [];
        }

        const result = await db.prepare(query).bind(...params).all();
        return result.results;
    } catch (error) {
        console.error('Error fetching data from DB_MIU:', error);
        return [];
    }
}
