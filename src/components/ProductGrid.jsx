import React from 'react';
import { ProductCard } from './ProductCard';
import { AlertCircle } from 'lucide-react';

export const ProductGrid = ({ items, emptyMessage = 'Tidak ada produk yang sesuai', onReset }) => {
  if (!items || items.length === 0) {
    return (
      <div className="empty-state-box">
        <AlertCircle size={48} color="var(--primary)" style={{ marginBottom: '1rem', opacity: 0.8 }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{emptyMessage}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
          Coba sesuaikan filter atau reset pencarian untuk menemukan produk lainnya.
        </p>
        {onReset && <button className="btn-primary" onClick={onReset}>Reset Semua Filter</button>}
      </div>
    );
  }

  return (
    <div className="product-grid">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};