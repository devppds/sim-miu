'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (path) => pathname === path ? 'active' : '';

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <i className="fas fa-layer-group" style={{ color: '#3b82f6' }}></i>
                <span>SIM MIU</span>
            </div>

            <div style={{ flex: 1 }}>
                <div className="nav-group">
                    <span className="nav-label">Utama</span>
                    <Link href="/" className={`nav-item ${isActive('/')}`}>
                        <i className="fas fa-chart-pie"></i>
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/siswa" className={`nav-item ${isActive('/siswa')}`}>
                        <i className="fas fa-user-graduate"></i>
                        <span>Data Siswa</span>
                    </Link>
                    <Link href="/akademik" className={`nav-item ${isActive('/akademik')}`}>
                        <i className="fas fa-book-reader"></i>
                        <span>Akademik</span>
                    </Link>
                </div>

                <div className="nav-group">
                    <span className="nav-label">Keuangan</span>
                    <Link href="/keuangan" className={`nav-item ${isActive('/keuangan')}`}>
                        <i className="fas fa-credit-card"></i>
                        <span>Keuangan</span>
                    </Link>
                    <Link href="/laporan" className={`nav-item ${isActive('/laporan')}`}>
                        <i className="fas fa-file-signature"></i>
                        <span>Laporan</span>
                    </Link>
                </div>

                <div className="nav-group">
                    <span className="nav-label">System</span>
                    <Link href="/users" className={`nav-item ${isActive('/users')}`}>
                        <i className="fas fa-shield-alt"></i>
                        <span>Akses</span>
                    </Link>
                    <Link href="/settings" className={`nav-item ${isActive('/settings')}`}>
                        <i className="fas fa-sliders-h"></i>
                        <span>Setelan</span>
                    </Link>
                </div>
            </div>

            <div style={{ padding: '0 1rem' }}>
                <button
                    style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '12px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        border: 'none',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        transition: '0.3s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#ef4444'}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                        e.currentTarget.style.color = '#ef4444';
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                >
                    <i className="fas fa-power-off"></i>
                    <span>Keluar Aplikasi</span>
                </button>
            </div>
        </aside>
    );
}
