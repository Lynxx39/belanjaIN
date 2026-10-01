import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { HeroBanner } from '../components/HeroBanner';
import { QuickServiceGrid } from '../components/QuickServiceGrid';
import { CategoryPills } from '../components/CategoryPills';
import { FlashSale } from '../components/FlashSale';
import { LiveStreamFeed } from '../components/LiveStreamFeed';
import { ProductGrid } from '../components/ProductGrid';
import { sortProducts } from '../utils/catalog';

export const Home = () => {
  const { products } = useCatalog();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#live') {
      const el = document.getElementById('live-stream-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const popular = sortProducts(products, 'populer');

  return (
    <>
      <HeroBanner />
      <QuickServiceGrid />
      <CategoryPills activeId="all" />
      <FlashSale />
      <LiveStreamFeed />
      <section style={{ margin: '2.5rem 0' }}>
        <div className="section-head-row">
          <h2 className="section-title">Rekomendasi Untukmu</h2>
        </div>
        <ProductGrid items={popular} />
      </section>
    </>
  );
};