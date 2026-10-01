import { getStore, productStoreMap } from './stores';

const rawProducts = [
  {
    id: 1,
    name: 'Smartwatch Pro Ultra AMOLED Display GPS Health Tracker Anti Air IP68',
    category: 'gadget',
    price: 499000,
    originalPrice: 1299000,
    discount: 61,
    rating: 4.9,
    soldCount: 4820,
    stock: 45,
    location: 'Jakarta Barat',
    badge: 'Star+',
    isFlashSale: true,
    flashSaleProgress: 82,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80'
    ],
    variants: {
      colors: ['Midnight Black', 'Silver Titanium', 'Rose Gold', 'Ocean Blue'],
      options: ['Standard Strap', 'Mesh Milanese', 'Silicone Sport']
    },
    description: 'Smartwatch generasi terbaru dengan layar Ultra AMOLED 1.96 Inch Always-On Display. Mendukung lebih dari 120 mode olahraga, sensor detak jantung 24/7, SpO2, monitor tidur, dan sertifikasi tahan air IP68. Daya tahan baterai hingga 14 hari pemakaian normal.',
    freeShipping: true,
    cashback: '10%'
  },
  {
    id: 2,
    name: 'TWS Earphone Wireless Bluetooth 5.3 Active Noise Cancelling Bass Boost',
    category: 'gadget',
    price: 289000,
    originalPrice: 650000,
    discount: 55,
    rating: 4.8,
    soldCount: 9230,
    stock: 80,
    location: 'Surabaya',
    badge: 'Official Store',
    isFlashSale: true,
    flashSaleProgress: 91,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&auto=format&fit=crop&q=80'
    ],
    variants: {
      colors: ['Matte Black', 'Pearl White', 'Lavender Purple'],
      options: ['Basic Case', 'Silicone Protective Case']
    },
    description: 'Earphone wireless dengan driver audio 13mm dynamic titanium, teknologi Hybrid ANC (Active Noise Cancellation) hingga -38dB, latency super rendah 40ms khusus gaming, baterai tahan 36 jam dengan casing pengisian cepat Type-C.',
    freeShipping: true,
    cashback: '5%'
  },
  {
    id: 3,
    name: 'Mechanical Gaming Keyboard RGB Hot-Swappable 75% Layout Wireless / Type-C',
    category: 'gaming',
    price: 649000,
    originalPrice: 1100000,
    discount: 41,
    rating: 4.9,
    soldCount: 1650,
    stock: 25,
    location: 'Tangerang',
    badge: 'Star+',
    isFlashSale: true,
    flashSaleProgress: 75,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80'
    ],
    variants: {
      colors: ['Cyberpunk Neon', 'Retro Grey', 'Ghost White'],
      options: ['Red Switch (Linear)', 'Brown Switch (Tactile)', 'Blue Switch (Clicky)']
    },
    description: 'Keyboard gaming mechanical 75% compact dengan gasket mount, peredam suara multi-layer EVA foam, full key hot-swappable 3/5 pin, RGB per key dengan 20+ preset animasi, serta koneksi triple-mode (Bluetooth 5.1 / 2.4Ghz Wireless / Wired Type-C).',
    freeShipping: true,
    cashback: '8%'
  },
  {
    id: 4,
    name: 'Sneakers Pria Kasual Urban Sport Breathable Lightweight Sol Empuk Anti Slip',
    category: 'sepatu',
    price: 199000,
    originalPrice: 450000,
    discount: 56,
    rating: 4.7,
    soldCount: 6310,
    stock: 120,
    location: 'Bandung',
    badge: 'Star',
    isFlashSale: true,
    flashSaleProgress: 68,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80'
    ],
    variants: {
      colors: ['Flame Red', 'Triple Black', 'All White', 'Navy Silver'],
      options: ['39', '40', '41', '42', '43', '44']
    },
    description: 'Sneakers kasual pria terlaris dengan bahan flyknit mesh premium yang sirkulasi udaranya sejuk. Insole memory foam ultra-cushioning yang empuk dipakai seharian untuk jalan kaki, olahraga lari, maupun hangout santai.',
    freeShipping: true,
    cashback: '12%'
  },
  {
    id: 5,
    name: 'Jaket Hoodie Oversize Streetwear Katun Fleece 330gsm Tebal & Lembut',
    category: 'fashion-pria',
    price: 175000,
    originalPrice: 320000,
    discount: 45,
    rating: 4.8,
    soldCount: 3890,
    stock: 55,
    location: 'Bandung',
    badge: 'Star+',
    isFlashSale: false,
    flashSaleProgress: 0,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&auto=format&fit=crop&q=80'
    ],
    variants: {
      colors: ['Onyx Black', 'Cream Sand', 'Sage Green', 'Charcoal'],
      options: ['M', 'L', 'XL', 'XXL']
    },
    description: 'Hoodie oversized boxy fit dengan material katun fleece tebal 330 gsm, bagian dalam lembut tidak berbulu rontok. Jahitan rantai standar distro, rib elastis anti melar, dan saku kanguru yang luas.',
    freeShipping: true,
    cashback: '5%'
  },
  {
    id: 6,
    name: 'Tas Ransel Laptop 15.6 Inch Anti Air USB Charging Port Expandable Multifungsi',
    category: 'aksesoris',
    price: 245000,
    originalPrice: 520000,
    discount: 53,
    rating: 4.9,
    soldCount: 5410,
    stock: 60,
    location: 'Jakarta Utara',
    badge: 'Official Store',
    isFlashSale: false,
    flashSaleProgress: 0,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80'
    ],
    variants: {
      colors: ['Stealth Black', 'Modern Dark Grey', 'Deep Navy'],
      options: ['Standar 20L', 'Expandable 35L']
    },
    description: 'Tas ransel kerja & travel modern dengan kompartemen laptop berbusa tebal shockproof hingga 15.6 inch. Dilengkapi external port USB charger, kain oxford waterproof tahan hujan, dan strap koper belakang.',
    freeShipping: true,
    cashback: '10%'
  },
  {
    id: 7,
    name: 'Serum Wajah Niacinamide 10% + Zinc 1% Mencerahkan Kulit & Memudarkan Bekas Jerawat',
    category: 'kecantikan',
    price: 89000,
    originalPrice: 145000,
    discount: 38,
    rating: 4.9,
    soldCount: 14200,
    stock: 200,
    location: 'Jakarta Selatan',
    badge: 'Official Store',
    isFlashSale: false,
    flashSaleProgress: 0,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608248597359-0027f917537b?w=600&auto=format&fit=crop&q=80'
    ],
    variants: {
      colors: ['Full Size 30ml', 'Mini Travel Size 15ml'],
      options: ['Single Bottle', 'Twin Pack (Hemat 15%)']
    },
    description: 'Formula pencerah kulit dermatologically tested dengan Niacinamide murni 10% dan Zinc PCA 1%. Efektif menyamarkan noda hitam bekas jerawat, mengontrol minyak berlebih di pori-pori, dan memperkuat skin barrier dalam 14 hari pemakaian rutin.',
    freeShipping: true,
    cashback: '15%'
  },
  {
    id: 8,
    name: 'Smart Lampu Meja LED Eye Care Dimmable Touch Control Wireless Charger 15W',
    category: 'home',
    price: 219000,
    originalPrice: 420000,
    discount: 48,
    rating: 4.8,
    soldCount: 2190,
    stock: 40,
    location: 'Semarang',
    badge: 'Star+',
    isFlashSale: false,
    flashSaleProgress: 0,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&auto=format&fit=crop&q=80'
    ],
    variants: {
      colors: ['Pure White', 'Space Grey'],
      options: ['Standar LED', 'LED + Fast Wireless Charging Pad']
    },
    description: 'Lampu meja kerja/belajar modern dengan teknologi Eye-Protection tanpa radiasi cahaya biru berbahaya (RG0). 5 tingkat temperatur warna (2700K - 6500K) dan stepless dimming via sentuhan sensitif. Dilengkapi charging base nirkabel cepat 15W.',
    freeShipping: true,
    cashback: '5%'
  },
  {
    id: 9,
    name: 'Kamera Mirrorless 4K Vlogging Kit Flip Screen WiFi Live Streaming Full HD',
    category: 'elektronik',
    price: 3499000,
    originalPrice: 5800000,
    discount: 40,
    rating: 4.9,
    soldCount: 870,
    stock: 15,
    location: 'Jakarta Pusat',
    badge: 'Official Store',
    isFlashSale: true,
    flashSaleProgress: 88,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&auto=format&fit=crop&q=80'
    ],
    variants: {
      colors: ['Classic Black', 'Silver Retro Edition'],
      options: ['Body Only', 'Kit Lens 15-45mm', 'Creator Bundle (+ Mic & Tripod)']
    },
    description: 'Kamera mirrorless andalan content creator dan vlogger dengan sensor CMOS 24.1 MP, perekaman video 4K UHD, autofokus deteksi mata super akurat, layar sentuh putar 180 derajat, serta konektivitas WiFi & Bluetooth instan.',
    freeShipping: true,
    cashback: '10%'
  },
  {
    id: 10,
    name: 'Blouse Wanita Korean Style Tunik Casual Silk Premium Lengan Puff Elegan',
    category: 'fashion-wanita',
    price: 135000,
    originalPrice: 280000,
    discount: 51,
    rating: 4.8,
    soldCount: 4120,
    stock: 85,
    location: 'Solo',
    badge: 'Star',
    isFlashSale: false,
    flashSaleProgress: 0,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80'
    ],
    variants: {
      colors: ['Dusty Rose', 'Matcha Mint', 'Soft Almond', 'Sky Blue'],
      options: ['All Size (Fit to L)', 'XL Big Size']
    },
    description: 'Blouse tunik wanita model Korea dengan bahan silk crepe premium yang jatuh lembut, flowy, adem dan tidak menerawang. Detail kerah vintage dan kancing mutiara manis cocok untuk outfit ngantor, kuliah, maupun pesta.',
    freeShipping: true,
    cashback: '5%'
  },
  {
    id: 11,
    name: 'Air Purifier HEPA H13 Filter Smart Home Ionizer Pembersih Udara Ruangan',
    category: 'home',
    price: 849000,
    originalPrice: 1599000,
    discount: 46,
    rating: 4.9,
    soldCount: 3120,
    stock: 32,
    location: 'Tangerang Selatan',
    badge: 'Official Store',
    isFlashSale: false,
    flashSaleProgress: 0,
    images: [
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&auto=format&fit=crop&q=80'
    ],
    variants: {
      colors: ['Minimalist White'],
      options: ['Air Purifier + 1 Filter', 'Air Purifier + 2 Extra HEPA Filter']
    },
    description: 'Pembersih udara ruangan berteknologi True HEPA Filter H13 yang mampu menyaring 99.97% partikel PM2.5, debu halus, bulu hewan peliharaan, asap rokok, virus dan bakteri. Dilengkapi indikator kualitas udara LED cerdas 3 warna.',
    freeShipping: true,
    cashback: '8%'
  },
  {
    id: 12,
    name: 'Botol Minum Termos Stainless Steel 500ml Tahan Panas Dingin 24 Jam LED Suhu',
    category: 'home',
    price: 79000,
    originalPrice: 160000,
    discount: 50,
    rating: 4.9,
    soldCount: 11500,
    stock: 150,
    location: 'Jakarta Barat',
    badge: 'Star+',
    isFlashSale: true,
    flashSaleProgress: 94,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80'
    ],
    variants: {
      colors: ['Matte Black', 'Sakura Pink', 'Emerald Green', 'Arctic Silver'],
      options: ['500ml Standar', '750ml Jumbo']
    },
    description: 'Tumbler termos vacuum insulated SUS 304 food-grade ganda. Menjaga suhu air panas hingga 12 jam dan air es dingin hingga 24 jam. Tutup botol dilengkapi layar sentuh LCD pintar penunjuk temperatur suhu cairan di dalam botol.',
    freeShipping: true,
    cashback: '5%'
  }
];

export const products = rawProducts.map((p) => {
  const storeId = productStoreMap[p.id];
  return { ...p, storeId, store: getStore(storeId) };
});
