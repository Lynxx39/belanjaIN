import React from 'react';
import { useShop } from '../context/ShopContext';
import { Radio, Users } from 'lucide-react';

export const LiveStreamFeed = () => {
  const { products, setSelectedProductModal, addToCart, showToast } = useShop();

  const liveRooms = [
    {
      id: 1,
      host: 'Official Store Tech Gaming',
      title: '🔴 UNBOXING & FLASH DEAL SETUP GAMING DISKON 70%!',
      viewers: '14.2K',
      product: products[2] || products[0],
      bgImg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&auto=format&fit=crop&q=80',
      voucher: 'LIVEHEMAT30'
    },
    {
      id: 2,
      host: 'Beauty Glow ID',
      title: '✨ REVIEW SERUM VIRAL & SPILL VOUCHER 50% MALAM INI!',
      viewers: '28.9K',
      product: products[6] || products[1],
      bgImg: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&auto=format&fit=crop&q=80',
      voucher: 'BEAUTYGLOW'
    }
  ];

  return (
    <section id="live-stream-section" style={{ margin: '2.5rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              background: '#EF4444',
              color: 'white',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              animation: 'pulse 2s infinite'
            }}
          >
            <Radio size={12} />
            <span>LIVE</span>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            belanjaIN Live Interaktif
          </h2>
        </div>

        <button
          onClick={() => showToast('belanjaIN Live', 'Semua sesi live akan tersedia di sini', 'info')}
          style={{ background: 'transparent', border: 'none', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
        >
          Jelajahi Semua Live
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {liveRooms.map((room) => (
          <div
            key={room.id}
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              height: '340px',
              border: '1px solid var(--border-subtle)',
              backgroundImage: `url(${room.bgImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '1.25rem'
            }}
          >
            {/* Dark overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.85) 100%)',
                zIndex: 1
              }}
            />

            {/* Top Bar inside stream */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'white' }}>{room.host}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', color: '#FFE600', fontWeight: 700 }}>
                <Users size={12} />
                <span>{room.viewers}</span>
              </div>
            </div>

            {/* Pinned Product Card inside Stream */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ color: 'white', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.75rem', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                {room.title}
              </div>

              {room.product && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedProductModal(room.product)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProductModal(room.product);
                    }
                  }}
                  style={{
                    background: 'rgba(17, 24, 39, 0.9)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    border: '1px solid rgba(255, 75, 43, 0.4)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={room.product.images[0]}
                    alt={room.product.name}
                    style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.775rem', fontWeight: 700, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {room.product.name}
                    </div>
                    <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.9rem' }}>
                      Rp {Number(room.product.price).toLocaleString('id-ID')}
                    </div>
                  </div>

                  <button
                    className="btn-primary"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(room.product, 1);
                    }}
                  >
                    Beli Live
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
