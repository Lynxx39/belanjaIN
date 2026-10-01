import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { useCart } from '../context/CartContext';
import { useUi } from '../context/UiContext';
import { ProductGrid } from '../components/ProductGrid';
import { Heart } from 'lucide-react';

export const Wishlist = () => {
  const { products } = useCatalog();
  const { wishlist, addToCart } = useCart();
  const { showToast } = useUi();
  const navigate = useNavigate();

  const favoriteProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div className="section-head-row">
        <h1 className="section-title"><Heart size={20} fill="var(--primary)" color="var(--primary)" /> Daftar Impian ({favoriteProducts.length})</h1>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="empty-state-box">
          <Heart size={56} color="var(--text-subtle)" style={{ marginBottom: '1rem', opacity: 0.4 }} />
          <h3>Wishlist Masih Kosong</h3>
          <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem' }}>Simpan produk favoritmu dengan menekan ikon hati.</p>
          <button className="btn-primary" onClick={() => navigate('/')}>Mulai Belanja</button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '1rem' }}>
            <button
              className="btn-outline-primary"
              onClick={() => {
                favoriteProducts.forEach((p) => addToCart(p, 1));
                showToast('Ditambahkan ke Keranjang', `${favoriteProducts.length} produk dari wishlist`, 'success');
              }}
            >
              Tambahkan Semua ke Keranjang
            </button>
          </div>
          <ProductGrid items={favoriteProducts} />
        </>
      )}
    </div>
  );
};