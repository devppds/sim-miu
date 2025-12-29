'use client';

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
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{
                        fontSize: '2.25rem',
                        fontWeight: 900,
                        fontFamily: 'Outfit, sans-serif',
                        color: 'var(--text-main)',
                        letterSpacing: '-1px'
                    }}>
                        Manajemen Akademik
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500 }}>
                        Kelola kurikulum, rombongan belajar, dan penugasan wali kelas.
                    </p>
                </div>
                <button className="btn btn-primary">
                    <i className="fas fa-plus" style={{ marginRight: '8px' }}></i> Buka Kelas Baru
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div className="card" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', color: 'white', border: 'none' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.8, textTransform: 'uppercase' }}>Total Kelas</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800 }}>12</div>
                </div>
                <div className="card">
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rata-rata Siswa/Kelas</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800 }}>24.5</div>
                </div>
                <div className="card">
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Kurikulum Aktif</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>K-Madrasah 2024</div>
                </div>
            </div>

            <div className="card" style={{ padding: '0' }}>
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-light)' }}>
                    <h3 style={{ fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Daftar Rombongan Belajar (Rombel)</h3>
                </div>
                <SortableTable
                    columns={[
                        {
                            key: 'kode',
                            label: 'ID Kelas',
                            render: (row) => <span style={{ fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>{row.kode}</span>
                        },
                        {
                            key: 'nama',
                            label: 'Nama Kelas',
                            render: (row) => (
                                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{row.nama}</div>
                            )
                        },
                        {
                            key: 'wali',
                            label: 'Wali Kelas',
                            render: (row) => (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <i className="fas fa-user-tie" style={{ color: '#64748b', fontSize: '0.8rem' }}></i>
                                    </div>
                                    <span style={{ fontWeight: 600 }}>{row.wali}</span>
                                </div>
                            )
                        },
                        {
                            key: 'jumlah',
                            label: 'Kapasitas',
                            render: (row) => (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontWeight: 800 }}>{row.jumlah} / 30</span>
                                    <div style={{ width: '60px', height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ width: `${(row.jumlah / 30) * 100}%`, height: '100%', background: 'var(--success)' }}></div>
                                    </div>
                                </div>
                            )
                        },
                        {
                            key: 'aksi',
                            label: 'Opsi',
                            render: (row) => (
                                <button style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>
                                    Kelola <i className="fas fa-external-link-alt" style={{ marginLeft: '4px', fontSize: '0.7rem' }}></i>
                                </button>
                            )
                        }
                    ]}
                    data={data}
                    loading={false}
                />
            </div>
        </div>
    );
}
