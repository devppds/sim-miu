'use client';

export const runtime = 'edge';

import React from 'react';

export default function SettingsPage() {
    return (
        <div className="view-container animate-in">
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>Pengaturan Aplikasi</h1>
                <p style={{ color: 'var(--text-muted)' }}>Konfigurasi sistem SIM MIU</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
                {/* Settings Sidebar */}
                <div className="card" style={{ padding: '1rem', height: 'fit-content' }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ padding: '12px', background: 'var(--bg-highlight)', color: 'var(--primary)', fontWeight: 700, borderRadius: '8px', marginBottom: '4px', cursor: 'pointer' }}>Umum</li>
                        <li style={{ padding: '12px', color: 'var(--text-muted)', cursor: 'pointer' }}>Tahun Ajaran</li>
                        <li style={{ padding: '12px', color: 'var(--text-muted)', cursor: 'pointer' }}>Backup Database</li>
                        <li style={{ padding: '12px', color: 'var(--text-muted)', cursor: 'pointer' }}>Notifikasi</li>
                    </ul>
                </div>

                {/* Settings Content */}
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Pengaturan Umum</h3>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Nama Instansi</label>
                        <input type="text" className="form-control" defaultValue="Madrasah Ihya' Ulumuddin" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Alamat</label>
                        <textarea className="form-control" rows="3" defaultValue="Jl. Kesugihan No. 123" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}></textarea>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Zona Waktu</label>
                        <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <option>WIB (Jakarta)</option>
                            <option>WITA (Makassar)</option>
                            <option>WIT (Jayapura)</option>
                        </select>
                    </div>

                    <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Simpan Perubahan</button>
                </div>
            </div>
        </div>
    );
}
