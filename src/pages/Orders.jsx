import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, STATUS_LABEL } from '../context/AccountContext';
import { formatRupiah, formatDate } from '../utils/format';
import { ShoppingBag } from 'lucide-react';

export const Orders = () => {
  const navigate = useNavigate();
  const { account, orders } = useAccount();
  const [filter, setFilter] = useState('semua');

  const tabs = [
    { id: 'semua', label: 'Semua' },
    { id: 'menunggu_pembayaran', label: 'Belum Bayar' },
    { id: 'dikemas', label: 'Dikemas' },
    { id: 'dikirim', label: 'Dikirim' },
    { id: 'selesai', label: 'Selesai' },
  ];

  if (!account) {
    return (
      <div className="empty-state-box" style={{ margin: '3rem 0' }}>
        <ShoppingBag size={56} color="var(--text-subtle)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
        <h3>Masuk untuk melihat pesanan</h3>
        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem' }}>Riwayat pesanan tersimpan per akun.</p>
        <button className="btn-primary" onClick={() => navigate('/akun')}>Masuk / Daftar</button>
      </div>
    );
  }

  const filtered = filter === 'semua' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div className="section-head-row">
        <h1 className="section-title">Pesanan Saya</h1>
      </div>

      <div className="order-tabs">
        {tabs.map((t) => (
          <button key={t.id} className={`sort-tab ${filter === t.id ? 'active' : ''}`} onClick={() => setFilter(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state-box" style={{ marginTop: '1.5rem' }}>
          <h3>Belum ada pesanan</h3>
          <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem' }}>Pesanan yang kamu buat akan muncul di sini.</p>
          <button className="btn-primary" onClick={() => navigate('/')}>Mulai Belanja</button>
        </div>
      ) : (
        <div className="order-list">
          {filtered.map((order) => (
            <button key={order.id} className="order-card" onClick={() => navigate(`/pesanan/${order.id}`)}>
              <div className="order-card-top">
                <span className="order-id">{order.id}</span>
                <span className={`order-status status-${order.status}`}>{STATUS_LABEL[order.status]}</span>
              </div>
              <div className="order-card-mid">
                {order.items.slice(0, 3).map((item) => (
                  <img key={item.cartItemId} src={item.product.images[0]} alt={item.product.name} className="order-thumb" />
                ))}
                <div className="order-item-count">{order.items.length} produk</div>
              </div>
              <div className="order-card-bottom">
                <span className="order-date">{formatDate(order.createdAt)}</span>
                <span className="order-total">Total: <strong>{formatRupiah(order.totalAmount)}</strong></span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};