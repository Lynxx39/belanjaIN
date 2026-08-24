import React from 'react';
import { useShop } from '../context/ShopContext';
import { Home, Flame, Radio, Heart, ShoppingBag } from 'lucide-react';

export const BottomNav = () => {
  const {
    cart,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setSelectedCategory,
    setSearchQuery
  } = useShop();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleGoHome = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoFlashSale = () => {
    const el = document.getElementById('flash-sale-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoLive = () => {
    const el = document.getElementById('live-stream-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="mobile-bottom-nav">
      {/* Home Tab */}
      <button className="bottom-nav-item" onClick={handleGoHome}>
        <div className="bottom-nav-icon-wrap">
          <Home size={20} />
        </div>
        <span className="bottom-nav-label">Beranda</span>
      </button>

      {/* Flash Sale Tab */}
      <button className="bottom-nav-item" onClick={handleGoFlashSale}>
        <div className="bottom-nav-icon-wrap">
          <Flame size={20} color="#FF4B2B" />
        </div>
        <span className="bottom-nav-label">Flash Sale</span>
      </button>

      {/* Live Tab */}
      <button className="bottom-nav-item" onClick={handleGoLive}>
        <div className="bottom-nav-icon-wrap live-pulse-wrap">
          <Radio size={20} color="#EF4444" />
          <span className="live-dot" />
        </div>
        <span className="bottom-nav-label">Live</span>
      </button>

      {/* Wishlist Tab */}
      <button className="bottom-nav-item" onClick={() => setIsWishlistOpen(true)}>
        <div className="bottom-nav-icon-wrap">
          <Heart size={20} />
          {wishlist.length > 0 && (
            <span className="bottom-nav-badge">{wishlist.length}</span>
          )}
        </div>
        <span className="bottom-nav-label">Favorit</span>
      </button>

      {/* Cart Tab */}
      <button className="bottom-nav-item" onClick={() => setIsCartOpen(true)}>
        <div className="bottom-nav-icon-wrap">
          <ShoppingBag size={20} />
          {totalCartCount > 0 && (
            <span className="bottom-nav-badge">{totalCartCount}</span>
          )}
        </div>
        <span className="bottom-nav-label">Keranjang</span>
      </button>
    </nav>
  );
};
