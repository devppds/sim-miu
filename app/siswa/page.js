'use client';

import React, { useEffect, useState } from 'react';
import SortableTable from '@/components/SortableTable';
import { apiCall } from '@/lib/utils';

export default function DataSiswaPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [selectedSiswa, setSelectedSiswa] = useState(null);

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
        if (type === 'Detail Profil') {
            setSelectedSiswa(row);
            setShowModal(true);
        } else {
            alert(`${type} untuk: ${row.nama}\nNIS: ${row.nis}\nFitur ini sedang dalam tahap pengembangan.`);
        }
    };

    useEffect(() => {
        fetchSiswa();
    }, []);

    const StudentDetailModal = ({ siswa, onClose }) => {
        if (!siswa) return null;

        const openWhatsApp = (phone) => {
            if (!phone) return;
            const cleaned = phone.replace(/\D/g, '');
            const formatted = cleaned.startsWith('0') ? '62' + cleaned.substring(1) : cleaned;
            window.open(`https://wa.me/${formatted}`, '_blank');
        };

        return (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content animate-pop" onClick={e => e.stopPropagation()}>
                    {/* Modal Header with Gradient Background */}
                    <div style={{
                        background: 'linear-gradient(135deg, var(--primary) 0%, #3b82f6 100%)',
                        padding: '2.5rem 2rem',
                        color: 'white',
                        position: 'relative'
                    }}>
                        <button className="close-btn" onClick={onClose}>&times;</button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '24px',
                                background: 'white',
                                padding: '4px',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                            }}>
                                <img
                                    src={siswa.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(siswa.nama)}&background=random&color=fff&size=100`}
                                    style={{ width: '100%', height: '100%', borderRadius: '20px', objectFit: 'cover' }}
                                    alt={siswa.nama}
                                />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif' }}>{siswa.nama}</h2>
                                <p style={{ opacity: 0.9, fontWeight: 600 }}>NIS: {siswa.nis} • {siswa.asal_data} DATA</p>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>{siswa.kelas}</span>
                                    <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700 }}>Kamar {siswa.kamar || '-'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal Body */}
                    <div style={{ padding: '2rem', background: '#f8fafc' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {/* Personal Info */}
                            <div>
                                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Informasi Personal</h4>
                                <div className="info-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <div>
                                        <span>Alamat</span>
                                        <strong>{siswa.alamat || 'Cilacap, Jawa Tengah'}</strong>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <i className="fas fa-birthday-cake"></i>
                                    <div>
                                        <span>Tempat, Tgl Lahir</span>
                                        <strong>{siswa.tempat_lahir || 'Cilacap'}, {siswa.tanggal_lahir || '-'}</strong>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <i className="fas fa-chart-line"></i>
                                    <div>
                                        <span>Status Kehadiran</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                                            <div style={{ flex: 1, height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                                                <div style={{ width: `${siswa.kehadiran}%`, height: '100%', background: 'var(--success)' }}></div>
                                            </div>
                                            <strong style={{ fontSize: '0.9rem', color: 'var(--success)' }}>{siswa.kehadiran}%</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Family Info */}
                            <div>
                                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>Data Orang Tua</h4>
                                <div className="info-item">
                                    <i className="fas fa-user-friends"></i>
                                    <div>
                                        <span>Nama Ayah</span>
                                        <strong>{siswa.nama_ayah || '-'}</strong>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <i className="fas fa-female"></i>
                                    <div>
                                        <span>Nama Ibu</span>
                                        <strong>{siswa.nama_ibu || '-'}</strong>
                                    </div>
                                </div>
                                <div className="info-item" style={{ cursor: siswa.no_telp_ayah ? 'pointer' : 'default' }} onClick={() => openWhatsApp(siswa.no_telp_ayah)}>
                                    <i className="fab fa-whatsapp" style={{ color: '#25D366' }}></i>
                                    <div>
                                        <span>WhatsApp Orang Tua</span>
                                        <strong style={{ color: siswa.no_telp_ayah ? 'var(--primary)' : 'inherit' }}>{siswa.no_telp_ayah || '-'}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button className="btn" style={{ background: 'white', border: '1px solid #e2e8f0' }} onClick={onClose}>Tutup</button>
                            <button className="btn btn-primary" onClick={() => alert('Cetak Kartu Santri akan segera tersedia.')}>
                                <i className="fas fa-print" style={{ marginRight: '8px' }}></i> Cetak Kartu
                            </button>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(15, 23, 42, 0.6);
                        backdrop-filter: blur(8px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 1000;
                    }
                    .modal-content {
                        width: 100%;
                        max-width: 800px;
                        background: white;
                        border-radius: 32px;
                        overflow: hidden;
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    }
                    .close-btn {
                        position: absolute;
                        top: 1.5rem;
                        right: 1.5rem;
                        background: rgba(0,0,0,0.1);
                        border: none;
                        color: white;
                        font-size: 1.5rem;
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: 0.3s;
                    }
                    .close-btn:hover {
                        background: rgba(0,0,0,0.2);
                        transform: rotate(90deg);
                    }
                    .info-item {
                        display: flex;
                        gap: 12px;
                        margin-bottom: 1.25rem;
                        padding: 12px;
                        border-radius: 12px;
                        transition: 0.2s;
                    }
                    .info-item:hover {
                        background: white;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.03);
                    }
                    .info-item i {
                        width: 36px;
                        height: 36px;
                        background: white;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: var(--primary);
                        font-size: 0.9rem;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
                    }
                    .info-item span {
                        display: block;
                        font-size: 0.75rem;
                        color: var(--text-muted);
                        font-weight: 700;
                        text-transform: uppercase;
                        margin-bottom: 2px;
                    }
                    .info-item strong {
                        display: block;
                        font-size: 0.95rem;
                        color: var(--text-main);
                        font-weight: 700;
                    }
                    @keyframes pop {
                        from { transform: scale(0.95); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                    .animate-pop {
                        animation: pop 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    }
                `}</style>
            </div>
        );
    };

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
                        Database Siswa Terpadu
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        <span className="badge badge-success">UNIT MIU</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>
                            Konsolidasi data dari Pusat dan Unit Lokal secara real-time.
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

            {/* Main Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                        <i className="fas fa-users"></i>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Siswa</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{data.length}</div>
                    </div>
                </div>
                <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#f0fdf4', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rata-rata Kehadiran</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                            {data.length > 0 ? Math.round(data.reduce((acc, curr) => acc + (curr.kehadiran || 0), 0) / data.length) : 0}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
                    <div style={{ position: 'relative', width: '400px' }}>
                        <i className="fas fa-search" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                        <input
                            type="text"
                            placeholder="Cari Nama, NIS, atau Kelas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 48px',
                                borderRadius: '12px',
                                border: '1.5px solid var(--border-medium)',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: '0.3s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--border-medium)'}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn" style={{ padding: '10px 18px', background: '#f8fafc', border: '1px solid #e2e8f0' }} onClick={() => alert('Filter Lanjutan akan segera tersedia.')}>
                            <i className="fas fa-filter" style={{ marginRight: '8px' }}></i> Filter
                        </button>
                        <button className="btn" style={{ padding: '10px 18px', background: '#f8fafc', border: '1px solid #e2e8f0' }} onClick={() => alert('Data sedang disiapkan untuk export Excel/PDF.')}>
                            <i className="fas fa-file-export" style={{ marginRight: '8px' }}></i> Export
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
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: 'var(--border-light)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    border: '1.5px solid var(--border-medium)'
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
                                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>{row.nama}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>NIS: {row.nis}</div>
                                </div>
                            )
                        },
                        {
                            key: 'kelas',
                            label: 'Akademik',
                            render: (row) => (
                                <div>
                                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{row.kelas}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Kamar {row.kamar || '-'}</div>
                                </div>
                            )
                        },
                        {
                            key: 'asal_data',
                            label: 'Asal',
                            render: (row) => (
                                <span style={{
                                    padding: '6px 12px',
                                    borderRadius: '8px',
                                    fontSize: '0.7rem',
                                    fontWeight: 900,
                                    letterSpacing: '0.5px',
                                    background: row.asal_data === 'LOKAL' ? '#fff7ed' : '#f0f7ff',
                                    color: row.asal_data === 'LOKAL' ? '#9a3412' : '#1e40af',
                                    border: `1.5px solid ${row.asal_data === 'LOKAL' ? '#fdba74' : '#bfdbfe'}`
                                }}>
                                    {row.asal_data}
                                </span>
                            )
                        },
                        {
                            key: 'kehadiran',
                            label: 'Kehadiran',
                            render: (row) => (
                                <div style={{ minWidth: '140px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 900, color: row.kehadiran < 75 ? 'var(--danger)' : 'var(--success)' }}>
                                            {row.kehadiran}%
                                        </span>
                                    </div>
                                    <div style={{
                                        height: '8px',
                                        width: '100%',
                                        background: '#f1f5f9',
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${row.kehadiran}%`,
                                            background: row.kehadiran < 75 ? 'var(--danger)' : 'var(--success)',
                                            borderRadius: '10px',
                                            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                            boxShadow: '0 0 10px rgba(16, 185, 129, 0.2)'
                                        }}></div>
                                    </div>
                                </div>
                            )
                        },
                        {
                            key: 'aksi',
                            label: 'Aksi',
                            render: (row) => (
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button className="action-btn" title="Detail Profil" onClick={() => handleAction('Detail Profil', row)}>
                                        <i className="fas fa-id-card"></i>
                                    </button>
                                    <button className="action-btn edit" title="Edit Data" onClick={() => handleAction('Edit Data', row)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                </div>
                            )
                        }
                    ]}
                    data={filteredData}
                    loading={loading}
                    emptyMessage={searchTerm ? `Tidak ditemukan siswa dengan kata kunci "${searchTerm}"` : "Tidak ada data siswa ditemukan untuk unit MIU."}
                />
            </div>

            {/* Modal Detail */}
            {showModal && (
                <StudentDetailModal
                    siswa={selectedSiswa}
                    onClose={() => setShowModal(false)}
                />
            )}

            <style jsx>{`
                .action-btn {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    border: 1.5px solid var(--border-medium);
                    background: white;
                    color: var(--text-muted);
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.9rem;
                }
                .action-btn:hover {
                    background: var(--primary);
                    color: white;
                    border-color: var(--primary);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px var(--primary-glow);
                }
                .action-btn.edit:hover {
                    background: #f59e0b;
                    border-color: #f59e0b;
                    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
                }
            `}</style>
        </div>
    );
}
