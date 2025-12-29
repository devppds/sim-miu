'use client';

import React, { useEffect, useState } from 'react';
import SortableTable from '@/components/SortableTable';
import { apiCall } from '@/lib/utils';

export default function DataSiswaPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');

    const fetchSiswa = async () => {
        setLoading(true);
        try {
            const result = await apiCall('getSiswa');
            setData(result || []);
        } catch (err) {
            console.error("Failed to fetch siswa", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredData = data.filter(item =>
        item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nis?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kelas?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAction = (type, row) => {
        alert(`${type} untuk: ${row.nama}\nNIS: ${row.nis}\nFitur ini sedang dalam tahap pengembangan.`);
    };

    useEffect(() => {
        fetchSiswa();
    }, []);

    return (
        <div className="view-container animate-in">
            {/* Page Header */}
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{
                        fontSize: '2.25rem',
                        fontWeight: 900,
                        fontFamily: 'Outfit, sans-serif',
                        color: 'var(--text-main)',
                        letterSpacing: '-1px'
                    }}>
                        Data Master Siswa
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        <span className="badge badge-success">Unit MIU</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>
                            Manajemen database seluruh santri Madrasah Ihya' Ulumuddin.
                        </span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        className="btn"
                        onClick={fetchSiswa}
                        disabled={loading}
                        style={{ background: 'white', border: '1px solid var(--border-medium)', color: 'var(--text-main)' }}
                    >
                        <i className={`fas fa-sync ${loading ? 'fa-spin' : ''}`} style={{ marginRight: '8px' }}></i>
                        Refresh
                    </button>
                    <button className="btn btn-primary" onClick={() => alert('Fitur Tambah Siswa Baru akan segera diaktifkan.')}>
                        <i className="fas fa-user-plus" style={{ marginRight: '8px' }}></i> Tambah Siswa Baru
                    </button>
                </div>
            </div>

            {/* Stats Row for Siswa */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                        <i className="fas fa-users"></i>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Siswa</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{data.length}</div>
                    </div>
                </div>
                <div className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: '#10b981', display: 'flex', alignItems: 'center', justifyCenter: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rata-rata Kehadiran</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                            {data.length > 0 ? Math.round(data.reduce((acc, curr) => acc + (curr.kehadiran || 0), 0) / data.length) : 0}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Data Table */}
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
                    <div style={{ position: 'relative', width: '350px' }}>
                        <i className="fas fa-search" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                        <input
                            type="text"
                            placeholder="Cari Nama, NIS, atau Kelas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 10px 10px 40px',
                                borderRadius: '10px',
                                border: '1px solid var(--border-medium)',
                                fontSize: '0.9rem',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn" style={{ padding: '8px 12px', background: '#f8fafc', border: '1px solid #e2e8f0' }} onClick={() => alert('Filter Lanjutan akan segera tersedia.')}>
                            <i className="fas fa-filter" style={{ marginRight: '6px' }}></i> Filter
                        </button>
                        <button className="btn" style={{ padding: '8px 12px', background: '#f8fafc', border: '1px solid #e2e8f0' }} onClick={() => alert('Data sedang disiapkan untuk export Excel/PDF.')}>
                            <i className="fas fa-file-export" style={{ marginRight: '6px' }}></i> Export
                        </button>
                    </div>
                </div>

                <SortableTable
                    columns={[
                        {
                            key: 'foto',
                            label: 'Profil',
                            render: (row) => (
                                <div style={{
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '10px',
                                    background: 'var(--border-light)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    border: '1px solid var(--border-medium)'
                                }}>
                                    <img
                                        src={row.foto ? row.foto : `https://ui-avatars.com/api/?name=${encodeURIComponent(row.nama)}&background=random&color=fff&bold=true`}
                                        alt={row.nama}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(row.nama)}&background=random&color=fff&bold=true`;
                                        }}
                                    />
                                </div>
                            )
                        },
                        {
                            key: 'nama',
                            label: 'Informasi Santri',
                            render: (row) => (
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>{row.nama}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>NIS: {row.nis}</div>
                                </div>
                            )
                        },
                        {
                            key: 'kelas',
                            label: 'Akademik',
                            render: (row) => (
                                <div>
                                    <div style={{ fontWeight: 600 }}>{row.kelas}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Kamar {row.kamar || '-'}</div>
                                </div>
                            )
                        },
                        {
                            key: 'asal_data',
                            label: 'Asal',
                            render: (row) => (
                                <span style={{
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                    fontSize: '0.65rem',
                                    fontWeight: 900,
                                    background: row.asal_data === 'LOKAL' ? '#fef3c7' : '#e0e7ff',
                                    color: row.asal_data === 'LOKAL' ? '#92400e' : '#3730a3',
                                    border: `1px solid ${row.asal_data === 'LOKAL' ? '#f59e0b' : '#3b82f6'}`
                                }}>
                                    {row.asal_data}
                                </span>
                            )
                        },
                        {
                            key: 'kehadiran',
                            label: 'Kehadiran',
                            render: (row) => (
                                <div style={{ minWidth: '120px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: row.kehadiran < 80 ? 'var(--danger)' : 'var(--success)' }}>
                                            {row.kehadiran}%
                                        </span>
                                    </div>
                                    <div style={{
                                        height: '6px',
                                        width: '100%',
                                        background: '#f1f5f9',
                                        borderRadius: '10px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${row.kehadiran}%`,
                                            background: row.kehadiran < 80 ? 'var(--danger)' : 'var(--success)',
                                            borderRadius: '10px',
                                            transition: 'width 1s ease-in-out'
                                        }}></div>
                                    </div>
                                </div>
                            )
                        },
                        {
                            key: 'aksi',
                            label: 'Aksi',
                            render: (row) => (
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="action-btn" title="Detail" onClick={() => handleAction('Detail Profil', row)}><i className="fas fa-eye"></i></button>
                                    <button className="action-btn edit" title="Ubah" onClick={() => handleAction('Edit Data', row)}><i className="fas fa-pencil-alt"></i></button>
                                </div>
                            )
                        }
                    ]}
                    data={filteredData}
                    loading={loading}
                    emptyMessage={searchTerm ? `Tidak ditemukan siswa dengan kata kunci "${searchTerm}"` : "Tidak ada data siswa ditemukan untuk unit MIU."}
                />
            </div>

            <style jsx>{`
                .action-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    border: 1px solid var(--border-medium);
                    background: white;
                    color: var(--text-muted);
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .action-btn:hover {
                    background: var(--primary);
                    color: white;
                    border-color: var(--primary);
                }
                .action-btn.edit:hover {
                    background: #f59e0b;
                    border-color: #f59e0b;
                }
            `}</style>
        </div>
    );
}
