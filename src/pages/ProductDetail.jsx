import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { useUi } from '../context/UiContext';
import { ProductCard } from '../components/ProductCard';
import { formatRupiah } from '../utils/format';
import { Star, ShieldCheck, Truck, Heart, ShoppingCart, Zap, Plus, Minus, Check, Store } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, products } = useCatalog();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const { showToast } = useUi();

  const product = getProduct(id);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.variants?.colors?.[0] || 'Default');
  const [selectedOption, setSelectedOption] = useState(product?.variants?.options?.[0] || 'Default');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setActiveImgIndex(0);
    setSelectedColor(product?.variants?.colors?.[0] || 'Default');
    setSelectedOption(product?.variants?.options?.[0] || 'Default');
    setQuantity(1);
    window.scrollTo({ top: 0 });
  }, [product]);

  if (!product) {
    return (
      <div className="empty-state-box" style={{ margin: '3rem 0' }}>
        <h3>Produk tidak ditemukan</h3>
        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem' }}>Produk mungkin sudah tidak tersedia.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>Kembali ke Beranda</button>
      </div>
    );
  }

  const isFavorite = wishlist.includes(product.id);
  const variant = { color: selectedColor, option: selectedOption };

  const handleAddToCart = () => {
    addToCart(product, quantity, variant);
    showToast('Dimasukkan ke Keranjang!', `${product.name} (${quantity}x)`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, variant);
    navigate('/keranjang');
  };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 5);

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div className="breadcrumb">
        <Link to="/">Beranda</Link> / <Link to={`/kategori/${product.category}`}>Kategori</Link> / <span>{product.name.slice(0, 30)}...</span>
      </div>

      <div className="detail-layout">
        <div className="detail-gallery">
          <img src={product.images[activeImgIndex] || product.images[0]} alt={product.name} className="gallery-main-img" />
          <div className="gallery-thumbs">
            {product.images.map((img, idx) => (
              <button key={idx} className={`gallery-thumb-btn ${activeImgIndex === idx ? 'active' : ''}`} onClick={() => setActiveImgIndex(idx)} aria-label={`Gambar ${idx + 1}`}>
                <img src={img} alt={`thumb ${idx + 1}`} className="gallery-thumb-img" />
              </button>
            ))}
          </div>
        </div>

        <div className="detail-info">
          <div className="detail-badge-row">
            {product.badge && <span className="card-badge-top-left" style={{ position: 'static' }}>{product.badge}</span>}
            <span className="detail-sold">{product.soldCount.toLocaleString('id-ID')} Terjual</span>
          </div>

          <h1 className="detail-title">{product.name}</h1>

          <div className="detail-rating-row">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--primary)', fontWeight: 700 }}>
              <Star size={16} fill="var(--primary)" /> {product.rating}
            </span>
            <span className="detail-divider">|</span>
            <span style={{ color: 'var(--text-muted)' }}>Stok: <strong style={{ color: 'var(--text-main)' }}>{product.stock}</strong></span>
            <span className="detail-divider">|</span>
            <span style={{ color: 'var(--text-muted)' }}>Lokasi: {product.store?.location || product.location}</span>
          </div>

          <div className="detail-price-box">
            <span className="detail-price">{formatRupiah(product.price)}</span>
            {product.originalPrice > product.price && <span className="detail-original">{formatRupiah(product.originalPrice)}</span>}
            {product.discount > 0 && <span className="card-discount-badge">HEMAT {product.discount}%</span>}
          </div>

          {product.freeShipping && (
            <div className="detail-perk"><Truck size={16} color="var(--accent-green)" /> Gratis Ongkir ke seluruh Indonesia</div>
          )}
          <div className="detail-perk"><ShieldCheck size={16} color="var(--accent-green)" /> 100% Original & Bergaransi</div>

          {product.variants?.colors && (
            <div className="detail-variant">
              <label>WARNA: <strong>{selectedColor}</strong></label>
              <div className="variant-list">
                {product.variants.colors.map((color) => (
                  <button key={color} className={`variant-btn ${selectedColor === color ? 'active' : ''}`} onClick={() => setSelectedColor(color)}>
                    {selectedColor === color && <Check size={14} />} {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.variants?.options && (
            <div className="detail-variant">
              <label>VARIAN / UKURAN: <strong>{selectedOption}</strong></label>
              <div className="variant-list">
                {product.variants.options.map((opt) => (
                  <button key={opt} className={`variant-btn ${selectedOption === opt ? 'active' : ''}`} onClick={() => setSelectedOption(opt)}>
                    {selectedOption === opt && <Check size={14} />} {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="detail-qty">
            <span>Kuantitas:</span>
            <div className="qty-control">
              <button className="qty-btn" aria-label="Kurangi jumlah" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1}><Minus size={14} /></button>
              <span className="qty-val">{quantity}</span>
              <button className="qty-btn" aria-label="Tambah jumlah" onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} disabled={quantity >= product.stock}><Plus size={14} /></button>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Tersisa {product.stock}</span>
          </div>

          <div className="detail-actions">
            <button className="btn-outline-primary" onClick={handleAddToCart}><ShoppingCart size={18} /> + Keranjang</button>
            <button className="btn-primary" onClick={handleBuyNow}><Zap size={18} /> Beli Sekarang</button>
            <button
              className={`action-icon-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => toggleWishlist(product.id)}
              aria-label="Simpan ke favorit"
            >
              <Heart size={20} fill={isFavorite ? 'var(--primary)' : 'none'} color={isFavorite ? 'var(--primary)' : 'currentColor'} />
            </button>
          </div>

          {product.store && (
            <div className="detail-store-card">
              <div className="detail-store-avatar"><Store size={20} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="detail-store-name">{product.store.name}</div>
                <div className="detail-store-meta">{(product.store.location || product.location)} · {product.store.isOfficial ? 'Official Store' : 'Toko Terverifikasi'}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="detail-description-card">
        <h2 className="section-title" style={{ fontSize: '1.1rem' }}>Deskripsi Produk</h2>
        <p>{product.description}</p>
      </div>

      {related.length > 0 && (
        <section style={{ margin: '2.5rem 0' }}>
          <div className="section-head-row"><h2 className="section-title">Produk Serupa</h2></div>
          <div className="product-grid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};