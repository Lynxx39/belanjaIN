// Minimal runnable self-check for the non-trivial pure logic.
// Run: node src/utils/selfcheck.mjs
import assert from 'node:assert/strict';
import { filterProducts, sortProducts } from './catalog.js';
import { voucherDiscount, isEligible } from './coupon.js';
import { groupByStore } from './shipping.js';
import { addressForm, phone } from './validate.js';

const sample = [
  { id: 1, name: 'Murah', category: 'gadget', price: 100, discount: 10, freeShipping: true, rating: 4.9, soldCount: 10 },
  { id: 2, name: 'Mahal', category: 'gadget', price: 900, discount: 0, freeShipping: false, rating: 4.2, soldCount: 90 },
  { id: 3, name: 'Sepatu', category: 'sepatu', price: 500, discount: 30, freeShipping: true, rating: 4.7, soldCount: 50 },
];

assert.equal(filterProducts(sample, { category: 'gadget' }).length, 2);
assert.equal(filterProducts(sample, { minPrice: 200 }).length, 2);
assert.equal(filterProducts(sample, { onlyDiscount: true }).length, 2);
assert.equal(filterProducts(sample, { onlyFreeShipping: true }).length, 2);
assert.equal(filterProducts(sample, { minRating: 4.8 }).length, 1);
assert.equal(filterProducts(sample, { q: 'sepatu' }).length, 1);

assert.equal(sortProducts(sample, 'harga-rendah')[0].price, 100);
assert.equal(sortProducts(sample, 'harga-tinggi')[0].price, 900);
assert.equal(sortProducts(sample, 'diskon')[0].id, 3);
assert.equal(sortProducts(sample, 'populer')[0].id, 2);

const percentVoucher = { minSpend: 1000, discountType: 'percent', discountValue: 50, maxDiscount: 300 };
assert.equal(voucherDiscount(2000, percentVoucher), 300, 'percent capped at maxDiscount');
assert.equal(voucherDiscount(500, percentVoucher), 0, 'below minSpend gives 0');
assert.equal(isEligible(1000, percentVoucher), true);
assert.equal(isEligible(999, percentVoucher), false);
assert.equal(voucherDiscount(2000, { minSpend: 0, discountType: 'shipping', discountValue: 20000 }), 0, 'shipping handled elsewhere');

const grouped = groupByStore([
  { storeId: 'a', id: 1 }, { storeId: 'b', id: 2 }, { storeId: 'a', id: 3 },
]);
assert.equal(grouped.length, 2);
assert.equal(grouped.find((g) => g[0].storeId === 'a').length, 2);

assert.equal(addressForm({ name: '', phone: '081234567890', detail: 'x' }).ok, false);
assert.equal(addressForm({ name: 'Budi', phone: '081', detail: 'x' }).ok, false);
assert.equal(addressForm({ name: 'Budi', phone: '081234567890', detail: 'Jl. Mawar' }).ok, true);
assert.equal(phone('+62 812-3456-7890').ok, true);

console.log('selfcheck OK');