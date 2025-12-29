// Format Data
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
};

// API Call Handler - Client Side Fetcher
export const apiCall = async (endpoint, method = 'GET', data = null) => {

    // --- 1. Statistik Dashboard ---
    if (endpoint === 'getQuickStats') {
        try {
            // Fetch from REAL API ROUTE
            const res = await fetch('/api/dashboard?type=stats');
            if (!res.ok) throw new Error('API Error');
            return await res.json();
        } catch (e) {
            console.error("API Error getQuickStats:", e);
            return {
                santriTotal: 0,
                ustadzTotal: 0,
                keuanganTotal: 0,
                kasTotal: 0,
                santriChart: []
            };
        }
    }

    // --- 2. Data Transaksi/Arus Kas ---
    if (endpoint === 'getData' && data?.type === 'arus_kas') {
        try {
            // Fetch from REAL API ROUTE
            const res = await fetch('/api/dashboard?type=arus_kas');
            if (!res.ok) throw new Error('API Error');
            return await res.json();
        } catch (e) {
            console.error("API Error aruskas:", e);
            return [];
        }
    }

    return null;
};
