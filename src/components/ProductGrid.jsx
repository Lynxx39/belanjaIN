import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { categories } from '../data/categories';
import { 
  SlidersHorizontal, 
  ShoppingBag, 
  AlertCircle,
  Percent,
  Truck,
  Check,
  RotateCcw
} from 'lucide-react';
import {
  CategoryIconAll,
  CategoryIconGadget,
  CategoryIconElektronik,
  CategoryIconGaming,
  CategoryIconFashionPria,
  CategoryIconFashionWanita,
  CategoryIconKecantikan,
  CategoryIconSepatu,
  CategoryIconAksesoris,
  CategoryIconHome
} from './ShopeeIcons';

const categoryIconMap = {
  all: CategoryIconAll,
  gadget: CategoryIconGadget,
  elektronik: CategoryIconElektronik,
  gaming: CategoryIconGaming,
  'fashion-pria': CategoryIconFashionPria,
  'fashion-wanita': CategoryIconFashionWanita,
  kecantikan: CategoryIconKecantikan,
  sepatu: CategoryIconSepatu,
  aksesoris: CategoryIconAksesoris,
  home: CategoryIconHome
};

export const ProductGrid = () => {
  const {
    products,
    searchQuery,
    selectedCategory,
    sortBy,
    setSortBy,
    onlyDiscount,
    setOnlyDiscount,
    onlyFreeShipping,
    setOnlyFreeShipping,
    setSearchQuery,
    setSelectedCategory
  } = useShop();

  const currentCategoryObj = categories.find((c) => c.id === selectedCategory);
  const categoryTitle = currentCategoryObj ? currentCategoryObj.name : 'Semua Produk';
  const CategoryIcon = categoryIconMap[selectedCategory] || ShoppingBag;

  // Filtering
  const filteredProducts = products.filter((p) => {
    // Search query match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCategory) return false;
    }

    // Category match
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }

    // Discount filter
    if (onlyDiscount && p.discount <= 0) {
      return false;
    }

    // Free shipping filter
    if (onlyFreeShipping && !p.freeShipping) {
      return false;
    }

    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'popular') return b.soldCount - a.soldCount;
    if (sortBy === 'best-seller') return b.soldCount - a.soldCount;
    if (sortBy === 'discount') return b.discount - a.discount;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const hasActiveFilters = onlyDiscount || onlyFreeShipping;

  return (
    <section id="product-feed-section" style={{ margin: '2.5rem 0' }}>
      {/* Header & Filter Controls */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div 
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'rgba(255, 75, 43, 0.12)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 75, 43, 0.25)'
                }}
              >
                <CategoryIcon size={18} strokeWidth={2.4} />
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
                {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : categoryTitle}
              </h2>
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Menampilkan <strong style={{ color: 'var(--text-main)' }}>{sortedProducts.length}</strong> produk pilihan terbaik
            </p>
          </div>

          {/* Interactive Filter Chips (No raw HTML checkboxes!) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              className={`filter-chip-btn ${onlyDiscount ? 'active' : ''}`}
              onClick={() => setOnlyDiscount(!onlyDiscount)}
              title="Filter hanya produk berdiskon"
            >
              <div className="filter-chip-icon">
                <Percent size={13} strokeWidth={2.6} />
              </div>
              <span>Hanya Diskon</span>
              {onlyDiscount && <Check size={14} strokeWidth={3} style={{ marginLeft: '2px' }} />}
            </button>

            <button
              className={`filter-chip-btn ${onlyFreeShipping ? 'active-green' : ''}`}
              onClick={() => setOnlyFreeShipping(!onlyFreeShipping)}
              title="Filter produk dengan Gratis Ongkir XTRA"
            >
              <div className="filter-chip-icon">
                <Truck size={13} strokeWidth={2.6} />
              </div>
              <span>Gratis Ongkir XTRA</span>
              {onlyFreeShipping && <Check size={14} strokeWidth={3} style={{ marginLeft: '2px' }} />}
            </button>

            {hasActiveFilters && (
              <button
                className="filter-reset-btn"
                onClick={() => {
                  setOnlyDiscount(false);
                  setOnlyFreeShipping(false);
                }}
                title="Reset filter"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Sort Tabs Bar */}
        <div className="filter-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-subtle)', fontSize: '0.85rem', fontWeight: 700 }}>
            <SlidersHorizontal size={16} />
            <span>Urutkan:</span>
          </div>

          <div className="filter-tabs">
            <button
              className={`filter-tab-btn ${sortBy === 'popular' ? 'active' : ''}`}
              onClick={() => setSortBy('popular')}
            >
              Terkait & Populer
            </button>
            <button
              className={`filter-tab-btn ${sortBy === 'best-seller' ? 'active' : ''}`}
              onClick={() => setSortBy('best-seller')}
            >
              Terlaris
            </button>
            <button
              className={`filter-tab-btn ${sortBy === 'discount' ? 'active' : ''}`}
              onClick={() => setSortBy('discount')}
            >
              Diskon Terbesar
            </button>
            <button
              className={`filter-tab-btn ${sortBy === 'price-low' ? 'active' : ''}`}
              onClick={() => setSortBy('price-low')}
            >
              Harga Terendah
            </button>
            <button
              className={`filter-tab-btn ${sortBy === 'price-high' ? 'active' : ''}`}
              onClick={() => setSortBy('price-high')}
            >
              Harga Tertinggi
            </button>
            <button
              className={`filter-tab-btn ${sortBy === 'rating' ? 'active' : ''}`}
              onClick={() => setSortBy('rating')}
            >
              Rating Tertinggi
            </button>
          </div>
        </div>
      </div>

      {/* Products Feed */}
      {sortedProducts.length > 0 ? (
        <div className="product-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border-subtle)'
          }}
        >
          <AlertCircle size={48} color="var(--primary)" style={{ marginBottom: '1rem', opacity: 0.8 }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Tidak ada produk yang sesuai
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
            Coba sesuaikan filter atau reset pencarian untuk menemukan produk lainnya.
          </p>
          <button
            className="btn-primary"
            onClick={() => {
              setOnlyDiscount(false);
              setOnlyFreeShipping(false);
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Reset Semua Filter
          </button>
        </div>
      )}
    </section>
  );
};
