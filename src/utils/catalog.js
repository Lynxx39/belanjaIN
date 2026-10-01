export const sortProducts = (list, sortBy) => {
  const sorted = [...list];
  if (sortBy === 'terbaru') return sorted.sort((a, b) => b.id - a.id);
  if (sortBy === 'harga-rendah') return sorted.sort((a, b) => a.price - b.price);
  if (sortBy === 'harga-tinggi') return sorted.sort((a, b) => b.price - a.price);
  if (sortBy === 'diskon') return sorted.sort((a, b) => b.discount - a.discount);
  return sorted.sort((a, b) => b.soldCount - a.soldCount);
};

export const filterProducts = (list, opts = {}) => {
  const { q = '', category = 'all', minPrice = '', maxPrice = '', onlyDiscount = false, onlyFreeShipping = false, minRating = 0, location = '' } = opts;
  const query = q.trim().toLowerCase();

  return list.filter((p) => {
    if (query) {
      const haystack = `${p.name} ${p.description} ${p.category} ${p.store?.name || ''}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (category && category !== 'all' && p.category !== category) return false;
    if (minPrice !== '' && p.price < Number(minPrice)) return false;
    if (maxPrice !== '' && p.price > Number(maxPrice)) return false;
    if (onlyDiscount && p.discount <= 0) return false;
    if (onlyFreeShipping && !p.freeShipping) return false;
    if (minRating && p.rating < Number(minRating)) return false;
    if (location && !(p.store?.location || p.location || '').toLowerCase().includes(location.toLowerCase())) return false;
    return true;
  });
};

export const locations = ['Jakarta', 'Bandung', 'Surabaya', 'Tangerang', 'Semarang', 'Solo'];