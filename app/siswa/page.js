'use client';

import React from 'react';
import SortableTable from '@/components/SortableTable';

export default function DataSiswaPage() {
    // Dummy data for now, waiting for real API integration
    const data = [
        { id: 1, nama: 'Ahmad Fulan', nis: '12345', kelas: '1 Ula', status: 'Aktif' },
        { id: 2, nama: 'Siti Fulana', nis: '12346', kelas: '2 Ula', status: 'Aktif' },
        { id: 3, nama: 'Budi Santoso', nis: '12347', kelas: '1 Wustho', status: 'Aktif' },
    ];

    return (
        <div className="view-container animate-in">
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>Data Siswa</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manajemen data siswa Madrasah Ihya' Ulumuddin</p>
                </div>
                <button className="btn btn-primary">
                    <i className="fas fa-plus" style={{ marginRight: '8px' }}></i> Tambah Siswa
                </button>
            </div>

            <div className="card">
                <SortableTable
                    columns={[
                        { key: 'nis', label: 'NIS', render: (row) => <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{row.nis}</span> },
                        { key: 'nama', label: 'Nama Lengkap', render: (row) => <span style={{ fontWeight: 600 }}>{row.nama}</span> },
                        { key: 'kelas', label: 'Kelas' },
                        {
                            key: 'status',
                            label: 'Status',
                            render: (row) => (
                                <span className={`badge ${row.status === 'Aktif' ? 'badge-success' : 'badge-danger'}`}>
                                    {row.status}
                                </span>
                            )
                        }
                    ]}
                    data={data}
                    loading={false}
                    emptyMessage="Tidak ada data siswa."
                />
            </div>
        </div>
    );
}
