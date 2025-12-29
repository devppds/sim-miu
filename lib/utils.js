import { getSantriData, getMiuData } from './db';

// Format Data
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
};

// API Call Handler
export const apiCall = async (endpoint, method = 'GET', data = null) => {

    // --- 1. Statistik Dashboard (Mengambil Santri dr DB Pondok) ---
    if (endpoint === 'getQuickStats') {
        try {
            // Count Real Santri from DB_PONDOK
            // Asumsi tabel bernama 'santri' dan ada kolom 'status' = 'Aktif'
            // Kita perlu menyesuaikan nama tabel jika berbeda. Default: santri
            const santriResult = await getSantriData("SELECT COUNT(*) as total FROM santri WHERE status = 'Aktif'");
            const totalSantri = santriResult[0]?.total || 0;

            // Get Santri per Kelas Distribution
            // Asumsi kolom kelas bernama 'kelas'
            const kelasResult = await getSantriData("SELECT kelas, COUNT(*) as count FROM santri WHERE status = 'Aktif' GROUP BY kelas ORDER BY kelas ASC");

            // Dummy Data untuk Keuangan (karena DB_MIU masih kosong)
            return {
                santriTotal: totalSantri > 0 ? totalSantri : 1250, // Fallback ke dummy jika DB kosong/error
                ustadzTotal: 85,    // Dummy
                keuanganTotal: 45000000, // Dummy (nanti ambil dr DB_MIU)
                kasTotal: 12500000, // Dummy
                santriChart: kelasResult.length > 0 ? kelasResult : [
                    { kelas: 'Kelas 1', count: 200 },
                    { kelas: 'Kelas 2', count: 180 },
                    { kelas: 'Kelas 3', count: 220 },
                ] // Fallback
            };
        } catch (e) {
            console.error("API Error getQuickStats:", e);
            // Return Dummy on Error
            return {
                santriTotal: 1250,
                ustadzTotal: 85,
                keuanganTotal: 45000000,
                kasTotal: 12500000,
                santriChart: []
            };
        }
    }

    // --- 2. Data Transaksi/Arus Kas (Dari DB MIU - Nanti) ---
    if (endpoint === 'getData' && data?.type === 'arus_kas') {
        // Saat ini masih dummy karena tabel belum dibuat di DB_MIU
        return [
            { id: 1, kategori: 'SPP Santri', keterangan: 'Pembayaran SPP Bulan Ini', nominal: 1500000, tipe: 'Masuk', tanggal: new Date().toISOString() },
            { id: 2, kategori: 'Operasional', keterangan: 'Beli ATK', nominal: 250000, tipe: 'Keluar', tanggal: new Date().toISOString() },
            { id: 3, kategori: 'Donasi', keterangan: 'Donasi Hamba Allah', nominal: 5000000, tipe: 'Masuk', tanggal: new Date().toISOString() },
            { id: 4, kategori: 'Gaji', keterangan: 'Gaji Staff Kebersihan', nominal: 1500000, tipe: 'Keluar', tanggal: new Date().toISOString() },
            { id: 5, kategori: 'Pembangunan', keterangan: 'Semen 50 Sak', nominal: 3000000, tipe: 'Keluar', tanggal: new Date().toISOString() },
        ];
    }

    return null;
};
