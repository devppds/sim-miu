'use client';

import React from 'react';
import { useAuth } from '@/lib/AuthContext';
import { usePathname } from 'next/navigation';

export default function Header() {
    const { user } = useAuth();
    const pathname = usePathname();

    // Mapping path ke Judul Halaman yang lebih humanis
    const getPageTitle = (path) => {
        const routes = {
            '/': 'Ringkasan Dashboard',
            '/siswa': 'Database Siswa Terpadu',
            '/akademik': 'Manajemen Kurikulum & Kelas',
            '/keuangan': 'Laporan Arus Kas Unit',
            '/laporan': 'Dokumen & Arsip Laporan',
            '/users': 'Manajemen Hak Akses',
            '/settings': 'Konfigurasi Sistem'
        };
        return routes[path] || 'Sistem Manajemen Madrasah';
    };

    return (
        <header>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h2 style={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: 'var(--text-main)',
                    fontFamily: 'Outfit, sans-serif',
                    letterSpacing: '-0.5px'
                }}>
                    {getPageTitle(pathname)}
                </h2>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fas fa-calendar-day" style={{ fontSize: '0.6rem' }}></i>
                    {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
            </div>

            <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {/* Search Quick Action */}
                <div style={{ position: 'relative', display: 'none' /* Hidden for now, can be enabled if needed */ }}>
                    <i className="fas fa-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.8rem' }}></i>
                    <input
                        type="text"
                        placeholder="Cari cepat..."
                        style={{
                            background: 'var(--border-light)',
                            border: 'none',
                            padding: '8px 12px 8px 32px',
                            borderRadius: '10px',
                            fontSize: '0.8rem',
                            width: '180px',
                            outline: 'none',
                            fontWeight: 600
                        }}
                    />
                </div>

                <button
                    style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        border: '1.5px solid var(--border-light)',
                        background: 'white',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: 'var(--shadow-sm)'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.color = 'var(--primary)';
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.color = 'var(--text-muted)';
                        e.currentTarget.style.borderColor = 'var(--border-light)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <i className="fas fa-bell"></i>
                </button>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '5px 5px 5px 14px',
                    background: 'white',
                    borderRadius: '14px',
                    border: '1.5px solid var(--border-light)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: '0.3s'
                }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>
                            {user?.fullname || 'Administrator'}
                        </div>
                        <div style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>
                            {user?.role || 'Sistem Admin'}
                        </div>
                    </div>
                    <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '2px solid var(--primary-light)',
                        background: 'var(--primary-light)'
                    }}>
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullname || 'Admin')}&background=020617&color=fff&bold=true`}
                            alt="User"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
