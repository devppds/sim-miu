'use client';

import React from 'react';
import SortableTable from '@/components/SortableTable';

export default function UsersPage() {
    const users = [
        { id: 1, name: 'Super Administrator', email: 'admin.pusat@miu.ac.id', role: 'Super Admin', status: 'Active' },
        { id: 2, name: 'Ust. Abdullah Faqih', email: 'abdullah@miu.ac.id', role: 'Wali Kelas', status: 'Active' },
        { id: 3, name: 'Siti Aminah, S.Pd', email: 'aminah.keuangan@miu.ac.id', role: 'Bendahara', status: 'Active' },
        { id: 4, name: 'Operator Sekolah', email: 'operator@miu.ac.id', role: 'Staff Tata Usaha', status: 'Inactive' },
    ];

    return (
        <div className="view-container animate-in">
            <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        fontFamily: 'Outfit, sans-serif',
                        color: 'var(--text-main)',
                        letterSpacing: '-1px'
                    }}>
                        Manajemen Akses
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>
                        Kontrol keamanan dan hak akses pengguna sistem SIM-MIU.
                    </p>
                </div>
                <button className="btn btn-primary" onClick={() => alert('Fitur tambah user dibatasi untuk Super Admin.')}>
                    <i className="fas fa-shield-alt" style={{ marginRight: '8px' }}></i> Tambah Administrator
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                <div className="card" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', color: 'white', border: 'none', padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fas fa-user-shield" style={{ fontSize: '1.25rem' }}></i>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Security Overview</h3>
                            <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>Status keamanan sistem saat ini</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>4</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7, textTransform: 'uppercase', fontWeight: 700 }}>Admin Aktif</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>SAFE</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7, textTransform: 'uppercase', fontWeight: 700 }}>System Status</div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--border-medium)', background: '#f8fafc', boxShadow: 'none' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Ingin menambah peran kustom?</div>
                        <button className="btn" style={{ background: 'white', border: '1px solid var(--border-medium)', color: 'var(--text-main)' }}>
                            <i className="fas fa-cogs" style={{ marginRight: '8px' }}></i> Konfigurasi Role
                        </button>
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: '0' }}>
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-light)' }}>
                    <h3 style={{ fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Daftar Pengguna Sistem</h3>
                </div>
                <SortableTable
                    columns={[
                        {
                            key: 'name',
                            label: 'Profil Pengguna',
                            render: (row) => (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(row.name)}&background=random`} alt={row.name} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{row.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{row.email}</div>
                                    </div>
                                </div>
                            )
                        },
                        {
                            key: 'role',
                            label: 'Role',
                            render: (row) => (
                                <span style={{ fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <i className="fas fa-id-badge"></i> {row.role}
                                </span>
                            )
                        },
                        {
                            key: 'status',
                            label: 'Status Akun',
                            render: (row) => (
                                <span className={row.status === 'Active' ? 'badge badge-success' : 'badge badge-secondary'} style={{ padding: '6px 14px' }}>
                                    {row.status === 'Active' ? 'AKTIF' : 'NON-AKTIF'}
                                </span>
                            )
                        },
                        {
                            key: 'aksi',
                            label: 'Opsi',
                            render: (row) => (
                                <button style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: '#f1f5f9', color: '#64748b', cursor: 'pointer' }}>
                                    <i className="fas fa-ellipsis-h"></i>
                                </button>
                            )
                        }
                    ]}
                    data={users}
                    loading={false}
                />
            </div>
        </div>
    );
}
