'use client';

import React from 'react';
import SortableTable from '@/components/SortableTable';
import { formatCurrency } from '@/lib/utils';

export default function KeuanganPage() {
    const transactions = [
        { id: 1, desc: 'Pembayaran Syahriah - Ahmad Fulan', date: '2025-01-20', amount: 150000, type: 'in', category: 'Administrasi' },
        { id: 2, desc: 'Pembelian Sarana Prasarana', date: '2025-01-19', amount: 550000, type: 'out', category: 'Operasional' },
        { id: 3, desc: 'Hibah Sarana Pendidikan', date: '2025-01-18', amount: 2500000, type: 'in', category: 'Donasi' },
        { id: 4, desc: 'Gaji Kebersihan Madrasah', date: '2025-01-17', amount: 1200000, type: 'out', category: 'Gaji' },
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
                        letterSpacing: '-1.5px'
                    }}>
                        Laporan Keuangan
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>
                        Transparansi arus kas dan manajemen tagihan siswa unit MIU.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-primary">
                        <i className="fas fa-file-export" style={{ marginRight: '8px' }}></i> Export Laporan
                    </button>
                    <button className="btn" style={{ background: '#0f172a', color: 'white' }}>
                        <i className="fas fa-plus-circle" style={{ marginRight: '8px' }}></i> Tambah Transaksi
                    </button>
                </div>
            </div>

            <div className="grid grid-3" style={{ marginBottom: '3rem' }}>
                <div className="card" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', border: 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.7, textTransform: 'uppercase' }}>Saldo Efektif</div>
                            <div style={{ fontSize: '2.25rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{formatCurrency(12450000)}</div>
                        </div>
                        <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fas fa-wallet" style={{ fontSize: '1.25rem' }}></i>
                        </div>
                    </div>
                </div>
                <div className="card" style={{ borderLeft: '6px solid #10b981' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pemasukan (Bulan Ini)</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>+ {formatCurrency(4500000)}</div>
                </div>
                <div className="card" style={{ borderLeft: '6px solid #ef4444' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pengeluaran (Bulan Ini)</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444' }}>- {formatCurrency(1200000)}</div>
                </div>
            </div>

            <div className="card" style={{ padding: '0' }}>
                <div style={{ padding: '1.75rem 2rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Log Mutasi Rekening</h3>
                    <div style={{ background: '#f8fafc', padding: '6px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                        <i className="fas fa-calendar-alt" style={{ marginRight: '8px' }}></i> Januari 2025
                    </div>
                </div>
                <SortableTable
                    columns={[
                        {
                            key: 'date',
                            label: 'Waktu Aktif',
                            render: (row) => (
                                <div>
                                    <div style={{ fontWeight: 700 }}>{new Date(row.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{new Date(row.date).getFullYear()}</div>
                                </div>
                            )
                        },
                        {
                            key: 'desc',
                            label: 'Uraian Transaksi',
                            render: (row) => (
                                <div>
                                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{row.desc}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 800 }}>{row.category}</div>
                                </div>
                            )
                        },
                        {
                            key: 'amount',
                            label: 'Nominal Mutasi',
                            render: (row) => (
                                <div style={{
                                    fontWeight: 800,
                                    fontSize: '1rem',
                                    color: row.type === 'in' ? '#059669' : '#dc2626',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    <i className={row.type === 'in' ? "fas fa-arrow-down" : "fas fa-arrow-up"} style={{ fontSize: '0.7rem' }}></i>
                                    {formatCurrency(row.amount)}
                                </div>
                            )
                        },
                        {
                            key: 'status',
                            label: 'Status',
                            render: (row) => (
                                <span style={{
                                    padding: '5px 12px',
                                    background: '#f0fdf4',
                                    color: '#166534',
                                    borderRadius: '8px',
                                    fontSize: '0.7rem',
                                    fontWeight: 800
                                }}>
                                    TERVERIFIKASI
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
