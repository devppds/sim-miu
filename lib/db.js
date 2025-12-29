export const runtime = 'edge';

export async function getRequestContext() {
    const { getRequestContext } = await import('@cloudflare/next-on-pages');
    return getRequestContext();
}

/**
 * Mendapatkan data Santri dari Database Pondok Pusat (sim-ppds-db-v2)
 */
export async function getSantriData(query, params = []) {
    try {
        const ctx = await getRequestContext();
        const db = ctx.env.DB_PONDOK; // Menggunakan binding DB_PONDOK

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
 * Untuk data keuangan, nilai, dan data spesifik MIU lainnya.
 */
export async function getMiuData(query, params = []) {
    try {
        const ctx = await getRequestContext();
        const db = ctx.env.DB_MIU; // Menggunakan binding DB_MIU

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
