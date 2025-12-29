export const runtime = 'edge';

import { getSantriData, getMiuData } from '@/lib/db';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    // --- 1. Statistik Dashboard (Santri MIU) ---
    if (type === 'stats') {
        try {
            const queryTotal = `
            SELECT COUNT(*) as total 
            FROM santri 
            WHERE status_santri = 'Aktif' 
            AND madrasah = 'MIU'
        `;

            const santriResult = await getSantriData(queryTotal);
            const totalSantri = santriResult[0]?.total || 0;

            const queryKelas = `
            SELECT kelas as kelas, COUNT(*) as count 
            FROM santri 
            WHERE status_santri = 'Aktif'
            AND madrasah = 'MIU'
            GROUP BY kelas 
            ORDER BY kelas ASC
        `;
            const kelasResult = await getSantriData(queryKelas);

            return Response.json({
                santriTotal: totalSantri,
                ustadzTotal: 85, // Dummy
                keuanganTotal: 45000000,
                kasTotal: 12500000,
                santriChart: kelasResult
            });
        } catch (e) {
            console.error("API Error stats:", e);
            return Response.json({ error: e.message }, { status: 500 });
        }
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
        return Response.json(dummyData);
    }

    return Response.json({ message: 'Invalid type param' }, { status: 400 });
}
