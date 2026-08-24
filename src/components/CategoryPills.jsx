import React from 'react';
import { categories } from '../data/categories';
import { useShop } from '../context/ShopContext';
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

const iconMap = {
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

export const CategoryPills = () => {
  const { selectedCategory, setSelectedCategory } = useShop();

  return (
    <section className="category-nav-section">
      <div className="category-scroll-list">
        {categories.map((cat) => {
          const IconComp = iconMap[cat.id] || CategoryIconAll;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              className={`category-pill ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <div 
                className="category-icon-box"
                style={{
                  background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--bg-surface-elevated)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <IconComp size={18} />
              </div>
              <span className="category-label">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
