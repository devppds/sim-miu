'use client';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: 'var(--bg-main)',
            color: 'var(--text-main)'
        }}>
            <div style={{ fontSize: '6rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                <i className="fas fa-search-location"></i>
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                Halaman Tidak Ditemukan
            </h2>
            <p style={{ maxWidth: '400px', lineHeight: '1.6', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                Halaman yang Anda cari mungkin belum dibuat, telah dipindahkan, atau tidak tersedia saat ini.
            </p>

            <Link href="/" className="btn btn-primary" style={{ padding: '12px 32px', borderRadius: '50px' }}>
                <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i> Kembali ke Dashboard
            </Link>
        </div>
    );
}
