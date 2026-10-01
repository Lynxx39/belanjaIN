export const SHIPPING_OPTIONS = {
  instant: { key: 'instant', name: 'Instant (2-3 Jam)', price: 20000, eta: 'Hari Ini' },
  reguler: { key: 'reguler', name: 'Reguler (SiCepat / J&T)', price: 12000, eta: '1 - 2 Hari' },
  hemat: { key: 'hemat', name: 'Hemat Ekonomi', price: 8000, eta: '3 - 4 Hari' },
};

export const PAYMENT_METHODS = [
  { key: 'belanjapay', name: 'belanjaPay', note: 'Saldo: Rp 1.500.000', instant: true },
  { key: 'qris', name: 'QRIS Instan', note: 'GoPay, OVO, DANA, BCA', instant: false },
  { key: 'bca_va', name: 'BCA / Mandiri VA', note: 'Verifikasi Otomatis', instant: false },
  { key: 'cod', name: 'COD (Bayar di Tempat)', note: 'Bayar saat barang tiba', instant: true },
];

export const groupByStore = (items) =>
  Object.values(
    items.reduce((acc, item) => {
      const sid = item.storeId || 'unknown';
      (acc[sid] = acc[sid] || []).push(item);
      return acc;
    }, {})
  );