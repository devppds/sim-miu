'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (path) => pathname === path ? 'active' : '';

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <i className="fas fa-quran" style={{ color: '#fff' }}></i>
                    <span>SIM MIU</span>
                </div>
            </div>

            <div className="sidebar-nav">
                <div className="menu-section">Utama</div>
                <ul>
                    <li>
                        <Link href="/" className={`nav-link ${isActive('/')}`}>
                            <i className="fas fa-home"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/santri" className={`nav-link ${isActive('/santri')}`}>
                            <i className="fas fa-user-graduate"></i>
                            <span>Data Santri</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/akademik" className={`nav-link ${isActive('/akademik')}`}>
                            <i className="fas fa-book-open"></i>
                            <span>Akademik</span>
                        </Link>
                    </li>
                </ul>

                <div className="menu-section">Keuangan</div>
                <ul>
                    <li>
                        <Link href="/keuangan" className={`nav-link ${isActive('/keuangan')}`}>
                            <i className="fas fa-wallet"></i>
                            <span>Keuangan</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/laporan" className={`nav-link ${isActive('/laporan')}`}>
                            <i className="fas fa-file-invoice-dollar"></i>
                            <span>Laporan</span>
                        </Link>
                    </li>
                </ul>

                <div className="menu-section">Pengaturan</div>
                <ul>
                    <li>
                        <Link href="/users" className={`nav-link ${isActive('/users')}`}>
                            <i className="fas fa-users-cog"></i>
                            <span>Pengguna</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/settings" className={`nav-link ${isActive('/settings')}`}>
                            <i className="fas fa-cog"></i>
                            <span>Aplikasi</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="sidebar-footer">
                <button className="logout-btn">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Keluar</span>
                </button>
            </div>
        </aside>
    );
}
