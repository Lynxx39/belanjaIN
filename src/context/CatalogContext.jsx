import React, { createContext, useContext, useState } from 'react';
import { products } from '../data/products';
import { vouchers } from '../data/vouchers';
import { readJSON, writeJSON, SEARCH_HISTORY_KEY } from '../utils/storage';

const CatalogContext = createContext();

export const useCatalog = () => useContext(CatalogContext);

export const CatalogProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState(() => readJSON(SEARCH_HISTORY_KEY, []));

  const pushSearchHistory = (term) => {
    const clean = term.trim();
    if (!clean) return;
    setSearchHistory((prev) => {
      const next = [clean, ...prev.filter((t) => t.toLowerCase() !== clean.toLowerCase())].slice(0, 8);
      writeJSON(SEARCH_HISTORY_KEY, next);
      return next;
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    writeJSON(SEARCH_HISTORY_KEY, []);
  };

  return (
    <CatalogContext.Provider
      value={{
        products,
        vouchers,
        searchQuery,
        setSearchQuery,
        searchHistory,
        pushSearchHistory,
        clearSearchHistory,
        getProduct: (id) => products.find((p) => String(p.id) === String(id)),
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};