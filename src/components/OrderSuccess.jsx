import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle, ArrowRight, Printer } from 'lucide-react';

export const OrderSuccess = () => {
  const { lastOrderSuccess, setLastOrderSuccess } = useShop();

  if (!lastOrderSuccess) return null;

  const formatRupiah = (val) => 'Rp ' + Number(val).toLocaleString('id-ID');

  return (
    <div className="modal-overlay" onClick={() => setLastOrderSuccess(null)}>
      <div
        className="modal-box"
        style={{ maxWidth: '650px', textAlign: 'center', padding: '2.5rem 2rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(16, 185, 129, 0.15)',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto'
          }}
        >
          <CheckCircle size={44} />
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          Pembayaran Berhasil!
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Pesanan Anda dengan nomor <strong style={{ color: 'var(--primary)' }}>{lastOrderSuccess.orderId}</strong> sedang disiapkan oleh penjual.
        </p>

        {/* Delivery Progress Bar */}
        <div
          style={{
            background: 'var(--bg-main)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.5rem',
            textAlign: 'left'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 2 }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#10B981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>1</div>
              <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Dibayar</span>
            </div>

            <div style={{ flex: 1, height: '3px', background: '#10B981', margin: '0 4px', marginBottom: '16px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 2 }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>2</div>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--primary)' }}>Dikemas</span>
            </div>

            <div style={{ flex: 1, height: '3px', background: 'var(--border-subtle)', margin: '0 4px', marginBottom: '16px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 2 }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>3</div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Dikirim</span>
            </div>

            <div style={{ flex: 1, height: '3px', background: 'var(--border-subtle)', margin: '0 4px', marginBottom: '16px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 2 }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>4</div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>Selesai</span>
            </div>
          </div>
        </div>

        {/* Order Details Preview */}
        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            textAlign: 'left',
            fontSize: '0.85rem',
            marginBottom: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Penerima:</span>
            <span style={{ fontWeight: 600 }}>{lastOrderSuccess.buyer.name} ({lastOrderSuccess.buyer.phone})</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Metode Bayar:</span>
            <span style={{ fontWeight: 600, textTransform: 'uppercase' }}>{lastOrderSuccess.paymentMethod}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Pengiriman:</span>
            <span style={{ fontWeight: 600 }}>{lastOrderSuccess.shipping.name}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 800 }}>Total Dibayar:</span>
            <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>
              {formatRupiah(lastOrderSuccess.totalAmount)}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            className="btn-secondary"
            onClick={() => window.print()}
          >
            <Printer size={16} />
            <span>Cetak Invoice</span>
          </button>

          <button
            className="btn-primary"
            onClick={() => setLastOrderSuccess(null)}
          >
            <span>Lanjut Belanja</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
