import React from 'react';
import { quickServices } from '../data/quickServices';
import { useShop } from '../context/ShopContext';
import {
  Icon3DFlashSale,
  Icon3DOngkir,
  Icon3DMall,
  Icon3DLive,
  Icon3DVoucher,
  Icon3DKoin,
  Icon3DPay,
  Icon3DPulsa
} from './ShopeeIcons';

const iconMap = {
  Flame: Icon3DFlashSale,
  Truck: Icon3DOngkir,
  Crown: Icon3DMall,
  Radio: Icon3DLive,
  Ticket: Icon3DVoucher,
  Coins: Icon3DKoin,
  Wallet: Icon3DPay,
  Zap: Icon3DPulsa
};

export const QuickServiceGrid = () => {
  const {
    setOnlyFreeShipping,
    setIsCartOpen,
    showToast,
    setSelectedCategory
  } = useShop();

  const handleServiceClick = (service) => {
    if (service.targetId) {
      const el = document.getElementById(service.targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (service.filter === 'freeShipping') {
      setOnlyFreeShipping((prev) => !prev);
      const el = document.getElementById('product-feed-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      showToast('Filter Gratis Ongkir', 'Menampilkan produk dengan Gratis Ongkir XTRA', 'info');
    } else if (service.action === 'voucher') {
      setIsCartOpen(true);
      showToast('Voucher Belanja', 'Klaim voucher HEMAT50 atau BELANJABARU di keranjang!', 'info');
    } else if (service.action === 'koin') {
      showToast('Koin belanjaIN', 'Kamu mendapatkan +500 Koin belanjaIN hari ini! 🪙', 'success');
    } else if (service.action === 'pay') {
      showToast('belanjaPay Aktif', 'Saldo Anda: Rp 1.500.000 (Siap digunakan untuk checkout)', 'success');
    } else if (service.action === 'pulsa') {
      showToast('Layanan Pulsa & Tagihan', 'Fitur Top-Up & Pembayaran Tagihan aktif', 'info');
    } else {
      setSelectedCategory('all');
    }
  };

  return (
    <section className="quick-services-section">
      <div className="quick-services-scroll">
        {quickServices.map((srv) => {
          const IconComp = iconMap[srv.icon] || Icon3DFlashSale;

          return (
            <div
              key={srv.id}
              className="quick-service-item"
              onClick={() => handleServiceClick(srv)}
            >
              <div
                className="quick-service-icon-wrap"
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <IconComp size={30} />
                {srv.badge && (
                  <span
                    className="quick-service-badge"
                    style={{
                      background: srv.badge === 'LIVE' ? '#EF4444' : srv.color
                    }}
                  >
                    {srv.badge}
                  </span>
                )}
              </div>
              <span className="quick-service-name">{srv.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
