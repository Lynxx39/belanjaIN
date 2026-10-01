import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCatalog } from '../context/CatalogContext';
import {
  ShoppingBag,
  Search,
  Heart,
  ShoppingCart,
  Bell,
  HelpCircle,
  Smartphone,
  Store,
  User,
} from 'lucide-react';

export const Header = () => {
  const navigate = useNavigate();
  const { totalCartCount, wishlist } = useCart();
  const { setSearchQuery, pushSearchHistory } = useCatalog();
  const [draft, setDraft] = useState('');

  const quickSearchTags = ['Smartwatch AMOLED', 'TWS Wireless', 'Mechanical Keyboard', 'Sneakers Urban', 'Serum Niacinamide'];

  const submitSearch = (term) => {
    const value = (term ?? draft).trim();
    setSearchQuery(value);
    if (value) pushSearchHistory(value);
    navigate(`/cari?q=${encodeURIComponent(value)}`);
  };

  return (
    <>
      <div className="top-bar">
        <div className="max-w-layout top-bar-inner">
          <div className="top-bar-links">
            <span className="top-bar-item"><Store size={13} /> Mitra Seller belanjaIN</span>
            <span className="top-bar-item"><Smartphone size={13} /> Unduh Aplikasi</span>
            <span className="top-bar-item">Garansi Belanja Aman 100%</span>
          </div>
          <div className="top-bar-links">
            <span className="top-bar-item"><Bell size={13} /> Notifikasi Promo</span>
            <span className="top-bar-item"><HelpCircle size={13} /> Pusat Bantuan</span>
            <span className="top-bar-item">Bahasa (ID)</span>
          </div>
        </div>
      </div>

      <header className="main-header">
        <div className="max-w-layout header-inner">
          <Link to="/" className="brand-logo" aria-label="belanjaIN beranda">
            <div className="brand-icon">
              <ShoppingBag size={20} strokeWidth={2.4} />
            </div>
            <div className="brand-text-wrap">
              <span className="brand-name-belanja">belanja</span>
              <span className="brand-name-in">IN</span>
            </div>
          </Link>

          <div className="search-container">
            <form
              className="search-input-wrapper"
              onSubmit={(e) => {
                e.preventDefault();
                submitSearch();
              }}
            >
              <Search size={17} className="search-leading-icon" />
              <input
                type="text"
                placeholder="Cari promo diskon 90%, gadget, fashion, sneakers..."
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  setSearchQuery(e.target.value);
                }}
                className="search-input"
                aria-label="Cari produk"
              />
              <button type="submit" className="search-btn">
                <Search size={14} />
                <span className="search-btn-text">Cari</span>
              </button>
            </form>

            <div className="search-tags">
              {quickSearchTags.map((tag) => (
                <span
                  key={tag}
                  className="search-tag"
                  onClick={() => {
                    setDraft(tag);
                    submitSearch(tag);
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="header-actions">
            <Link to="/wishlist" className="action-btn desktop-only-btn" title="Daftar Keinginan" aria-label="Daftar keinginan">
              <Heart size={18} />
              {wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
            </Link>

            <Link to="/akun" className="action-btn desktop-only-btn" title="Akun Saya" aria-label="Akun saya">
              <User size={18} />
            </Link>

            <Link to="/keranjang" className="action-btn" title="Keranjang Belanja" aria-label="Keranjang belanja">
              <ShoppingCart size={18} />
              {totalCartCount > 0 && <span className="badge-count">{totalCartCount}</span>}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};