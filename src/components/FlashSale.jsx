import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';
import { Flame, Clock, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const FlashSale = () => {
  const { products } = useCatalog();
  const navigate = useNavigate();
  const flashProducts = products.filter((p) => p.isFlashSale);

  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 3, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num) => String(num).padStart(2, '0');
  if (flashProducts.length === 0) return null;

  return (
    <section id="flash-sale-section" className="flash-sale-section">
      <div className="flash-sale-header">
        <div className="flash-sale-title-group">
          <div className="flash-sale-title">
            <Flame size={26} color="#EE4D2D" fill="#EE4D2D" />
            <span>FLASH SALE</span>
          </div>
          <div className="timer-box">
            <Clock size={16} color="var(--text-muted)" style={{ marginRight: '4px' }} />
            <div className="timer-digit">{formatDigit(timeLeft.hours)}</div>
            <span className="timer-colon">:</span>
            <div className="timer-digit">{formatDigit(timeLeft.minutes)}</div>
            <span className="timer-colon">:</span>
            <div className="timer-digit">{formatDigit(timeLeft.seconds)}</div>
          </div>
        </div>

        <button
          onClick={() => navigate('/cari?q=flash%20sale')}
          className="section-link-btn"
        >
          <span>Lihat Semua</span>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="product-grid">
        {flashProducts.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} isFlashSaleItem={true} />
        ))}
      </div>
    </section>
  );
};