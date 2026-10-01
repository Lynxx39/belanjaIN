import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Flame, Clock, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const FlashSale = () => {
  const { products } = useShop();

  // Flash sale products
  const flashProducts = products.filter((p) => p.isFlashSale);

  // Live countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 3, minutes: 0, seconds: 0 };
        }
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
            <Flame size={26} color="#FF4B2B" fill="#FF4B2B" />
            <span>FLASH SALE KILAT</span>
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
          onClick={() => {
            const el = document.getElementById('product-feed-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          <span>Lihat Semua Promo</span>
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="product-grid">
        {flashProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} isFlashSaleItem={true} />
        ))}
      </div>
    </section>
  );
};
