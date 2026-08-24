import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Ticket,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { vouchers } from '../data/vouchers';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    toggleCartItemSelection,
    toggleSelectAllCart,
    appliedVoucher,
    applyVoucher,
    removeVoucher,
    setIsCheckoutOpen
  } = useShop();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const allSelected = cart.length > 0 && cart.every((item) => item.selected);
  const selectedItems = cart.filter((item) => item.selected);

  const formatRupiah = (val) => 'Rp ' + Number(val).toLocaleString('id-ID');

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Discount calculation
  let discountAmount = 0;
  if (appliedVoucher && subtotal >= appliedVoucher.minSpend) {
    if (appliedVoucher.discountType === 'percent') {
      discountAmount = Math.min(
        (subtotal * appliedVoucher.discountValue) / 100,
        appliedVoucher.maxDiscount
      );
    } else if (appliedVoucher.discountType === 'fixed') {
      discountAmount = appliedVoucher.discountValue;
    } else if (appliedVoucher.discountType === 'shipping') {
      discountAmount = appliedVoucher.discountValue;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyVoucher = (codeToApply) => {
    const success = applyVoucher(codeToApply || inputCode);
    if (success) setInputCode('');
  };

  const handleProceedCheckout = () => {
    if (selectedItems.length === 0) return;
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div className="drawer-overlay" onClick={() => setIsCartOpen(false)} />
      <div className="drawer-panel">
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title">
            <ShoppingBag size={20} color="var(--primary)" />
            <span>Keranjang Belanja ({cart.length})</span>
          </div>
          <button className="drawer-close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="drawer-body">
          {cart.length > 0 ? (
            <>
              {/* Select All Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0.85rem',
                  background: 'var(--bg-main)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.825rem'
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => toggleSelectAllCart(e.target.checked)}
                    className="cart-checkbox"
                  />
                  <span>Pilih Semua ({cart.length} produk)</span>
                </label>

                <span style={{ color: 'var(--text-muted)' }}>
                  {selectedItems.length} dipilih
                </span>
              </div>

              {/* Items List */}
              {cart.map((item) => (
                <div key={item.cartItemId} className="cart-item">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleCartItemSelection(item.cartItemId)}
                    className="cart-checkbox"
                  />

                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="cart-item-img"
                  />

                  <div className="cart-item-info">
                    <div className="cart-item-name" title={item.product.name}>
                      {item.product.name}
                    </div>

                    <div className="cart-item-variant">
                      Variasi: {item.selectedVariant?.color}, {item.selectedVariant?.option}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="cart-item-price">
                        {formatRupiah(item.product.price)}
                      </div>

                      {/* Qty & Delete */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="qty-control" style={{ transform: 'scale(0.85)', transformOrigin: 'right center' }}>
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="qty-val">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-subtle)',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                          onClick={() => removeFromCart(item.cartItemId)}
                          title="Hapus item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Voucher Section */}
              <div
                style={{
                  marginTop: '0.5rem',
                  padding: '1rem',
                  background: 'var(--bg-main)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  <Ticket size={16} color="var(--primary)" />
                  <span>Voucher Diskon & Gratis Ongkir</span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <input
                    type="text"
                    placeholder="Masukkan kode promo..."
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.75rem',
                      background: 'var(--bg-surface-elevated)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem',
                      outline: 'none',
                      textTransform: 'uppercase'
                    }}
                  />
                  <button
                    className="btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.825rem' }}
                    onClick={() => handleApplyVoucher()}
                  >
                    Pakai
                  </button>
                </div>

                {/* Quick Voucher Pills */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {vouchers.map((v) => (
                    <button
                      key={v.code}
                      onClick={() => handleApplyVoucher(v.code)}
                      style={{
                        background: appliedVoucher?.code === v.code ? 'rgba(255, 75, 43, 0.2)' : 'var(--bg-surface-elevated)',
                        border: `1px dashed ${appliedVoucher?.code === v.code ? 'var(--primary)' : 'var(--border-subtle)'}`,
                        color: appliedVoucher?.code === v.code ? 'var(--primary)' : 'var(--text-muted)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      <Tag size={10} style={{ display: 'inline', marginRight: '3px' }} />
                      {v.code}
                    </button>
                  ))}
                </div>

                {appliedVoucher && (
                  <div
                    style={{
                      marginTop: '0.75rem',
                      padding: '0.5rem 0.75rem',
                      background: 'rgba(16, 185, 129, 0.15)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.775rem',
                      color: '#10B981',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    <span>Voucher Terpasang: <strong>{appliedVoucher.code}</strong></span>
                    <button
                      onClick={removeVoucher}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#EF4444',
                        cursor: 'pointer',
                        fontWeight: 700
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <ShoppingBag size={56} color="var(--text-subtle)" style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                Keranjang Anda Kosong
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Yuk, temukan berbagai produk pilihan dengan diskon menarik!
              </p>
              <button
                className="btn-primary"
                onClick={() => setIsCartOpen(false)}
              >
                Mulai Belanja Sekarang
              </button>
            </div>
          )}
        </div>

        {/* Footer with checkout calculation */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Subtotal ({selectedItems.length} produk):</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981', fontWeight: 600 }}>
                  <span>Potongan Voucher Promo:</span>
                  <span>-{formatRupiah(discountAmount)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>Total Pembayaran:</span>
                <span style={{ fontWeight: 800, fontSize: '1.35rem', color: 'var(--primary)' }}>
                  {formatRupiah(grandTotal)}
                </span>
              </div>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
              onClick={handleProceedCheckout}
              disabled={selectedItems.length === 0}
            >
              <span>Checkout ({selectedItems.length})</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
