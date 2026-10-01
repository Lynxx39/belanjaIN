import React, { useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { CategoryPills } from '../components/CategoryPills';
import { ProductGrid } from '../components/ProductGrid';
import { categories } from '../data/categories';
import { filterProducts, sortProducts, locations } from '../utils/catalog';
import { SlidersHorizontal, Percent, Truck, Star, RotateCcw, MapPin, Check } from 'lucide-react';

const SORTS = [
  { id: 'populer', label: 'Terkait' },
  { id: 'terbaru', label: 'Terbaru' },
  { id: 'diskon', label: 'Diskon Terbesar' },
  { id: 'harga-rendah', label: 'Harga Terendah' },
  { id: 'harga-tinggi', label: 'Harga Tertinggi' },
];

export const Category = () => {
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const { products } = useCatalog();

  const categoryId = id || 'all';
  const currentCategory = categories.find((c) => c.id === categoryId);
  const title = currentCategory ? currentCategory.name : 'Semua Produk';

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [location, setLocation] = useState('');
  const onlyDiscount = params.get('discount') === '1';
  const onlyFreeShipping = params.get('freeShipping') === '1';
  const onlyOfficial = params.get('official') === '1';
  const sortBy = params.get('sort') || 'populer';

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const base = filterProducts(products, {
      category: categoryId,
      minPrice,
      maxPrice,
      onlyDiscount,
      onlyFreeShipping,
      minRating,
      location,
    });
    return sortProducts(onlyOfficial ? base.filter((p) => p.store?.isOfficial) : base, sortBy);
  }, [products, categoryId, minPrice, maxPrice, onlyDiscount, onlyFreeShipping, minRating, location, onlyOfficial, sortBy]);

  const resetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setMinRating(0);
    setLocation('');
    setParams(new URLSearchParams(sortBy !== 'populer' ? { sort: sortBy } : {}), { replace: true });
  };

  return (
    <>
      <CategoryPills activeId={categoryId} />

      <div className="catalog-layout">
        <aside className="filter-panel">
          <div className="filter-panel-title"><SlidersHorizontal size={16} /> Filter</div>

          <div className="filter-group">
            <div className="filter-group-title">Harga</div>
            <div className="filter-price-row">
              <input type="number" placeholder="Rp Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="filter-input" />
              <span>-</span>
              <input type="number" placeholder="Rp Maks" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="filter-input" />
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-group-title">Rating</div>
            <div className="filter-rating-row">
              {[0, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  className={`filter-chip-btn ${minRating === r ? 'active' : ''}`}
                  onClick={() => setMinRating(r)}
                >
                  {r === 0 ? 'Semua' : (<><Star size={12} fill="currentColor" /> {r}+</>)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-group-title">Lokasi</div>
            <div className="filter-location-list">
              <button className={`filter-loc-btn ${location === '' ? 'active' : ''}`} onClick={() => setLocation('')}>Semua Lokasi</button>
              {locations.map((loc) => (
                <button key={loc} className={`filter-loc-btn ${location === loc ? 'active' : ''}`} onClick={() => setLocation(loc)}>
                  <MapPin size={12} /> {loc}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <div className="filter-group-title">Tipe</div>
            <button className={`filter-chip-btn ${onlyDiscount ? 'active' : ''}`} onClick={() => setParam('discount', onlyDiscount ? '' : '1')}>
              <Percent size={13} /> Diskon {onlyDiscount && <Check size={13} />}
            </button>
            <button className={`filter-chip-btn ${onlyFreeShipping ? 'active-green' : ''}`} onClick={() => setParam('freeShipping', onlyFreeShipping ? '' : '1')}>
              <Truck size={13} /> Gratis Ongkir {onlyFreeShipping && <Check size={13} />}
            </button>
            <button className={`filter-chip-btn ${onlyOfficial ? 'active' : ''}`} onClick={() => setParam('official', onlyOfficial ? '' : '1')}>
              Mall / Official {onlyOfficial && <Check size={13} />}
            </button>
          </div>

          <button className="filter-reset-btn" onClick={resetFilters}><RotateCcw size={13} /> Reset Filter</button>
        </aside>

        <div className="catalog-main">
          <div className="catalog-head">
            <h1 className="section-title">{title}</h1>
            <div className="sort-tabs">
              {SORTS.map((s) => (
                <button key={s.id} className={`sort-tab ${sortBy === s.id ? 'active' : ''}`} onClick={() => setParam('sort', s.id === 'populer' ? '' : s.id)}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <p className="catalog-count">Menampilkan <strong>{filtered.length}</strong> produk</p>
          <ProductGrid items={filtered} onReset={resetFilters} />
        </div>
      </div>
    </>
  );
};