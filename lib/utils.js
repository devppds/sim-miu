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
            // Filter Khusus Madrasah MIU (Ula, Wustho, Ulya)
            // Asumsi kolom madrasah bernama 'madrasah_diniyah' atau 'pendidikan_diniyah'
            // Kita gunakan LIKE agar mencakup variasi penulisan nama madrasah
            // Jika kolomnya berbeda, mohon diinfokan
            const queryTotal = `
                SELECT COUNT(*) as total 
                FROM santri 
                WHERE status_santri = 'Aktif' 
                AND (
                    madrasah_diniyah LIKE '%ULA%' OR 
                    madrasah_diniyah LIKE '%WUSTHO%' OR 
                    madrasah_diniyah LIKE '%ULYA%'
                )
            `;

            const santriResult = await getSantriData(queryTotal);
            const totalSantri = santriResult[0]?.total || 0;

            // Get Santri per Kelas Distribution (Filtered for MIU)
            const queryKelas = `
                SELECT kelas_diniyah as kelas, COUNT(*) as count 
                FROM santri 
                WHERE status_santri = 'Aktif'
                AND (
                    madrasah_diniyah LIKE '%ULA%' OR 
                    madrasah_diniyah LIKE '%WUSTHO%' OR 
                    madrasah_diniyah LIKE '%ULYA%'
                )
                GROUP BY kelas_diniyah 
                ORDER BY kelas_diniyah ASC
            `;
            const kelasResult = await getSantriData(queryKelas);

            return {
                santriTotal: totalSantri > 0 ? totalSantri : 0,
                ustadzTotal: 85,    // Dummy (belum ada tabel ustadz)
                keuanganTotal: 45000000, // Dummy
                kasTotal: 12500000, // Dummy
                santriChart: kelasResult.length > 0 ? kelasResult : []
            };
        } catch (e) {
            console.error("API Error getQuickStats:", e);
            // Return Safe Fallback
            return {
                santriTotal: 0,
                ustadzTotal: 0,
                keuanganTotal: 0,
                kasTotal: 0,
                santriChart: []
            };
        }
    }

    // --- 2. Data Transaksi/Arus Kas (Dari DB MIU - Nanti) ---
    if (endpoint === 'getData' && data?.type === 'arus_kas') {
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
