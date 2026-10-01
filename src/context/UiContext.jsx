import React, { createContext, useContext, useState } from 'react';

const UiContext = createContext();

export const useUi = () => useContext(UiContext);

export const UiProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  const showToast = (title, message = '', type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  return (
    <UiContext.Provider
      value={{
        toasts,
        showToast,
        isChatOpen,
        setIsChatOpen,
        appliedVoucher,
        setAppliedVoucher,
        removeVoucher: () => setAppliedVoucher(null),
      }}
    >
      {children}
    </UiContext.Provider>
  );
};