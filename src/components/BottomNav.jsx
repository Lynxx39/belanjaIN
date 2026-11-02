import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Home, LayoutGrid, ShoppingCart, ShoppingBag, User } from 'lucide-react';

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

      <button className={`bottom-nav-item ${isActive('/keranjang') ? 'active' : ''}`} onClick={go('/keranjang')}>
        <div className="bottom-nav-icon-wrap">
          <ShoppingCart size={20} />
          {totalCartCount > 0 && <span className="bottom-nav-badge">{totalCartCount}</span>}
        </div>
        <span className="bottom-nav-label">Keranjang</span>
      </button>

      <button className={`bottom-nav-item ${isActive('/pesanan') ? 'active' : ''}`} onClick={go('/pesanan')}>
        <div className="bottom-nav-icon-wrap"><ShoppingBag size={20} /></div>
        <span className="bottom-nav-label">Pesanan</span>
      </button>

      <button className={`bottom-nav-item ${isActive('/akun') ? 'active' : ''}`} onClick={go('/akun')}>
        <div className="bottom-nav-icon-wrap"><User size={20} /></div>
        <span className="bottom-nav-label">Akun</span>
      </button>
    </nav>
  );
};
