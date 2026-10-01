export const stores = [
  { id: 'techhub', name: 'TechHub Official', isOfficial: true, location: 'Jakarta Barat' },
  { id: 'gadgetstore', name: 'Gadget Store ID', isOfficial: false, location: 'Surabaya' },
  { id: 'keyzone', name: 'KeyZone Gaming', isOfficial: true, location: 'Tangerang' },
  { id: 'urbanstep', name: 'UrbanStep Store', isOfficial: false, location: 'Bandung' },
  { id: 'hoodielab', name: 'Hoodie Lab', isOfficial: false, location: 'Bandung' },
  { id: 'bagzone', name: 'BagZone ID', isOfficial: true, location: 'Jakarta Utara' },
  { id: 'glowcare', name: 'GlowCare Beauty', isOfficial: true, location: 'Jakarta Selatan' },
  { id: 'homeliving', name: 'HomeLiving ID', isOfficial: false, location: 'Semarang' },
  { id: 'camworld', name: 'CamWorld Official', isOfficial: true, location: 'Jakarta Pusat' },
  { id: 'stylekorea', name: 'Style Korea', isOfficial: false, location: 'Solo' },
  { id: 'freshhome', name: 'FreshHome Official', isOfficial: true, location: 'Tangerang Selatan' },
  { id: 'drinkware', name: 'DrinkWare ID', isOfficial: false, location: 'Jakarta Barat' },
];

export const productStoreMap = {
  1: 'techhub',
  2: 'gadgetstore',
  3: 'keyzone',
  4: 'urbanstep',
  5: 'hoodielab',
  6: 'bagzone',
  7: 'glowcare',
  8: 'homeliving',
  9: 'camworld',
  10: 'stylekorea',
  11: 'freshhome',
  12: 'drinkware',
};

export const DEFAULT_STORE = { id: 'unknown', name: 'Toko Lain', isOfficial: false, location: 'Indonesia' };

export const getStore = (storeId) => stores.find((s) => s.id === storeId) || DEFAULT_STORE;