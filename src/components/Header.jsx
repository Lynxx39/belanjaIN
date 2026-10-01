import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  ShoppingCart, 
  Sun, 
  Moon, 
  Bell, 
  HelpCircle, 
  Smartphone, 
  Store
} from 'lucide-react';

export const Header = () => {
  const {
    searchQuery,
    setSearchQuery,
    cart,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    theme,
    toggleTheme,
    setSelectedCategory
  } = useShop();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const quickSearchTags = ['Smartwatch AMOLED', 'TWS Wireless', 'Mechanical Keyboard', 'Sneakers Urban', 'Serum Niacinamide'];

  return (
    <>
      {/* Top Utility Bar (Hidden on ultra-small mobile, visible on tablet/desktop) */}
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

      {/* Main Sticky Header */}
      <header className="main-header">
        <div className="max-w-layout header-inner">
          {/* Brand Logo */}
          <div 
            className="brand-logo" 
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="brand-icon">
              <ShoppingBag size={20} strokeWidth={2.4} />
            </div>
            <div className="brand-text-wrap">
              <span className="brand-name-belanja">belanja</span>
              <span className="brand-name-in">IN</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search size={17} className="search-leading-icon" />
              <input
                type="text"
                placeholder="Cari promo diskon 90%, gadget, fashion, sneakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Cari produk"
              />
              <button className="search-btn">
                <Search size={14} />
                <span className="search-btn-text">Cari</span>
              </button>
            </div>

            {/* Quick search suggestions */}
            <div className="search-tags">
              {quickSearchTags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="search-tag"
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Dark / Light Mode Toggle */}
            <button 
              className="action-btn theme-toggle-btn" 
              onClick={toggleTheme} 
              title={`Ganti ke ${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}`}
            >
              {theme === 'dark' ? <Sun size={18} color="#FFE600" /> : <Moon size={18} color="#6366F1" />}
            </button>

            {/* Wishlist Button (Desktop & Tablet) */}
            <button 
              className="action-btn desktop-only-btn" 
              onClick={() => setIsWishlistOpen(true)}
              title="Daftar Keinginan"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="badge-count">{wishlist.length}</span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button 
              className="action-btn" 
              onClick={() => setIsCartOpen(true)}
              title="Keranjang Belanja"
            >
              <ShoppingCart size={18} />
              {totalCartCount > 0 && (
                <span className="badge-count">{totalCartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
