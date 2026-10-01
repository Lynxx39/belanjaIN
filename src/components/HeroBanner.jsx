import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { banners } from '../data/banners';
import { ArrowRight, Zap } from 'lucide-react';

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const banner = banners[currentSlide];

  return (
    <section className="hero-section">
      <div className="hero-card" style={{ backgroundImage: `url(${banner.image})`, position: 'relative' }}>
        <div
          className="hero-overlay"
          style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 100%)' }}
        />

        <div className="hero-content">
          <div className="hero-badge">
            <Zap size={14} fill="#FFD839" />
            {banner.badge}
          </div>
          <h1 className="hero-title">{banner.title}</h1>
          <p className="hero-subtitle">{banner.subtitle}</p>

          <div className="hero-tags">
            {banner.tags.map((tag, idx) => (
              <span key={idx} className="hero-tag-item">{tag}</span>
            ))}
          </div>

          <button className="hero-cta" onClick={() => navigate(`/kategori/${banner.categoryTarget}`)}>
            <span>{banner.ctaText}</span>
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="hero-indicators">
          {banners.map((_, idx) => (
            <div
              key={idx}
              className={`hero-indicator ${idx === currentSlide ? 'active' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`Tampilkan slide ${idx + 1}`}
              onClick={() => setCurrentSlide(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCurrentSlide(idx);
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};