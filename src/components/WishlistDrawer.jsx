import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer = () => {
  const {
    wishlist,
    products,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setSelectedProductModal
  } = useShop();

  if (!isWishlistOpen) return null;

  const favoriteProducts = products.filter((p) => wishlist.includes(p.id));

  const formatRupiah = (val) => 'Rp ' + Number(val).toLocaleString('id-ID');

  return (
    <>
      <div className="drawer-overlay" onClick={() => setIsWishlistOpen(false)} />
      <div className="drawer-panel">
        <div className="drawer-header">
          <div className="drawer-title">
            <Heart size={20} color="#FF3366" fill="#FF3366" />
            <span>Daftar Impian ({favoriteProducts.length})</span>
          </div>
          <button className="drawer-close-btn" onClick={() => setIsWishlistOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          {favoriteProducts.length > 0 ? (
            favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="cart-item"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSelectedProductModal(product);
                  setIsWishlistOpen(false);
                }}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="cart-item-img"
                />

                <div className="cart-item-info">
                  <div className="cart-item-name" title={product.name}>
                    {product.name}
                  </div>

                  <div className="cart-item-price" style={{ marginBottom: '0.5rem' }}>
                    {formatRupiah(product.price)}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn-primary"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                    >
                      <ShoppingCart size={13} />
                      <span>+ Keranjang</span>
                    </button>

                    <button
                      style={{
                        background: 'var(--bg-surface-elevated)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '0 0.5rem',
                        color: 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      title="Hapus dari Favorit"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <Heart size={56} color="var(--text-subtle)" style={{ marginBottom: '1rem', opacity: 0.4 }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Wishlist Masih Kosong
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Simpan produk yang Anda sukai dengan menekan ikon hati ❤️ di kartu produk.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
