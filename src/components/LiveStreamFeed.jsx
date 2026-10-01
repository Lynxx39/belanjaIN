import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { useUi } from '../context/UiContext';
import { Radio, Users } from 'lucide-react';
import { formatRupiah } from '../utils/format';

export const LiveStreamFeed = () => {
  const { products } = useCatalog();
  const { addToCart } = useCart();
  const { showToast } = useUi();
  const navigate = useNavigate();

  const liveRooms = [
    {
      id: 1,
      host: 'Official Store Tech Gaming',
      title: 'UNBOXING & FLASH DEAL SETUP GAMING DISKON 70%!',
      viewers: '14.2K',
      product: products[2] || products[0],
      bgImg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      host: 'Beauty Glow ID',
      title: 'REVIEW SERUM VIRAL & SPILL VOUCHER 50% MALAM INI!',
      viewers: '28.9K',
      product: products[6] || products[1],
      bgImg: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section id="live-stream-section" style={{ margin: '2.5rem 0' }}>
      <div className="section-head-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div className="live-pill">
            <Radio size={12} />
            <span>LIVE</span>
          </div>
          <h2 className="section-title">belanjaIN Live</h2>
        </div>
        <button className="section-link-btn" onClick={() => showToast('belanjaIN Live', 'Semua sesi live akan tersedia di sini', 'info')}>
          Jelajahi Semua Live
        </button>
      </div>

      <div className="live-grid">
        {liveRooms.map((room) => (
          <div key={room.id} className="live-card" style={{ backgroundImage: `url(${room.bgImg})` }}>
            <div className="live-card-overlay" />

            <div className="live-card-top">
              <span className="live-host">{room.host}</span>
              <span className="live-viewers"><Users size={12} /> {room.viewers}</span>
            </div>

            <div className="live-card-bottom">
              <div className="live-room-title">{room.title}</div>
              {room.product && (
                <div
                  className="live-product-mini"
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/produk/${room.product.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(`/produk/${room.product.id}`);
                    }
                  }}
                >
                  <img src={room.product.images[0]} alt={room.product.name} className="live-product-img" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="live-product-name">{room.product.name}</div>
                    <div className="live-product-price">{formatRupiah(room.product.price)}</div>
                  </div>
                  <button
                    className="btn-primary"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(room.product, 1);
                      showToast('Dimasukkan ke Keranjang!', room.product.name, 'success');
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