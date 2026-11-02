import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { readJSON, writeJSON, accountKeys, SESSION_KEY, GUEST_ID, migrateLegacy } from '../utils/storage';
import { STATUS, STATUS_FLOW, STATUS_LABEL } from '../constants/status';

export { STATUS, STATUS_FLOW, STATUS_LABEL };

const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);

const makeId = (prefix) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(() => {
    migrateLegacy();
    return readJSON(SESSION_KEY, null);
  });

  const userId = account?.id || GUEST_ID;
  const keys = accountKeys(userId);

  const [addresses, setAddresses] = useState(() => readJSON(accountKeys(userId).addresses, []));
  const [orders, setOrders] = useState(() => readJSON(accountKeys(userId).orders, []));
  const [prevUserId, setPrevUserId] = useState(userId);

  // Synchronize state when userId changes (e.g. login/logout) during render
  if (prevUserId !== userId) {
    setPrevUserId(userId);
    setAddresses(readJSON(accountKeys(userId).addresses, []));
    setOrders(readJSON(accountKeys(userId).orders, []));
  }

  useEffect(() => {
    writeJSON(keys.addresses, addresses);
  }, [addresses, keys.addresses]);

  useEffect(() => {
    writeJSON(keys.orders, orders);
  }, [orders, keys.orders]);

  const login = ({ name, phone }) => {
    const cleanName = String(name || '').trim();
    const cleanPhone = String(phone || '').trim();
    if (!cleanName || !cleanPhone) return null;

    const next = { id: makeId('u'), name: cleanName, phone: cleanPhone };
    const guestKeys = accountKeys(GUEST_ID);
    const userKeys = accountKeys(next.id);

    // Migrate guest cart to logged-in user
    const guestCart = readJSON(guestKeys.cart, []);
    if (guestCart.length > 0) {
      const userCart = readJSON(userKeys.cart, []);
      const mergedCart = [...userCart];
      for (const item of guestCart) {
        const existIdx = mergedCart.findIndex((m) => m.cartItemId === item.cartItemId);
        if (existIdx >= 0) {
          const maxStock = mergedCart[existIdx].product?.stock ?? 9999;
          mergedCart[existIdx].quantity = Math.min(mergedCart[existIdx].quantity + item.quantity, maxStock);
        } else {
          mergedCart.push(item);
        }
      }
      writeJSON(userKeys.cart, mergedCart);
      writeJSON(guestKeys.cart, []);
    }

    // Migrate guest wishlist
    const guestWishlist = readJSON(guestKeys.wishlist, []);
    if (guestWishlist.length > 0) {
      const userWishlist = readJSON(userKeys.wishlist, []);
      const mergedWishlist = Array.from(new Set([...userWishlist, ...guestWishlist]));
      writeJSON(userKeys.wishlist, mergedWishlist);
      writeJSON(guestKeys.wishlist, []);
    }

    // Migrate guest addresses
    const guestAddresses = readJSON(guestKeys.addresses, []);
    if (guestAddresses.length > 0) {
      const userAddresses = readJSON(userKeys.addresses, []);
      writeJSON(userKeys.addresses, [...userAddresses, ...guestAddresses]);
      writeJSON(guestKeys.addresses, []);
    }

    // Migrate guest orders
    const guestOrders = readJSON(guestKeys.orders, []);
    if (guestOrders.length > 0) {
      const userOrders = readJSON(userKeys.orders, []);
      writeJSON(userKeys.orders, [...guestOrders, ...userOrders]);
      writeJSON(guestKeys.orders, []);
    }

    setAccount(next);
    writeJSON(SESSION_KEY, next);
    return next;
  };

  const logout = () => {
    setAccount(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const saveAddress = (address) => {
    setAddresses((prev) => {
      if (address.id) {
        const next = prev.map((a) => (a.id === address.id ? { ...a, ...address } : a));
        if (address.isDefault) {
          return next.map((a) => ({ ...a, isDefault: a.id === address.id }));
        }
        return next;
      }
      const created = { ...address, id: makeId('addr') };
      const next = [...prev, created];
      if (created.isDefault || prev.length === 0) {
        return next.map((a) => ({ ...a, isDefault: a.id === created.id }));
      }
      return next;
    });
  };

  const removeAddress = (id) => {
    setAddresses((prev) => {
      const next = prev.filter((a) => a.id !== id);
      if (next.length && !next.some((a) => a.isDefault)) {
        next[0] = { ...next[0], isDefault: true };
      }
      return next;
    });
  };

  const setDefaultAddress = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0] || null;

  const placeOrder = useCallback(
    (payload) => {
      const order = {
        ...payload,
        id: 'SHP-' + Math.floor(10000000 + Math.random() * 90000000),
        createdAt: new Date().toISOString(),
        status: STATUS.MENUNGGU_PEMBAYARAN,
      };
      if (payload.paymentMethod === 'belanjapay' || payload.paymentMethod === 'cod') {
        order.status = STATUS.DIKEMAS;
      }
      setOrders((prev) => [order, ...prev]);
      return order;
    },
    []
  );

  const markPaid = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId && o.status === STATUS.MENUNGGU_PEMBAYARAN ? { ...o, status: STATUS.DIKEMAS } : o))
    );
  };

  const advanceOrderStatus = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const idx = STATUS_FLOW.indexOf(o.status);
        if (idx === -1 || idx >= STATUS_FLOW.length - 1) return o;
        return { ...o, status: STATUS_FLOW[idx + 1] };
      })
    );
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        // Only allow cancellation for unpaid or pending packing orders
        if (o.status !== STATUS.MENUNGGU_PEMBAYARAN && o.status !== STATUS.DIKEMAS) {
          return o;
        }
        return { ...o, status: STATUS.DIBATALKAN };
      })
    );
  };

  const getOrder = (orderId) => orders.find((o) => o.id === orderId);

  return (
    <AccountContext.Provider
      value={{
        account,
        userId,
        login,
        logout,
        addresses,
        defaultAddress,
        saveAddress,
        removeAddress,
        setDefaultAddress,
        orders,
        placeOrder,
        markPaid,
        advanceOrderStatus,
        cancelOrder,
        getOrder,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
