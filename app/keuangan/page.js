'use client';

export const runtime = 'edge';

import React from 'react';
import StatCard from '@/components/StatCard';
import SortableTable from '@/components/SortableTable';
import { formatCurrency } from '@/lib/utils';

export default function KeuanganPage() {
    const transactions = [
        { id: 1, desc: 'Pembayaran SPP - Ahmad Fulan', date: '2025-01-20', amount: 150000, type: 'in' },
        { id: 2, desc: 'Beli Kapur & Spidol', date: '2025-01-19', amount: 50000, type: 'out' },
        { id: 3, desc: 'Donasi Hamba Allah', date: '2025-01-18', amount: 1000000, type: 'in' },
    ];

    return (
        <div className="view-container animate-in">
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>Keuangan</h1>
                <p style={{ color: 'var(--text-muted)' }}>Laporan arus kas dan pembayaran administrasi</p>
            </div>

            <div className="stats-grid" style={{ marginBottom: '2.5rem' }}>
                <StatCard label="Saldo Kas" value={formatCurrency(12500000)} icon="fas fa-wallet" colorClass="stat-blue" />
                <StatCard label="Pemasukan (Bln)" value={formatCurrency(4500000)} icon="fas fa-arrow-down" colorClass="stat-green" />
                <StatCard label="Pengeluaran (Bln)" value={formatCurrency(1200000)} icon="fas fa-arrow-up" colorClass="stat-red" />
            </div>

            <div className="card">
                <div className="card-header">
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Riwayat Transaksi Terakhir</h2>
                    <button className="btn btn-sm btn-secondary">Lihat Semua</button>
                </div>
                <SortableTable
                    columns={[
                        { key: 'date', label: 'Tanggal', render: (row) => new Date(row.date).toLocaleDateString('id-ID') },
                        { key: 'desc', label: 'Keterangan' },
                        {
                            key: 'amount',
                            label: 'Nominal',
                            render: (row) => (
                                <span style={{ fontWeight: 700, color: row.type === 'in' ? 'var(--success)' : 'var(--danger)' }}>
                                    {row.type === 'in' ? '+' : '-'} {formatCurrency(row.amount)}
                                </span>
                            )
                        }
                    ]}
                    data={transactions}
                    loading={false}
                />
            </div>
        </div>
    );
}
