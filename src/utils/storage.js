const PREFIX = 'belanjaIN';
const MIGRATED_KEY = `${PREFIX}:migrated`;

export const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const writeJSON = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

export const accountKeys = (userId) => ({
  cart: `${PREFIX}:${userId}:cart`,
  wishlist: `${PREFIX}:${userId}:wishlist`,
  orders: `${PREFIX}:${userId}:orders`,
  addresses: `${PREFIX}:${userId}:addresses`,
});

export const SESSION_KEY = `${PREFIX}:session`;
export const SEARCH_HISTORY_KEY = `${PREFIX}:search-history`;

export const GUEST_ID = 'guest';

// One-time migration from the old flat localStorage keys (pre-overhaul).
export const migrateLegacy = () => {
  try {
    if (localStorage.getItem(MIGRATED_KEY)) return;
    const guest = accountKeys(GUEST_ID);
    const legacyCart = localStorage.getItem('shopee_cart');
    if (legacyCart && !localStorage.getItem(guest.cart)) {
      localStorage.setItem(guest.cart, legacyCart);
    }
    const legacyWishlist = localStorage.getItem('shopee_wishlist');
    if (legacyWishlist && !localStorage.getItem(guest.wishlist)) {
      localStorage.setItem(guest.wishlist, legacyWishlist);
    }
    localStorage.removeItem('shopee_theme');
    localStorage.setItem(MIGRATED_KEY, '1');
  } catch (e) {
    console.error(e);
  }
};