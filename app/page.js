'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { formatCurrency, apiCall } from '@/lib/utils';
import Link from 'next/link';
import SortableTable from '@/components/SortableTable';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    santriTotal: 0,
    ustadzTotal: 0,
    keuanganTotal: 0,
    kasTotal: 0
  });
  const [lastActivities, setLastActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [quickStats, activities] = await Promise.all([
          apiCall('getQuickStats'),
          apiCall('getData', 'GET', { type: 'arus_kas' })
        ]);
        setStats(quickStats || {});
        setLastActivities(activities?.slice(0, 6) || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const StatBox = ({ label, value, icon, gradient }) => (
    <div className="card" style={{
      background: gradient,
      color: 'white',
      border: 'none',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ opacity: 0.8, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{label}</div>
        <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>{value}</div>
      </div>
      <i className={icon} style={{
        position: 'absolute',
        right: '-10px',
        bottom: '-10px',
        fontSize: '80px',
        opacity: 0.15,
        transform: 'rotate(-15deg)'
      }}></i>
    </div>
  );

  return (
    <div className="view-container animate-in">
      {/* Welcome Section */}
      <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-1px',
            color: 'var(--text-main)',
            marginBottom: '4px'
          }}>
            Assalamu'alaikum, <span style={{ color: 'var(--primary)' }}>{user?.fullname || 'Administrator'}</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>
            Pantau perkembangan dan operasional Madrasah dalam satu sentuhan.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Tahun Ajaran</div>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: 'var(--primary)',
            background: 'var(--primary-light)',
            padding: '4px 16px',
            borderRadius: '10px',
            marginTop: '4px'
          }}>1446-1447 H</div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-4" style={{ marginBottom: '3rem' }}>
        <StatBox
          label="Santri Aktif"
          value={loading ? '...' : stats.santriTotal}
          icon="fas fa-user-graduate"
          gradient="linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
        />
        <StatBox
          label="Tenaga Pengajar"
          value={loading ? '...' : stats.ustadzTotal}
          icon="fas fa-chalkboard-teacher"
          gradient="linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
        />
        <StatBox
          label="Pemasukan (Bulan Ini)"
          value={loading ? '...' : formatCurrency(stats.keuanganTotal)}
          icon="fas fa-wallet"
          gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
        />
        <StatBox
          label="Saldo Kas MIU"
          value={loading ? '...' : formatCurrency(stats.kasTotal)}
          icon="fas fa-coins"
          gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
        />
      </div>

      {/* Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>

        {/* Left Column: Recent Activities */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Transaksi Keuangan Terkini</h3>
            <Link href="/keuangan" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
              Semua Transaksi
            </Link>
          </div>
          <SortableTable
            columns={[
              {
                key: 'kategori',
                label: 'Deskripsi',
                render: (row) => (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: row.tipe === 'Masuk' ? '#ecfdf5' : '#fef2f2',
                      color: row.tipe === 'Masuk' ? '#10b981' : '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <i className={row.tipe === 'Masuk' ? "fas fa-arrow-down" : "fas fa-arrow-up"}></i>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700 }}>{row.kategori}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.keterangan}</div>
                    </div>
                  </div>
                )
              },
              {
                key: 'nominal',
                label: 'Jumlah',
                render: (row) => (
                  <div style={{ fontWeight: 800, color: row.tipe === 'Masuk' ? '#059669' : '#dc2626' }}>
                    {row.tipe === 'Masuk' ? '+' : '-'} {formatCurrency(row.nominal)}
                  </div>
                )
              },
              {
                key: 'tanggal',
                label: 'Tanggal',
                render: (row) => <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{new Date(row.tanggal).toLocaleDateString('id-ID')}</span>
              }
            ]}
            data={lastActivities}
            loading={loading}
          />
        </div>

        {/* Right Column: Mini Stats & Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Quick Alert Card */}
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: 'white',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>Pusat Informasi</h4>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Jangan lupa untuk memverifikasi data santri unit MIU di menu Akademik sebelum Tahun Ajaran baru dimulai.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <i className="fas fa-check-circle" style={{ color: '#10b981' }}></i>
                <span>Database Sinkron</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <i className="fas fa-clock" style={{ color: '#f59e0b' }}></i>
                <span>Update: 2 menit yang lalu</span>
              </div>
            </div>
          </div>

          {/* Student Capacity */}
          <div className="card">
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>Kapasitas Kelas</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {(stats.santriChart || []).slice(0, 4).map((c, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{c.kelas}</span>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>{c.count} Siswa</span>
                  </div>
                  <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${(c.count / stats.santriTotal) * 100}%`,
                      height: '100%',
                      background: 'var(--primary)',
                      borderRadius: '4px'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
