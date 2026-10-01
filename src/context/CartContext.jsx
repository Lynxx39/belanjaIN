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
  const [hydratedFor, setHydratedFor] = useState(userId);

  // Re-hydrate when the active account changes
  useEffect(() => {
    setCart(readJSON(accountKeys(userId).cart, []));
    setWishlist(readJSON(accountKeys(userId).wishlist, []));
    setHydratedFor(userId);
  }, [userId]);

  useEffect(() => {
    if (hydratedFor !== userId) return;
    writeJSON(keys.cart, cart);
  }, [cart, hydratedFor, userId, keys.cart]);

  useEffect(() => {
    if (hydratedFor !== userId) return;
    writeJSON(keys.wishlist, wishlist);
  }, [wishlist, hydratedFor, userId, keys.wishlist]);

  const addToCart = (product, quantity = 1, variant = null) => {
    const color = variant?.color || product.variants?.colors?.[0] || 'Default';
    const option = variant?.option || product.variants?.options?.[0] || 'Default';
    const cartItemId = `${product.id}-${color}-${option}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity, selected: true }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          storeId: product.storeId || product.store?.id || 'unknown',
          quantity,
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
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
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
  const subtotal = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
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