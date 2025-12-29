
import React from 'react';

import SortableTable from '@/components/SortableTable';

export default function AkademikPage() {
    const data = [
        { id: 1, kode: 'KLS-01', nama: 'Kelas 1 Ula', wali: 'Ustadz Abdullah', jumlah: 25 },
        { id: 2, kode: 'KLS-02', nama: 'Kelas 2 Ula', wali: 'Ustadz Hasan', jumlah: 23 },
        { id: 3, kode: 'KLS-03', nama: 'Kelas 1 Wustho', wali: 'Ustadz Husein', jumlah: 28 },
    ];

    return (
        <div className="view-container animate-in">
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>Akademik</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manajemen kelas dan kurikulum</p>
                </div>
                <button className="btn btn-primary">
                    <i className="fas fa-plus" style={{ marginRight: '8px' }}></i> Tambah Kelas
                </button>
            </div>

            <div className="card">
                <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Daftar Kelas Aktif</h3>
                <SortableTable
                    columns={[
                        { key: 'kode', label: 'Kode Kelas' },
                        { key: 'nama', label: 'Nama Kelas', render: (row) => <strong>{row.nama}</strong> },
                        { key: 'wali', label: 'Wali Kelas' },
                        { key: 'jumlah', label: 'Jumlah Santri', render: (row) => `${row.jumlah} Siswa` }
                    ]}
                    data={data}
                    loading={false}
                />
            </div>
        </div>
    );
}
