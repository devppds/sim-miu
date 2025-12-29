export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
};

export const apiCall = async (endpoint, method = 'GET', data = null) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (endpoint === 'getQuickStats') {
        return {
            santriTotal: 1250,
            ustadzTotal: 85,
            keuanganTotal: 45000000,
            kasTotal: 12500000,
            santriChart: [
                { kelas: 'Kelas 1', count: 200 },
                { kelas: 'Kelas 2', count: 180 },
                { kelas: 'Kelas 3', count: 220 },
                { kelas: 'Kelas 4', count: 250 },
                { kelas: 'Kelas 5', count: 200 },
                { kelas: 'Kelas 6', count: 200 },
            ]
        };
    }

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
