'use client';

import React, { useEffect, useState } from 'react';
import SortableTable from '@/components/SortableTable';
import { apiCall } from '@/lib/utils';

export default function DataSiswaPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        fetchSiswa();
    }, []);

    return (
        <div className="view-container animate-in">
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>Data Siswa</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manajemen data santri unit <strong>MIU</strong></p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 0 }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL:</span>
                        <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>{data.length}</span>
                    </div>
                    <button className="btn btn-primary" onClick={fetchSiswa} disabled={loading}>
                        <i className={`fas fa-sync ${loading ? 'fa-spin' : ''}`} style={{ marginRight: '8px' }}></i>
                        {loading ? 'Memuat...' : 'Refresh'}
                    </button>
                    <button className="btn btn-green">
                        <i className="fas fa-plus" style={{ marginRight: '8px' }}></i> Tambah
                    </button>
                </div>
            </div>

            <div className="card" style={{ padding: '1rem' }}>
                <SortableTable
                    columns={[
                        {
                            key: 'foto',
                            label: 'Foto',
                            render: (row) => (
                                <div style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '10px',
                                    background: 'var(--bg-highlight)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    border: '2px solid #f1f5f9'
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
                            key: 'nis',
                            label: 'NIS / Stambuk',
                            render: (row) => <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary)' }}>{row.nis}</span>
                        },
                        {
                            key: 'nama',
                            label: 'Nama Lengkap',
                            render: (row) => (
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{row.nama}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {row.id}</div>
                                </div>
                            )
                        },
                        { key: 'kelas', label: 'Kelas' },
                        { key: 'kamar', label: 'Kamar' },
                        {
                            key: 'status',
                            label: 'Status MB',
                            render: (row) => (
                                <span className={`badge ${row.status === 'MB' ? 'badge-success' : 'badge-secondary'}`} style={{ borderRadius: '6px', fontSize: '0.7rem' }}>
                                    {row.status === 'MB' ? 'MAHA SANTRI' : 'BUKAN MB'}
                                </span>
                            )
                        },
                        {
                            key: 'aksi',
                            label: 'Aksi',
                            render: (row) => (
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <button className="btn-icon" title="Detail" style={{ background: '#eff6ff', color: '#2563eb' }}>
                                        <i className="fas fa-eye"></i>
                                    </button>
                                    <button className="btn-icon" title="Edit" style={{ background: '#fef3c7', color: '#d97706' }}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn-icon" title="Hapus" style={{ background: '#fee2e2', color: '#dc2626' }}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            )
                        }
                    ]}
                    data={data}
                    loading={loading}
                    emptyMessage="Tidak ada data siswa ditemukan untuk unit MIU."
                />
            </div>

            <style jsx>{`
                .btn-green {
                    background: #10b981;
                    color: white;
                }
                .btn-green:hover {
                    background: #059669;
                }
                .btn-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    border: none;
                    display: flex;
                    alignItems: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.85rem;
                }
                .btn-icon:hover {
                    transform: translateY(-2px);
                    filter: brightness(0.95);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
            `}</style>
        </div>
    );
}
