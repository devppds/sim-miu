import React from 'react';

export default function StatCard({ label, value, icon, colorClass }) {
    return (
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
            <div className={`stat-icon ${colorClass}`} style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem'
            }}>
                <i className={icon}></i>
            </div>
            <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: 'var(--text-main)', marginTop: '2px' }}>{value}</div>
            </div>
        </div>
    );
}
