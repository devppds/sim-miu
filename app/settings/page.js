'use client';

import React from 'react';

export default function SettingsPage() {
    return (
        <div className="view-container animate-in">
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    fontFamily: 'Outfit, sans-serif',
                    color: 'var(--text-main)',
                    letterSpacing: '-1px'
                }}>
                    Konfigurasi Sistem
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>
                    Sesuaikan identitas dan parameter operasional SIM-MIU.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2.5rem' }}>
                {/* Modern Settings Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                        { id: 'umum', label: 'Informasi Umum', icon: 'fas fa-info-circle', active: true },
                        { id: 'akademik', label: 'Tahun Ajaran', icon: 'fas fa-calendar-alt' },
                        { id: 'db', label: 'Database & Backup', icon: 'fas fa-database' },
                        { id: 'security', label: 'Keamanan', icon: 'fas fa-shield-halved' },
                        { id: 'notif', label: 'Notifikasi & Bot', icon: 'fas fa-robot' }
                    ].map(item => (
                        <div key={item.id} style={{
                            padding: '14px 18px',
                            background: item.active ? 'var(--primary-light)' : 'transparent',
                            color: item.active ? 'var(--primary)' : 'var(--text-muted)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            transition: '0.3s'
                        }}>
                            <i className={item.icon} style={{ width: '20px', textAlign: 'center' }}></i>
                            {item.label}
                        </div>
                    ))}
                </div>

                {/* Settings Content Card */}
                <div className="card" style={{ padding: '2.5rem' }}>
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', marginBottom: '8px' }}>Informasi Umum</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Data ini akan muncul pada kop surat dan laporan resmi.</p>
                    </div>

                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Nama Madrasah / Unit</label>
                            <input
                                type="text"
                                defaultValue="Madrasah Ihya' Ulumuddin (MIU)"
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    borderRadius: '12px',
                                    border: '1.5px solid var(--border-medium)',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    outline: 'none',
                                    transition: '0.3s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--border-medium)'}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Alamat Lengkap</label>
                            <textarea
                                rows="3"
                                defaultValue="Jl. Kesugihan No. 123, Cilacap, Jawa Tengah"
                                style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    borderRadius: '12px',
                                    border: '1.5px solid var(--border-medium)',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    outline: 'none',
                                    resize: 'none'
                                }}
                            ></textarea>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tahun Pelajaran</label>
                                <select style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    borderRadius: '12px',
                                    border: '1.5px solid var(--border-medium)',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    background: 'white'
                                }}>
                                    <option>2024/2025 - Ganjil</option>
                                    <option>2024/2025 - Genap</option>
                                    <option>2023/2024 - Genap</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Zona Waktu</label>
                                <select style={{
                                    width: '100%',
                                    padding: '14px 18px',
                                    borderRadius: '12px',
                                    border: '1.5px solid var(--border-medium)',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    background: 'white'
                                }}>
                                    <option>WIB (Asia/Jakarta)</option>
                                    <option>WITA (Asia/Makassar)</option>
                                    <option>WIT (Asia/Jayapura)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '3.5rem',
                        paddingTop: '2rem',
                        borderTop: '1px solid var(--border-light)',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '12px'
                    }}>
                        <button className="btn" style={{ background: '#f1f5f9', color: 'var(--text-main)' }}>Reset</button>
                        <button className="btn btn-primary" onClick={() => alert('Konfigurasi berhasil disimpan.')}>
                            <i className="fas fa-save" style={{ marginRight: '8px' }}></i> Simpan Perubahan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
