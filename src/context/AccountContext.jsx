import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { readJSON, writeJSON, accountKeys, SESSION_KEY, GUEST_ID, migrateLegacy } from '../utils/storage';

const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);

const makeId = (prefix) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export const STATUS = {
  MENUNGGU_PEMBAYARAN: 'menunggu_pembayaran',
  DIKEMAS: 'dikemas',
  DIKIRIM: 'dikirim',
  SELESAI: 'selesai',
  DIBATALKAN: 'dibatalkan',
};

export const STATUS_FLOW = [STATUS.MENUNGGU_PEMBAYARAN, STATUS.DIKEMAS, STATUS.DIKIRIM, STATUS.SELESAI];

export const STATUS_LABEL = {
  [STATUS.MENUNGGU_PEMBAYARAN]: 'Menunggu Pembayaran',
  [STATUS.DIKEMAS]: 'Dikemas',
  [STATUS.DIKIRIM]: 'Dikirim',
  [STATUS.SELESAI]: 'Selesai',
  [STATUS.DIBATALKAN]: 'Dibatalkan',
};

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(() => {
    migrateLegacy();
    return readJSON(SESSION_KEY, null);
  });
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const userId = account?.id || GUEST_ID;
  const keys = accountKeys(userId);
  const [hydratedFor, setHydratedFor] = useState(null);

  useEffect(() => {
    setAddresses(readJSON(accountKeys(userId).addresses, []));
    setOrders(readJSON(accountKeys(userId).orders, []));
    setHydratedFor(userId);
  }, [userId]);

  useEffect(() => {
    if (hydratedFor !== userId) return;
    writeJSON(keys.addresses, addresses);
  }, [addresses, hydratedFor, userId, keys.addresses]);

  useEffect(() => {
    if (hydratedFor !== userId) return;
    writeJSON(keys.orders, orders);
  }, [orders, hydratedFor, userId, keys.orders]);

  const login = ({ name, phone }) => {
    const next = { id: makeId('u'), name: name.trim(), phone: phone.trim() };
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
        return prev.map((a) => (a.id === address.id ? { ...a, ...address } : a));
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
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: STATUS.DIBATALKAN } : o)));
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