import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  Star,
  Heart,
  ShoppingCart,
  MapPin,
  ShieldCheck,
  Award,
  Zap,
  Plus
} from 'lucide-react';

export const ProductCard = ({ product, isFlashSaleItem = false }) => {
  const {
    setSelectedProductModal,
    wishlist,
    toggleWishlist,
    addToCart
  } = useShop();

  const isFavorite = wishlist.includes(product.id);

  const formatRupiah = (val) => {
    return 'Rp ' + Number(val).toLocaleString('id-ID');
  };

  const formatSold = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + 'RB';
    }
    return num;
  };

  return (
    <div
      className="product-card"
      onClick={() => setSelectedProductModal(product)}
    >
      {/* Image Wrap */}
      <div className="product-image-wrap">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {/* Store Trust Badge */}
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

        {/* Discount Badge Tag */}
        {product.discount > 0 && (
          <div className="card-discount-tag">
            <span className="card-discount-num">-{product.discount}%</span>
          </div>
        )}

        {/* Floating Heart Button */}
        <button
          className={`card-wishlist-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          title={isFavorite ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
        >
          <Heart size={14} fill={isFavorite ? '#FF3366' : 'none'} />
        </button>
      </div>

      {/* Info Body */}
      <div className="product-info">
        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        {/* Shipping & Cashback Mini-Tags */}
        <div className="product-tags-row">
          {product.freeShipping && (
            <span className="tag-badge tag-ongkir">
              <span>Gratis Ongkir</span>
            </span>
          )}
          {product.cashback && (
            <span className="tag-badge tag-cashback">
              <span>CB {product.cashback}</span>
            </span>
          )}
        </div>

        {/* Flash Sale Stock Progress Bar */}
        {isFlashSaleItem && (
          <div className="flash-progress-wrap">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${product.flashSaleProgress || 75}%` }}
              />
              <span className="progress-label">
                <Zap size={10} fill="white" style={{ marginRight: '2px' }} />
                TERJUAL {product.flashSaleProgress || 75}%
              </span>
            </div>
          </div>
        )}

        {/* Price & Quick Add Button Row */}
        <div className="product-price-and-action-row">
          <div className="product-price-block">
            <div className="product-price">{formatRupiah(product.price)}</div>
            {product.originalPrice > product.price && (
              <div className="product-original-price">
                {formatRupiah(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            className="card-quick-cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            title="Tambah ke Keranjang"
          >
            <Plus size={15} strokeWidth={2.8} />
          </button>
        </div>

        {/* Meta Rating & Location */}
        <div className="product-meta-row">
          <div className="meta-rating">
            <Star size={11} fill="#F59E0B" color="#F59E0B" />
            <span className="meta-rating-num">{product.rating}</span>
            <span className="meta-sold-text">({formatSold(product.soldCount)} terjual)</span>
          </div>

          <div className="meta-location">
            <MapPin size={10} />
            <span>{product.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
