import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Home, LayoutGrid, Radio, ShoppingBag, User } from 'lucide-react';

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalCartCount } = useCart();

  const go = (to) => () => navigate(to);
  const isActive = (to) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to));

  return (
    <nav className="mobile-bottom-nav">
      <button className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`} onClick={go('/')}>
        <div className="bottom-nav-icon-wrap"><Home size={20} /></div>
        <span className="bottom-nav-label">Beranda</span>
      </button>

      <button className={`bottom-nav-item ${isActive('/kategori') ? 'active' : ''}`} onClick={go('/kategori/all')}>
        <div className="bottom-nav-icon-wrap"><LayoutGrid size={20} /></div>
        <span className="bottom-nav-label">Kategori</span>
      </button>

      <button className="bottom-nav-item" onClick={() => navigate('/#live')}>
        <div className="bottom-nav-icon-wrap live-pulse-wrap">
          <Radio size={20} color="#EF4444" />
          <span className="live-dot" />
        </div>
        <span className="bottom-nav-label">Live</span>
      </button>

      <button className={`bottom-nav-item ${isActive('/pesanan') ? 'active' : ''}`} onClick={go('/pesanan')}>
        <div className="bottom-nav-icon-wrap"><ShoppingBag size={20} /></div>
        <span className="bottom-nav-label">Pesanan</span>
      </button>

      <button className={`bottom-nav-item ${isActive('/akun') ? 'active' : ''}`} onClick={go('/akun')}>
        <div className="bottom-nav-icon-wrap">
          <User size={20} />
          {totalCartCount > 0 && <span className="bottom-nav-badge">{totalCartCount}</span>}
        </div>
        <span className="bottom-nav-label">Akun</span>
      </button>
    </nav>
  );
};