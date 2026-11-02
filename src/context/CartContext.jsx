import React, { createContext, useContext, useState, useEffect } from 'react';
import { readJSON, writeJSON, accountKeys } from '../utils/storage';
import { useAccount } from './AccountContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { userId } = useAccount();
  const keys = accountKeys(userId);

  const [cart, setCart] = useState(() => readJSON(accountKeys(userId).cart, []));
  const [wishlist, setWishlist] = useState(() => readJSON(accountKeys(userId).wishlist, []));
  const [prevUserId, setPrevUserId] = useState(userId);

  // Synchronize cart and wishlist when active user changes
  if (prevUserId !== userId) {
    setPrevUserId(userId);
    setCart(readJSON(accountKeys(userId).cart, []));
    setWishlist(readJSON(accountKeys(userId).wishlist, []));
  }

  useEffect(() => {
    writeJSON(keys.cart, cart);
  }, [cart, keys.cart]);

  useEffect(() => {
    writeJSON(keys.wishlist, wishlist);
  }, [wishlist, keys.wishlist]);

  const addToCart = (product, quantity = 1, variant = null) => {
    if (!product) return;
    const color = variant?.color || product.variants?.colors?.[0] || 'Default';
    const option = variant?.option || product.variants?.options?.[0] || 'Default';
    const cartItemId = `${product.id}-${color}-${option}`;
    const maxStock = product.stock ?? 9999;
    const safeQty = Math.max(1, Math.min(Number(quantity) || 1, maxStock));

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        const nextQty = Math.min(existing.quantity + safeQty, maxStock);
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: nextQty, selected: true }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          storeId: product.storeId || product.store?.id || 'unknown',
          quantity: safeQty,
          selectedVariant: { color, option },
          selected: true,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    const qtyNum = Number(newQty);
    if (isNaN(qtyNum) || qtyNum <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.cartItemId !== cartItemId) return item;
        const maxStock = item.product?.stock ?? 9999;
        const boundedQty = Math.min(Math.max(1, qtyNum), maxStock);
        return { ...item, quantity: boundedQty };
      })
    );
  };

  const toggleCartItemSelection = (cartItemId) => {
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, selected: !item.selected } : item))
    );
  };

  const toggleSelectAllCart = (select) => {
    setCart((prev) => prev.map((item) => ({ ...item, selected: select })));
  };

  const toggleSelectStore = (storeId, select) => {
    setCart((prev) => prev.map((item) => (item.storeId === storeId ? { ...item, selected: select } : item)));
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const removeSelectedCartItems = () => {
    setCart((prev) => prev.filter((item) => !item.selected));
  };

  const selectedItems = cart.filter((item) => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        selectedItems,
        subtotal,
        totalCartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCartItemSelection,
        toggleSelectAllCart,
        toggleSelectStore,
        toggleWishlist,
        removeSelectedCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
