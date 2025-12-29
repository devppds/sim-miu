'use client';

import React from 'react';

export default function SortableTable({ columns, data, loading, emptyMessage }) {
    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: 'center', padding: '3rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                    <i className="fas fa-circle-notch fa-spin" style={{ fontSize: '2rem', color: 'var(--primary)' }}></i>
                                    <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Sinkronisasi Data...</span>
                                </div>
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: 'center', padding: '4rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        background: '#f8fafc',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <i className="fas fa-search" style={{ fontSize: '2rem', color: '#cbd5e1' }}></i>
                                    </div>
                                    <span style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                                        {emptyMessage || 'Tidak ada data ditemukan.'}
                                    </span>
                                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '300px' }}>
                                        Coba ubah kata kunci pencarian atau segarkan halaman ini.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="animate-in" style={{ animationDelay: `${rowIndex * 0.05}s` }}>
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex}>
                                        {col.render ? col.render(row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
