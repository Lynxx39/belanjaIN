import React from 'react';
import { useNavigate } from 'react-router-dom';
import { quickServices } from '../data/quickServices';
import { useUi } from '../context/UiContext';
import {
  Icon3DFlashSale,
  Icon3DOngkir,
  Icon3DMall,
  Icon3DLive,
  Icon3DVoucher,
  Icon3DKoin,
  Icon3DPay,
  Icon3DPulsa,
} from './ShopeeIcons';

const iconMap = {
  Flame: Icon3DFlashSale,
  Truck: Icon3DOngkir,
  Crown: Icon3DMall,
  Radio: Icon3DLive,
  Ticket: Icon3DVoucher,
  Coins: Icon3DKoin,
  Wallet: Icon3DPay,
  Zap: Icon3DPulsa,
};

export const QuickServiceGrid = () => {
  const navigate = useNavigate();
  const { showToast } = useUi();

  const handleServiceClick = (service) => {
    if (service.id === 'flash-sale') return navigate('/cari?q=flash%20sale');
    if (service.id === 'ongkir') return navigate('/kategori/all?freeShipping=1');
    if (service.id === 'mall') return navigate('/kategori/all?official=1');
    if (service.id === 'live') return navigate('/#live');
    if (service.action === 'voucher') {
      navigate('/keranjang');
      showToast('Voucher Belanja', 'Klaim voucher HEMAT50 atau BELANJABARU di keranjang!', 'info');
      return;
    }
    if (service.action === 'koin') return showToast('Koin belanjaIN', 'Kamu mendapatkan +500 Koin belanjaIN hari ini!', 'success');
    if (service.action === 'pay') return showToast('belanjaPay Aktif', 'Saldo Anda: Rp 1.500.000 (siap checkout)', 'success');
    if (service.action === 'pulsa') return showToast('Pulsa & Tagihan', 'Fitur Top-Up & Pembayaran Tagihan aktif', 'info');
    navigate('/kategori/all');
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
              role="button"
              tabIndex={0}
              onClick={() => handleServiceClick(srv)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleServiceClick(srv);
                }
              }}
            >
              <div className="quick-service-icon-wrap">
                <IconComp size={30} />
                {srv.badge && (
                  <span className="quick-service-badge" style={{ background: srv.badge === 'LIVE' ? '#EF4444' : srv.color }}>
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