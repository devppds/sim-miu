export const runtime = 'edge';

import { getRequestContext } from '@cloudflare/next-on-pages';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    try {
        const ctx = getRequestContext();

        if (!ctx || !ctx.env) {
            return new Response(JSON.stringify({ error: "CONTEXT_MISSING" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }

        // --- 1. Statistik Dashboard (Santri MIU) ---
        if (type === 'stats') {
            const db = ctx.env.DB_PONDOK;
            if (!db) return new Response(JSON.stringify({ error: "DB_PONDOK_MISSING" }), { status: 500, headers: { 'Content-Type': 'application/json' } });

            const { results: countRes } = await db.prepare(`SELECT COUNT(*) as total FROM santri WHERE madrasah LIKE '%MIU%'`).all();
            const totalSantri = countRes[0]?.total || 0;

            const { results: kelasRes } = await db.prepare(`SELECT kelas as kelas, COUNT(*) as count FROM santri WHERE madrasah LIKE '%MIU%' GROUP BY kelas ORDER BY kelas ASC`).all();

            return new Response(JSON.stringify({
                santriTotal: totalSantri,
                ustadzTotal: 85,
                keuanganTotal: 45000000,
                kasTotal: 12500000,
                santriChart: kelasRes
            }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        // --- 2. Data Transaksi/Arus Kas (Dummy) ---
        if (type === 'arus_kas') {
            const dummyData = [
                { id: 1, kategori: 'SPP Santri', keterangan: 'Pembayaran SPP Bulan Ini', nominal: 1500000, tipe: 'Masuk', tanggal: new Date().toISOString() },
                { id: 2, kategori: 'Operasional', keterangan: 'Beli ATK', nominal: 250000, tipe: 'Keluar', tanggal: new Date().toISOString() },
                { id: 3, kategori: 'Donasi', keterangan: 'Donasi Hamba Allah', nominal: 5000000, tipe: 'Masuk', tanggal: new Date().toISOString() },
                { id: 4, kategori: 'Gaji', keterangan: 'Gaji Staff Kebersihan', nominal: 1500000, tipe: 'Keluar', tanggal: new Date().toISOString() },
                { id: 5, kategori: 'Pembangunan', keterangan: 'Semen 50 Sak', nominal: 3000000, tipe: 'Keluar', tanggal: new Date().toISOString() },
            ];
            return new Response(JSON.stringify(dummyData), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify({ message: 'Invalid type param' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

    } catch (e) {
        return new Response(JSON.stringify({ error: "RUNTIME_ERROR", message: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
