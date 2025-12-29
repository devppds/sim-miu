export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';

/**
 * Mendapatkan data dari Database dengan penanganan error yang lebih aman
 */
export async function getSantriData(query, params = []) {
    try {
        const ctx = getRequestContext();
        const db = ctx?.env?.DB_PONDOK;

        if (!db) {
            console.warn('DB_PONDOK connection failed: context or environment missing.');
            return null; // Mengembalikan null agar API bisa mendeteksi error binding
        }

        const result = await db.prepare(query).bind(...params).all();
        return result.results;
    } catch (error) {
        console.error('Database Query Error (DB_PONDOK):', error.message);
        throw error; // Lempar error agar ditangkap oleh route.js
    }
}

/**
 * Operasional Database Lokal MIU (sim-miu)
 */
export async function getMiuData(query, params = []) {
    try {
        const ctx = getRequestContext();
        const db = ctx?.env?.DB_MIU;

        if (!db) {
            console.warn('DB_MIU connection failed: context or environment missing.');
            return null;
        }

        const result = await db.prepare(query).bind(...params).all();
        return result.results;
    } catch (error) {
        console.error('Database Query Error (DB_MIU):', error.message);
        throw error;
    }
}
