'use client';

import React from 'react';

export default function LaporanPage() {
    const reports = [
        {
            title: 'Laporan Absensi Santri',
            icon: 'fas fa-user-clock',
            desc: 'Rekapitulasi kehadiran harian dan bulanan seluruh kelas.',
            color: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            fileData: 'PDF • 2.4 MB'
        },
        {
            title: 'Laporan Keuangan',
            icon: 'fas fa-file-invoice-dollar',
            desc: 'Neraca, arus kas, dan rincian pembayaran administrasi.',
            color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            fileData: 'XLSX • 1.1 MB'
        },
        {
            title: 'Nilai Akademik',
            icon: 'fas fa-chart-line',
            desc: 'Leger nilai ujian, raport, dan transkrip santri.',
            color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            fileData: 'PDF • 5.8 MB'
        },
        {
            title: 'Data Inventaris',
            icon: 'fas fa-boxes',
            desc: 'Daftar aset, sarana prasarana, dan kondisi terkini.',
            color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            fileData: 'PDF • 800 KB'
        },
        {
            title: 'Data Pegawai',
            icon: 'fas fa-id-card-alt',
            desc: 'Arsip data guru dan staff kependidikan unit MIU.',
            color: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
            fileData: 'XLSX • 450 KB'
        },
        {
            title: 'Arsip Surat',
            icon: 'fas fa-mail-bulk',
            desc: 'Surat masuk dan surat keluar operasional madrasah.',
            color: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
            fileData: 'ZIP • 12 GB'
        }
    ];

    return (
        <div className="view-container animate-in">
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    fontFamily: 'Outfit, sans-serif',
                    color: 'var(--text-main)',
                    letterSpacing: '-1.5px'
                }}>
                    Pusat Arsip & Laporan
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>
                    Unduh dokumen legal dan laporan operasional unit Madrasah.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
                {reports.map((report, idx) => (
                    <div key={idx} className="card" style={{
                        padding: '0',
                        overflow: 'hidden',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{ padding: '2rem', flex: 1 }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '18px',
                                background: report.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.75rem',
                                marginBottom: '1.5rem',
                                boxShadow: '0 10px 20px -5px rgba(0,0,0,0.15)'
                            }}>
                                <i className={report.icon}></i>
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', marginBottom: '0.75rem' }}>{report.title}</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{report.desc}</p>
                        </div>
                        <div style={{
                            background: '#f8fafc',
                            padding: '1rem 2rem',
                            borderTop: '1px solid var(--border-light)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{report.fileData}</span>
                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                Unduh <i className="fas fa-arrow-down"></i>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
