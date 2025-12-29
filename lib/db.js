export const runtime = 'edge';

export async function getRequestContext() {
    const { getRequestContext } = await import('@cloudflare/next-on-pages');
    return getRequestContext();
}

/**
 * Execute a key-value query for simple storage or fallback
 */
export async function getD1Data(query, params = []) {
    try {
        if (process.env.NODE_ENV === 'development') {
            console.log('Running in dev mode, returning mock data or empty');
            // In real local dev with wrangler, you'd connect differently
            return null;
        }

        const ctx = await getRequestContext();
        const db = ctx.env.DB;

        if (!db) {
            console.error('DB binding not found');
            return null;
        }

        const result = await db.prepare(query).bind(...params).all();
        return result.results;
    } catch (error) {
        console.error('D1 Query Error:', error);
        return null;
    }
}
