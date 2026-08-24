import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';
import { vouchers } from '../data/vouchers';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shopee_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('shopee_wishlist');
      return saved ? JSON.parse(saved) : [1, 3];
    } catch {
      return [1, 3];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000000 });
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);

  // Modals & Drawers
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [lastOrderSuccess, setLastOrderSuccess] = useState(null);

  // Vouchers
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  // Theme
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('shopee_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('shopee_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('shopee_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('shopee_theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (title, message = '', type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const addToCart = (product, quantity = 1, variant = null) => {
    const color = variant?.color || product.variants?.colors?.[0] || 'Default';
    const option = variant?.option || product.variants?.options?.[0] || 'Default';
    const cartItemId = `${product.id}-${color}-${option}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity, selected: true }
            : item
        );
      } else {
        return [
          ...prev,
          {
            cartItemId,
            product,
            quantity,
            selectedVariant: { color, option },
            selected: true
          }
        ];
      }
    });

    showToast('Dimasukkan ke Keranjang!', `${product.name.slice(0, 30)}... (${quantity}x)`, 'success');
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Produk Dihapus', 'Item telah dikeluarkan dari keranjang', 'info');
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const toggleCartItemSelection = (cartItemId) => {
    setCart(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAllCart = (select) => {
    setCart(prev => prev.map(item => ({ ...item, selected: select })));
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Dihapus dari Favorit', 'Produk dihapus dari daftar impian Anda', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Disimpan ke Favorit ❤️', 'Produk berhasil ditambahkan ke wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const applyVoucher = (code) => {
    const found = vouchers.find(v => v.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      showToast('Kode Tidak Valid', 'Kupon promo tidak ditemukan atau kedaluwarsa', 'error');
      return false;
    }

    const selectedSubtotal = cart
      .filter(item => item.selected)
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    if (selectedSubtotal < found.minSpend) {
      showToast(
        'Belum Memenuhi Syarat',
        `Minimal belanja Rp ${found.minSpend.toLocaleString('id-ID')} untuk voucher ini`,
        'warning'
      );
      return false;
    }

    setAppliedVoucher(found);
    showToast('Voucher Berhasil Dipasang! 🎉', `Hemat dengan promo ${found.code}`, 'success');
    return true;
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    showToast('Voucher Dilepas', 'Kupon promo dibatalkan', 'info');
  };

  const clearSelectedCart = () => {
    setCart(prev => prev.filter(item => !item.selected));
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        priceRange,
        setPriceRange,
        onlyDiscount,
        setOnlyDiscount,
        onlyFreeShipping,
        setOnlyFreeShipping,
        selectedProductModal,
        setSelectedProductModal,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isChatOpen,
        setIsChatOpen,
        lastOrderSuccess,
        setLastOrderSuccess,
        appliedVoucher,
        applyVoucher,
        removeVoucher,
        theme,
        toggleTheme,
        toasts,
        showToast,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCartItemSelection,
        toggleSelectAllCart,
        toggleWishlist,
        clearSelectedCart
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
