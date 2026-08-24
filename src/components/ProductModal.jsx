import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Star,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingCart,
  Zap,
  MessageSquare,
  Plus,
  Minus,
  Check
} from 'lucide-react';

export const ProductModal = () => {
  const {
    selectedProductModal,
    setSelectedProductModal,
    addToCart,
    wishlist,
    toggleWishlist,
    setIsCartOpen,
    setIsChatOpen
  } = useShop();

  const product = selectedProductModal;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product?.variants?.colors?.[0] || 'Default'
  );
  const [selectedOption, setSelectedOption] = useState(
    product?.variants?.options?.[0] || 'Default'
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isFavorite = wishlist.includes(product.id);

  const formatRupiah = (val) => 'Rp ' + Number(val).toLocaleString('id-ID');

  const handleAddToCart = () => {
    addToCart(product, quantity, { color: selectedColor, option: selectedOption });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, { color: selectedColor, option: selectedOption });
    setSelectedProductModal(null);
    setIsCartOpen(true);
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedProductModal(null)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="modal-close-icon"
          onClick={() => setSelectedProductModal(null)}
        >
          <X size={20} />
        </button>

        <div className="product-modal-grid">
          {/* Left Column: Gallery */}
          <div>
            <img
              src={product.images[activeImgIndex] || product.images[0]}
              alt={product.name}
              className="gallery-main-img"
            />
            <div className="gallery-thumbs">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`gallery-thumb-btn ${activeImgIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImgIndex(idx)}
                >
                  <img src={img} alt="thumb" className="gallery-thumb-img" />
                </button>
              ))}
            </div>

            {/* Guarantees */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: 'var(--bg-surface-elevated)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                fontSize: '0.8rem',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontWeight: 600 }}>
                <ShieldCheck size={16} />
                <span>100% Produk Original & Bergaransi</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <Truck size={16} color="var(--primary)" />
                <span>Gratis Ongkir ke seluruh Indonesia (S&K Berlaku)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Specs & Purchase */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Store & Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="card-badge-top-left" style={{ position: 'static' }}>
                {product.badge || 'Star'}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                Lokasi: {product.location}
              </span>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '0.75rem' }}>
              {product.name}
            </h2>

            {/* Ratings & Sold */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                fontSize: '0.85rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#F59E0B', fontWeight: 700 }}>
                <Star size={16} fill="#F59E0B" />
                <span>{product.rating}</span>
              </div>
              <span style={{ color: 'var(--border-subtle)' }}>|</span>
              <span style={{ color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--text-main)' }}>{product.soldCount.toLocaleString('id-ID')}</strong> Terjual
              </span>
              <span style={{ color: 'var(--border-subtle)' }}>|</span>
              <span style={{ color: 'var(--text-muted)' }}>
                Stok: <strong style={{ color: 'var(--text-main)' }}>{product.stock}</strong> pcs
              </span>
            </div>

            {/* Price Box */}
            <div
              style={{
                background: 'rgba(255, 75, 43, 0.08)',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem',
                border: '1px solid rgba(255, 75, 43, 0.2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary)' }}>
                  {formatRupiah(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-subtle)', textDecoration: 'line-through' }}>
                    {formatRupiah(product.originalPrice)}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="card-discount-badge" style={{ position: 'static' }}>
                    HEMAT {product.discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Variants Picker */}
            {product.variants?.colors && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                  PILIHAN WARNA: <span style={{ color: 'var(--text-main)' }}>{selectedColor}</span>
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {product.variants.colors.map((color) => (
                    <button
                      key={color}
                      className={`variant-btn ${selectedColor === color ? 'active' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {selectedColor === color && <Check size={14} style={{ display: 'inline', marginRight: '4px' }} />}
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.variants?.options && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                  PILIHAN VARIAN / UKURAN: <span style={{ color: 'var(--text-main)' }}>{selectedOption}</span>
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {product.variants.options.map((opt) => (
                    <button
                      key={opt}
                      className={`variant-btn ${selectedOption === opt ? 'active' : ''}`}
                      onClick={() => setSelectedOption(opt)}
                    >
                      {selectedOption === opt && <Check size={14} style={{ display: 'inline', marginRight: '4px' }} />}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                Kuantitas:
              </span>
              <div className="qty-control">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className="qty-val">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={14} />
                </button>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                Tersisa {product.stock} barang
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
              <button
                className="btn-secondary"
                style={{ flex: 1 }}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} />
                <span>+ Keranjang</span>
              </button>

              <button
                className="btn-primary"
                style={{ flex: 1.3 }}
                onClick={handleBuyNow}
              >
                <Zap size={18} />
                <span>Beli Sekarang</span>
              </button>

              <button
                className="action-btn"
                style={{ height: 'auto', padding: '0 1rem' }}
                onClick={() => toggleWishlist(product.id)}
                title="Simpan ke Favorit"
              >
                <Heart size={20} fill={isFavorite ? '#FF3366' : 'none'} color={isFavorite ? '#FF3366' : 'currentColor'} />
              </button>
            </div>

            {/* Description Preview */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                DESKRIPSI PRODUK
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
