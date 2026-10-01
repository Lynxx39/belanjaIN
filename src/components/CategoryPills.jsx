import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';
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
  CategoryIconHome,
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
  home: CategoryIconHome,
};

export const CategoryPills = ({ activeId = 'all' }) => {
  const navigate = useNavigate();

  return (
    <section className="category-nav-section">
      <div className="category-scroll-list">
        {categories.map((cat) => {
          const IconComp = iconMap[cat.id] || CategoryIconAll;
          const isActive = activeId === cat.id;
          return (
            <button
              key={cat.id}
              className={`category-pill ${isActive ? 'active' : ''}`}
              onClick={() => navigate(`/kategori/${cat.id}`)}
            >
              <div className="category-icon-box" style={{ background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--bg-surface-elevated)' }}>
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