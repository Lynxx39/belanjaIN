import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUi } from '../context/UiContext';
import { StoreCartGroup } from '../components/StoreCartGroup';
import { VoucherPicker } from '../components/VoucherPicker';
import { voucherDiscount } from '../utils/coupon';
import { formatRupiah } from '../utils/format';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, selectedItems, subtotal, toggleSelectAllCart } = useCart();
  const { appliedVoucher } = useUi();

  if (cart.length === 0) {
    return (
      <div className="empty-state-box" style={{ margin: '3rem 0' }}>
        <ShoppingBag size={56} color="var(--text-subtle)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
        <h3>Keranjang Anda Kosong</h3>
        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem' }}>Yuk, temukan produk pilihan dengan diskon menarik!</p>
        <button className="btn-primary" onClick={() => navigate('/')}>Mulai Belanja</button>
      </div>
    );
  }

  const storeGroups = Object.values(
    cart.reduce((acc, item) => {
      const sid = item.storeId || 'unknown';
      (acc[sid] = acc[sid] || []).push(item);
      return acc;
    }, {})
  );

  const allSelected = cart.every((i) => i.selected);
  const discount = voucherDiscount(subtotal, appliedVoucher);
  const total = Math.max(0, subtotal - discount);

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div className="section-head-row">
        <h1 className="section-title">Keranjang Belanja ({cart.length})</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          <div className="cart-selectall">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600, cursor: 'pointer' }}>
              <input type="checkbox" checked={allSelected} onChange={(e) => toggleSelectAllCart(e.target.checked)} className="cart-checkbox" />
              <span>Pilih Semua ({cart.length} produk)</span>
            </label>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{selectedItems.length} dipilih</span>
          </div>

          {storeGroups.map((items) => {
            const sid = items[0].storeId || 'unknown';
            return <StoreCartGroup key={sid} storeId={sid} items={items} />;
          })}
        </div>

        <aside className="cart-summary">
          <h2 className="cart-summary-title">Ringkasan Belanja</h2>
          <div className="cart-summary-row"><span>Subtotal ({selectedItems.length} produk)</span><span>{formatRupiah(subtotal)}</span></div>
          {discount > 0 && (
            <div className="cart-summary-row discount"><span>Potongan Voucher</span><span>-{formatRupiah(discount)}</span></div>
          )}
          <div className="cart-summary-total"><span>Total</span><span>{formatRupiah(total)}</span></div>

          <button
            className="btn-primary"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={selectedItems.length === 0}
            onClick={() => navigate('/checkout')}
          >
            Checkout ({selectedItems.length}) <ArrowRight size={16} />
          </button>

          <VoucherPicker subtotal={subtotal} storeId={storeGroups[0]?.[0]?.storeId} />
        </aside>
      </div>
    </div>
  );
};