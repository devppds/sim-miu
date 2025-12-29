'use client';

import React from 'react';
import SortableTable from '@/components/SortableTable';

export default function UsersPage() {
    const users = [
        { id: 1, name: 'Admin Pusat', email: 'admin@miu.com', role: 'Super Admin', status: 'Active' },
        { id: 2, name: 'Ustadz Abdullah', email: 'abdullah@miu.com', role: 'Guru', status: 'Active' },
        { id: 3, name: 'Bendahara', email: 'finances@miu.com', role: 'Staff Keuangan', status: 'Active' },
    ];

    return (
        <div className="view-container animate-in">
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>Manajemen Pengguna</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Hak akses dan data akun staff</p>
                </div>
                <button className="btn btn-primary">
                    <i className="fas fa-user-plus" style={{ marginRight: '8px' }}></i> Tambah User
                </button>
            </div>

            <div className="card">
                <SortableTable
                    columns={[
                        { key: 'name', label: 'Nama Lengkap', render: (row) => <strong>{row.name}</strong> },
                        { key: 'email', label: 'Email' },
                        { key: 'role', label: 'Hak Akses' },
                        {
                            key: 'status',
                            label: 'Status',
                            render: (row) => <span className="badge badge-success">{row.status}</span>
                        }
                    ]}
                    data={users}
                    loading={false}
                />
            </div>
        </div>
    );
}
