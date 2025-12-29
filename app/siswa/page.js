'use client';

import React, { useEffect, useState } from 'react';
import SortableTable from '@/components/SortableTable';
import { apiCall } from '@/lib/utils';

export default function DataSiswaPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSiswa = async () => {
            try {
                const result = await apiCall('getSiswa');
                setData(result || []);
            } catch (err) {
                console.error("Failed to fetch siswa", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSiswa();
    }, []);

    return (
        <div className="view-container animate-in">
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>Data Siswa</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Menampilkan data santri yang terdaftar di unit <strong>MIU</strong></p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 0 }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL:</span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>{data.length}</span>
                    </div>
                    <button className="btn btn-primary">
                        <i className="fas fa-sync" style={{ marginRight: '8px' }}></i> Refresh
                    </button>
                </div>
            </div>

            <div className="card">
                <SortableTable
                    columns={[
                        { key: 'nis', label: 'NIS / Stambuk', render: (row) => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{row.nis}</span> },
                        { key: 'nama', label: 'Nama Lengkap', render: (row) => <span style={{ fontWeight: 600 }}>{row.nama}</span> },
                        { key: 'kelas', label: 'Kelas' },
                        { key: 'kamar', label: 'Kamar' },
                        {
                            key: 'status',
                            label: 'Status MB',
                            render: (row) => (
                                <span className={`badge ${row.status === 'MB' ? 'badge-success' : 'badge-secondary'}`}>
                                    {row.status === 'MB' ? 'Maha Santri' : 'Bukan MB'}
                                </span>
                            )
                        }
                    ]}
                    data={data}
                    loading={loading}
                    emptyMessage="Tidak ada data siswa ditemukan untuk unit MIU."
                />
            </div>
        </div>
    );
}
