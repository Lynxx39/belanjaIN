import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  MapPin,
  Truck,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  Wallet,
  Building2,
  Banknote,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    appliedVoucher,
    clearSelectedCart,
    setLastOrderSuccess,
    showToast
  } = useShop();

  const selectedItems = cart.filter((item) => item.selected);

  // Form State
  const [name, setName] = useState('Budi Santoso');
  const [phone, setPhone] = useState('0812-3456-7890');
  const [address, setAddress] = useState('Jl. Jend. Sudirman No. 45, Kebayoran Baru, Jakarta Selatan, 12190');
  const [shippingMethod, setShippingMethod] = useState('reguler');
  const [paymentMethod, setPaymentMethod] = useState('shopeepay');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen || selectedItems.length === 0) return null;

  const formatRupiah = (val) => 'Rp ' + Number(val).toLocaleString('id-ID');

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Courier Rates
  const shippingRates = {
    instant: { name: 'Instant (2-3 Jam)', price: 20000, eta: 'Hari Ini' },
    reguler: { name: 'Reguler (SiCepat / J&T)', price: 12000, eta: '1 - 2 Hari' },
    hemat: { name: 'Hemat Ekonomi', price: 8000, eta: '3 - 4 Hari' }
  };

  const selectedShipping = shippingRates[shippingMethod];

  // Discount calculation
  let discountAmount = 0;
  let shippingDiscount = 0;
  if (appliedVoucher && subtotal >= appliedVoucher.minSpend) {
    if (appliedVoucher.discountType === 'percent') {
      discountAmount = Math.min(
        (subtotal * appliedVoucher.discountValue) / 100,
        appliedVoucher.maxDiscount
      );
    } else if (appliedVoucher.discountType === 'fixed') {
      discountAmount = appliedVoucher.discountValue;
    } else if (appliedVoucher.discountType === 'shipping') {
      shippingDiscount = Math.min(selectedShipping.price, appliedVoucher.discountValue);
    }
  }

  const finalShippingCost = Math.max(0, selectedShipping.price - shippingDiscount);
  const totalAmount = Math.max(0, subtotal - discountAmount + finalShippingCost);

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error(e);
      }

      const orderData = {
        orderId: 'SHP-' + Math.floor(10000000 + Math.random() * 90000000),
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        items: [...selectedItems],
        buyer: { name, phone, address },
        shipping: { ...selectedShipping, finalCost: finalShippingCost },
        paymentMethod,
        subtotal,
        discountAmount: discountAmount + shippingDiscount,
        totalAmount
      };

      clearSelectedCart();
      setIsProcessing(false);
      setIsCheckoutOpen(false);
      setLastOrderSuccess(orderData);
      showToast('Pesanan Berhasil Dibuat! 🎉', 'Terima kasih atas pesanan Anda', 'success');
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
      <div
        className="modal-box"
        style={{ maxWidth: '780px', maxHeight: '92vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title">
            <ShieldCheck size={22} color="var(--primary)" />
            <span>Pengiriman & Pembayaran Aman</span>
          </div>
          <button className="drawer-close-btn" onClick={() => setIsCheckoutOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* 1. Alamat Pengiriman */}
          <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
              <MapPin size={18} />
              <span>Alamat Pengiriman</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Nama Penerima</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Nomor WhatsApp / HP</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Alamat Lengkap</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  fontFamily: 'inherit',
                  resize: 'none'
                }}
              />
            </div>
          </div>

          {/* 2. Opsi Pengiriman */}
          <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
              <Truck size={18} color="#3B82F6" />
              <span>Pilih Opsi Pengiriman</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {Object.entries(shippingRates).map(([key, item]) => (
                <div
                  key={key}
                  onClick={() => setShippingMethod(key)}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: shippingMethod === key ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-surface)',
                    border: `1.5px solid ${shippingMethod === key ? '#3B82F6' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{item.name}</span>
                    {shippingMethod === key && <CheckCircle2 size={16} color="#3B82F6" />}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimasi: {item.eta}</div>
                  <div style={{ fontWeight: 800, color: 'var(--primary)', marginTop: '4px', fontSize: '0.9rem' }}>
                    {formatRupiah(item.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Metode Pembayaran */}
          <div style={{ background: 'var(--bg-main)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem' }}>
              <CreditCard size={18} color="#10B981" />
              <span>Metode Pembayaran</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {/* ShopeePay */}
              <div
                onClick={() => setPaymentMethod('shopeepay')}
                style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: paymentMethod === 'shopeepay' ? 'rgba(255, 75, 43, 0.1)' : 'var(--bg-surface)',
                  border: `1.5px solid ${paymentMethod === 'shopeepay' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                  <Wallet size={16} color="var(--primary)" />
                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>ShopeePay</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Saldo: Rp 1.500.000</div>
              </div>

              {/* QRIS */}
              <div
                onClick={() => setPaymentMethod('qris')}
                style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: paymentMethod === 'qris' ? 'rgba(255, 75, 43, 0.1)' : 'var(--bg-surface)',
                  border: `1.5px solid ${paymentMethod === 'qris' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                  <QrCode size={16} color="#8B5CF6" />
                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>QRIS Instan</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GoPay, OVO, DANA, BCA</div>
              </div>

              {/* Bank Transfer */}
              <div
                onClick={() => setPaymentMethod('bca_va')}
                style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: paymentMethod === 'bca_va' ? 'rgba(255, 75, 43, 0.1)' : 'var(--bg-surface)',
                  border: `1.5px solid ${paymentMethod === 'bca_va' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                  <Building2 size={16} color="#3B82F6" />
                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>BCA / Mandiri VA</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verifikasi Otomatis</div>
              </div>

              {/* COD */}
              <div
                onClick={() => setPaymentMethod('cod')}
                style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: paymentMethod === 'cod' ? 'rgba(255, 75, 43, 0.1)' : 'var(--bg-surface)',
                  border: `1.5px solid ${paymentMethod === 'cod' ? 'var(--primary)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                  <Banknote size={16} color="#F59E0B" />
                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>COD (Bayar di Tempat)</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bayar saat barang tiba</div>
              </div>
            </div>
          </div>

          {/* 4. Rincian Pesanan */}
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.75rem' }}>Ringkasan Pembayaran</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Total Harga ({selectedItems.length} barang):</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Biaya Ongkos Kirim ({selectedShipping.name}):</span>
                <span>{formatRupiah(selectedShipping.price)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}>
                  <span>Diskon Voucher Belanja:</span>
                  <span>-{formatRupiah(discountAmount)}</span>
                </div>
              )}
              {shippingDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}>
                  <span>Diskon Ongkir XTRA:</span>
                  <span>-{formatRupiah(shippingDiscount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '0.6rem', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem' }}>Total Tagihan:</span>
                <span style={{ fontWeight: 800, fontSize: '1.45rem', color: 'var(--primary)' }}>
                  {formatRupiah(totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            className="btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
            onClick={handlePlaceOrder}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span>Memproses Pesanan Anda...</span>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Bayar Sekarang ({formatRupiah(totalAmount)})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
