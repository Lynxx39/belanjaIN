import React, { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { ProductGrid } from '../components/ProductGrid';
import { filterProducts, sortProducts } from '../utils/catalog';
import { Search as SearchIcon, History, X } from 'lucide-react';

export const Search = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { products, searchHistory, pushSearchHistory, clearSearchHistory } = useCatalog();
  const q = params.get('q') || '';

  const results = useMemo(() => sortProducts(filterProducts(products, { q }), 'populer'), [products, q]);

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div className="section-head-row">
        <h1 className="section-title">
          {q ? `Hasil Pencarian: "${q}"` : 'Semua Produk'}
        </h1>
      </div>
      <p className="catalog-count">Ditemukan <strong>{results.length}</strong> produk</p>

      {!q && searchHistory.length > 0 && (
        <div className="search-history-box">
          <div className="search-history-head">
            <span><History size={15} /> Riwayat Pencarian</span>
            <button className="filter-reset-btn" onClick={clearSearchHistory}><X size={13} /> Hapus</button>
          </div>
          <div className="search-history-list">
            {searchHistory.map((term) => (
              <button key={term} className="search-history-chip" onClick={() => { pushSearchHistory(term); navigate(`/cari?q=${encodeURIComponent(term)}`); }}>
                <SearchIcon size={12} /> {term}
              </button>
            ))}
          </div>
        </div>
      )}

      <ProductGrid items={results} emptyMessage={q ? `Tidak ada hasil untuk "${q}"` : 'Belum ada produk'} />
    </div>
  );
};