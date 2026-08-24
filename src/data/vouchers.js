export const vouchers = [
  {
    code: 'HEMAT50',
    title: 'Diskon 50% s/d Rp 50.000',
    minSpend: 100000,
    discountType: 'percent',
    discountValue: 50,
    maxDiscount: 50000,
    description: 'Min. belanja Rp 100RB. Khusus produk Flash Sale & Pilihan belanjaIN.'
  },
  {
    code: 'GRATISONGKIR',
    title: 'Gratis Ongkir s/d Rp 20.000',
    minSpend: 50000,
    discountType: 'shipping',
    discountValue: 20000,
    maxDiscount: 20000,
    description: 'Min. belanja Rp 50RB untuk semua opsi pengiriman ekspedisi.'
  },
  {
    code: 'BELANJABARU',
    title: 'Diskon Pengguna Baru Rp 25.000',
    minSpend: 50000,
    discountType: 'fixed',
    discountValue: 25000,
    maxDiscount: 25000,
    description: 'Potongan langsung Rp 25RB khusus akun baru di belanjaIN.'
  },
  {
    code: 'CASHBACK20',
    title: 'Cashback 20% Koin belanjaIN',
    minSpend: 150000,
    discountType: 'percent',
    discountValue: 20,
    maxDiscount: 40000,
    description: 'Min. belanja Rp 150RB. Cashback koin instan setelah pesanan sampai.'
  }
];
