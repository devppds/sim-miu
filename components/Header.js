'use client';

import React from 'react';
import { useAuth } from '@/lib/AuthContext';

export default function Header() {
    const { user } = useAuth();

    return (
        <header>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'Outfit, sans-serif' }}>
                    Sistem Manajemen Madrasah
                </h2>
            </div>

            <div className="header-actions">
                <button
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-light)',
                        background: 'white',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: '0.3s'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.color = 'var(--primary)';
                        e.currentTarget.style.borderColor = 'var(--primary)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.color = 'var(--text-muted)';
                        e.currentTarget.style.borderColor = 'var(--border-light)';
                    }}
                >
                    <i className="fas fa-bell"></i>
                </button>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '6px 6px 6px 16px',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--shadow-sm)'
                }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{user?.fullname || 'Administrator'}</div>
                        <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {user?.role || 'Sistem Admin'}
                        </div>
                    </div>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: '2px solid var(--primary-light)'
                    }}>
                        <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullname || 'Admin')}&background=020617&color=fff`}
                            alt="User"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
