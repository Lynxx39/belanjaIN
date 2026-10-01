import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUi } from '../context/UiContext';
import { formatRupiah, formatSold } from '../utils/format';
import { Star, Heart, MapPin, ShieldCheck, Award, Zap, Plus } from 'lucide-react';

export const ProductCard = ({ product, isFlashSaleItem = false }) => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const { showToast } = useUi();

  const isFavorite = wishlist.includes(product.id);
  const open = () => navigate(`/produk/${product.id}`);

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(
      isFavorite ? 'Dihapus dari Favorit' : 'Disimpan ke Favorit',
      isFavorite ? 'Produk dihapus dari wishlist' : 'Produk ditambahkan ke wishlist',
      isFavorite ? 'info' : 'success'
    );
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast('Dimasukkan ke Keranjang!', product.name, 'success');
  };

  return (
    <div
      className="product-card"
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
    >
      <div className="product-image-wrap">
        <img src={product.images[0]} alt={product.name} className="product-image" loading="lazy" />

        {product.badge === 'Official Store' ? (
          <div className="card-badge-official">
            <ShieldCheck size={11} strokeWidth={2.8} />
            <span>Mall</span>
          </div>
        ) : product.badge === 'Star+' ? (
          <div className="card-badge-star-plus">
            <Award size={11} strokeWidth={2.8} />
            <span>Star+</span>
          </div>
        ) : (
          <div className="card-badge-star">
            <Star size={10} fill="white" strokeWidth={0} />
            <span>Star</span>
          </div>
        )}

        {product.discount > 0 && (
          <div className="card-discount-tag">
            <span className="card-discount-num">-{product.discount}%</span>
          </div>
        )}

        <button
          className={`card-wishlist-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleWishlist}
          title={isFavorite ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
          aria-label={isFavorite ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
        >
          <Heart size={14} fill={isFavorite ? '#EE4D2D' : 'none'} />
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-title" title={product.name}>{product.name}</h3>

        <div className="product-tags-row">
          {product.freeShipping && (
            <span className="tag-badge tag-ongkir"><span>Gratis Ongkir</span></span>
          )}
          {product.cashback && (
            <span className="tag-badge tag-cashback"><span>CB {product.cashback}</span></span>
          )}
        </div>

        {isFlashSaleItem && (
          <div className="flash-progress-wrap">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${product.flashSaleProgress || 75}%` }} />
              <span className="progress-label">
                <Zap size={10} fill="white" style={{ marginRight: '2px' }} />
                TERJUAL {product.flashSaleProgress || 75}%
              </span>
            </div>
          </div>
        )}

        <div className="product-price-and-action-row">
          <div className="product-price-block">
            <div className="product-price">{formatRupiah(product.price)}</div>
            {product.originalPrice > product.price && (
              <div className="product-original-price">{formatRupiah(product.originalPrice)}</div>
            )}
          </div>

          <button
            className="card-quick-cart-btn"
            onClick={handleAdd}
            title="Tambah ke Keranjang"
            aria-label="Tambah ke keranjang"
          >
            <Plus size={15} strokeWidth={2.8} />
          </button>
        </div>

        <div className="product-meta-row">
          <div className="meta-rating">
            <Star size={11} fill="#EE4D2D" color="#EE4D2D" />
            <span className="meta-rating-num">{product.rating}</span>
            <span className="meta-sold-text">({formatSold(product.soldCount)} terjual)</span>
          </div>
          <div className="meta-location">
            <MapPin size={10} />
            <span>{product.store?.location || product.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};