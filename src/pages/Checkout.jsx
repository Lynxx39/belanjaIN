import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAccount } from '../context/AccountContext';
import { useUi } from '../context/UiContext';
import { getStore } from '../data/stores';
import { SHIPPING_OPTIONS, PAYMENT_METHODS, groupByStore } from '../utils/shipping';
import { voucherDiscount } from '../utils/coupon';
import { formatRupiah } from '../utils/format';
import { addressForm } from '../utils/validate';
import { MapPin, Truck, CreditCard, ShieldCheck, Plus, Store, Check } from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const { selectedItems, subtotal, removeSelectedCartItems } = useCart();
  const { account, defaultAddress, placeOrder } = useAccount();
  const { appliedVoucher, setAppliedVoucher, showToast } = useUi();

  const [shipping, setShipping] = useState({});
  const [payment, setPayment] = useState('belanjapay');
  const [note, setNote] = useState('');
  const [guestAddr, setGuestAddr] = useState({ label: 'Rumah', name: '', phone: '', detail: '', isDefault: true });
  const [guestError, setGuestError] = useState('');

  if (selectedItems.length === 0) {
    return (
      <div className="empty-state-box" style={{ margin: '3rem 0' }}>
        <h3>Tidak ada produk untuk di-checkout</h3>
        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem' }}>Pilih produk di keranjang terlebih dahulu.</p>
        <button className="btn-primary" onClick={() => navigate('/keranjang')}>Ke Keranjang</button>
      </div>
    );
  }

  const address = account ? defaultAddress : guestAddr;
  const groups = groupByStore(selectedItems);

  const shippingFor = (key) => (shipping[key] || 'reguler');
  const totalShipping = groups.reduce((sum, items) => {
    const storeId = items[0].storeId;
    return sum + SHIPPING_OPTIONS[shippingFor(storeId)].price;
  }, 0);

  const shippingVoucher = appliedVoucher?.discountType === 'shipping' ? appliedVoucher : null;
  const itemVoucher = appliedVoucher && appliedVoucher.discountType !== 'shipping' ? appliedVoucher : null;
  const itemDiscount = voucherDiscount(subtotal, itemVoucher);
  const shippingDiscount = Math.min(totalShipping, shippingVoucher ? shippingVoucher.discountValue : 0);
  const grandTotal = Math.max(0, subtotal - itemDiscount + totalShipping - shippingDiscount);

  const ensureAddress = () => {
    if (account) return Boolean(defaultAddress);
    const check = addressForm(guestAddr);
    if (!check.ok) {
      setGuestError(check.message);
      return false;
    }
    setGuestError('');
    return true;
  };

  const handleOrder = () => {
    if (!ensureAddress()) return;
    const method = PAYMENT_METHODS.find((m) => m.key === payment);
    const order = placeOrder({
      items: groups.flat(),
      stores: groups.map((items) => ({
        store: getStore(items[0].storeId),
        shipping: SHIPPING_OPTIONS[shippingFor(items[0].storeId)],
      })),
      buyer: { name: address.name, phone: address.phone, address: address.detail },
      paymentMethod: payment,
      paymentName: method.name,
      note,
      voucherCode: appliedVoucher?.code || null,
      itemDiscount,
      shippingDiscount,
      shippingCost: totalShipping - shippingDiscount,
      itemsTotal: subtotal,
      totalAmount: grandTotal,
    });

    removeSelectedCartItems();
    setAppliedVoucher(null);

    if (payment === 'belanjapay' || payment === 'cod') {
      showToast('Pesanan Berhasil Dibuat!', 'Pesanan langsung diproses penjual', 'success');
      navigate(`/pesanan/${order.id}`);
    } else {
      navigate(`/pembayaran/${order.id}`);
    }
  };

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div className="section-head-row">
        <h1 className="section-title">Konfirmasi Pesanan</h1>
        <span className="secure-badge"><ShieldCheck size={14} /> Pembayaran Aman</span>
      </div>

      <div className="checkout-layout">
        <div className="checkout-main">
          {/* Address */}
          <div className="checkout-card">
            <div className="checkout-card-head"><MapPin size={18} color="var(--primary)" /> Alamat Pengiriman</div>
            {account ? (
              defaultAddress ? (
                <div className="checkout-address">
                  <div className="address-item-top">
                    <strong>{defaultAddress.name}</strong>
                    <span className="address-label">{defaultAddress.label}</span>
                    <span className="address-default-badge">Utama</span>
                  </div>
                  <div className="address-item-detail">{defaultAddress.detail}</div>
                  <div className="address-item-detail">{defaultAddress.phone}</div>
                  <Link to="/akun" className="link-btn" style={{ marginTop: '0.5rem', display: 'inline-block' }}>Ganti alamat</Link>
                </div>
              ) : (
                <div className="checkout-address">
                  <p style={{ color: 'var(--text-muted)' }}>Belum ada alamat tersimpan.</p>
                  <Link to="/akun" className="btn-outline-primary" style={{ marginTop: '0.5rem' }}><Plus size={15} /> Tambah Alamat</Link>
                </div>
              )
            ) : (
              <div className="address-form-grid">
                <input className="field-input" placeholder="Nama penerima" value={guestAddr.name} onChange={(e) => setGuestAddr({ ...guestAddr, name: e.target.value })} />
                <input className="field-input" placeholder="Nomor HP" value={guestAddr.phone} onChange={(e) => setGuestAddr({ ...guestAddr, phone: e.target.value })} />
                <input className="field-input" style={{ gridColumn: '1 / -1' }} placeholder="Alamat lengkap" value={guestAddr.detail} onChange={(e) => setGuestAddr({ ...guestAddr, detail: e.target.value })} />
                {guestError && <div className="field-error" style={{ gridColumn: '1 / -1' }}>{guestError}</div>}
              </div>
            )}
          </div>

          {/* Per-store items + shipping */}
          {groups.map((items) => {
            const storeId = items[0].storeId || 'unknown';
            const store = getStore(storeId);
            return (
              <div key={storeId} className="checkout-card">
                <div className="checkout-card-head">
                  <Store size={16} color="var(--primary)" /> {store.name}
                  {store.isOfficial && <span className="cart-store-badge"><ShieldCheck size={11} /> Official</span>}
                </div>

                {items.map((item) => (
                  <div key={item.cartItemId} className="checkout-item">
                    <img src={item.product.images[0]} alt={item.product.name} className="cart-item-img" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="cart-item-name">{item.product.name}</div>
                      <div className="cart-item-variant">{item.selectedVariant?.color}, {item.selectedVariant?.option}</div>
                    </div>
                    <div className="checkout-item-qty">{item.quantity}x</div>
                    <div className="cart-item-price">{formatRupiah(item.product.price * item.quantity)}</div>
                  </div>
                ))}

                <div className="checkout-shipping">
                  <div className="filter-group-title" style={{ marginBottom: '0.5rem' }}><Truck size={13} /> Opsi Pengiriman</div>
                  <div className="shipping-options">
                    {Object.values(SHIPPING_OPTIONS).map((opt) => (
                      <button
                        key={opt.key}
                        className={`shipping-option ${shippingFor(storeId) === opt.key ? 'active' : ''}`}
                        onClick={() => setShipping((prev) => ({ ...prev, [storeId]: opt.key }))}
                      >
                        <div className="shipping-option-top">
                          <span>{opt.name}</span>
                          {shippingFor(storeId) === opt.key && <Check size={15} color="var(--primary)" />}
                        </div>
                        <div className="shipping-option-eta">{opt.eta}</div>
                        <div className="shipping-option-price">{formatRupiah(opt.price)}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Note */}
          <div className="checkout-card">
            <div className="checkout-card-head">Catatan untuk Penjual</div>
            <textarea className="field-input" rows={2} placeholder="Contoh: tolong bubble wrap" value={note} onChange={(e) => setNote(e.target.value)} style={{ width: '100%', resize: 'none' }} />
          </div>

          {/* Payment */}
          <div className="checkout-card">
            <div className="checkout-card-head"><CreditCard size={18} color="var(--accent-green)" /> Metode Pembayaran</div>
            <div className="payment-options">
              {PAYMENT_METHODS.map((m) => (
                <button key={m.key} className={`payment-option ${payment === m.key ? 'active' : ''}`} onClick={() => setPayment(m.key)}>
                  <div className="payment-option-top">
                    <span>{m.name}</span>
                    {payment === m.key && <Check size={15} color="var(--primary)" />}
                  </div>
                  <div className="payment-option-note">{m.note}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <aside className="checkout-summary">
          <h2 className="cart-summary-title">Ringkasan Pembayaran</h2>
          <div className="cart-summary-row"><span>Subtotal produk</span><span>{formatRupiah(subtotal)}</span></div>
          <div className="cart-summary-row"><span>Total ongkir</span><span>{formatRupiah(totalShipping)}</span></div>
          {itemDiscount > 0 && <div className="cart-summary-row discount"><span>Diskon voucher ({appliedVoucher.code})</span><span>-{formatRupiah(itemDiscount)}</span></div>}
          {shippingDiscount > 0 && <div className="cart-summary-row discount"><span>Gratis ongkir ({shippingVoucher.code})</span><span>-{formatRupiah(shippingDiscount)}</span></div>}
          <div className="cart-summary-total"><span>Total Tagihan</span><span>{formatRupiah(grandTotal)}</span></div>

          <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handleOrder}>
            Buat Pesanan
          </button>
          <p className="checkout-sim-note">Simulasi belanja — tidak ada transaksi nyata.</p>
        </aside>
      </div>
    </div>
  );
};