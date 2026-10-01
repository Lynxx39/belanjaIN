// Voucher amount for percent/fixed types. Shipping vouchers are handled by the
// checkout shipping calculation, so they return 0 here.
export const voucherDiscount = (subtotal, voucher) => {
  if (!voucher || subtotal < voucher.minSpend) return 0;
  if (voucher.discountType === 'percent') {
    return Math.min((subtotal * voucher.discountValue) / 100, voucher.maxDiscount);
  }
  if (voucher.discountType === 'fixed') {
    return voucher.discountValue;
  }
  return 0;
};

export const isEligible = (subtotal, voucher) => Boolean(voucher) && subtotal >= voucher.minSpend;