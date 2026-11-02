// Voucher amount for percent/fixed types. Shipping vouchers are handled by the
// checkout shipping calculation, so they return 0 here.
export const voucherDiscount = (subtotal, voucher, items = []) => {
  if (!voucher) return 0;
  const minSpend = voucher.minSpend || 0;

  let eligibleSubtotal = Number(subtotal) || 0;
  // For store-specific vouchers, verify items from that store exist and calculate against store subtotal
  if (voucher.scope === 'store' && voucher.storeId) {
    const storeItems = items.filter((i) => (i.storeId || i.product?.storeId) === voucher.storeId);
    if (storeItems.length === 0) return 0;
    eligibleSubtotal = storeItems.reduce((sum, i) => sum + (Number(i.product?.price) || 0) * (Number(i.quantity) || 1), 0);
  }

  if (eligibleSubtotal < minSpend) return 0;

  if (voucher.discountType === 'percent') {
    const maxDiscount = typeof voucher.maxDiscount === 'number' ? voucher.maxDiscount : Infinity;
    const calculated = (eligibleSubtotal * Number(voucher.discountValue || 0)) / 100;
    return Math.round(Math.min(calculated, maxDiscount, eligibleSubtotal));
  }
  if (voucher.discountType === 'fixed') {
    return Math.min(Number(voucher.discountValue) || 0, eligibleSubtotal);
  }
  return 0;
};

export const isEligible = (subtotal, voucher, items = []) => {
  if (!voucher) return false;
  const min = voucher.minSpend || 0;
  if (voucher.scope === 'store' && voucher.storeId && items.length > 0) {
    const storeItems = items.filter((i) => (i.storeId || i.product?.storeId) === voucher.storeId);
    if (storeItems.length === 0) return false;
    const storeSubtotal = storeItems.reduce((sum, i) => sum + (Number(i.product?.price) || 0) * (Number(i.quantity) || 1), 0);
    return storeSubtotal >= min;
  }
  return (Number(subtotal) || 0) >= min;
};
