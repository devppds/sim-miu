'use client';

export const runtime = 'edge';

import React from 'react';

export default function LaporanPage() {
    const reports = [
        { title: 'Laporan Absensi Santri', icon: 'fa-user-check', desc: 'Rekap kehadiran santri per bulan.' },
        { title: 'Laporan Keuangan Bulanan', icon: 'fa-file-invoice-dollar', desc: 'Detail pemasukan dan pengeluaran.' },
        { title: 'Laporan Penilaian Akademik', icon: 'fa-chart-line', desc: 'Rekap nilai ujian dan raport.' },
        { title: 'Laporan Inventaris', icon: 'fa-boxes', desc: 'Daftar aset dan inventaris madrasah.' },
    ];

    return (
        <div className="view-container animate-in">
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>Pusat Laporan</h1>
                <p style={{ color: 'var(--text-muted)' }}>Unduh dan cetak laporan operasional madrasah</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {reports.map((report, idx) => (
                    <div key={idx} className="card hover-card" style={{ cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{
                            background: 'var(--bg-highlight)',
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--primary)',
                            fontSize: '1.5rem',
                            flexShrink: 0
                        }}>
                            <i className={`fas ${report.icon}`}></i>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{report.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{report.desc}</p>
                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
                                Download PDF <i className="fas fa-arrow-right" style={{ fontSize: '0.7rem', marginLeft: '5px' }}></i>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
