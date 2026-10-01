import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAccount } from '../context/AccountContext';
import { useUi } from '../context/UiContext';
import { formatRupiah, formatDate } from '../utils/format';
import { OrderStatusTracker } from '../components/OrderStatusTracker';
import { QrCode, Building2, Banknote, Wallet, Copy, CheckCircle2 } from 'lucide-react';

const methodIcon = {
  belanjapay: Wallet,
  qris: QrCode,
  bca_va: Building2,
  cod: Banknote,
};

export const Payment = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrder, markPaid } = useAccount();
  const { showToast } = useUi();
  const order = getOrder(orderId);

  if (!order) {
    return (
      <div className="empty-state-box" style={{ margin: '3rem 0' }}>
        <h3>Pesanan tidak ditemukan</h3>
        <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/pesanan')}>Ke Pesanan Saya</button>
      </div>
    );
  }

  const Icon = methodIcon[order.paymentMethod] || Wallet;
  const isPaid = order.status !== 'menunggu_pembayaran';

  const handlePaid = () => {
    markPaid(order.id);
    showToast('Pembayaran Diterima', 'Pesanan sedang dikemas penjual', 'success');
    navigate(`/pesanan/${order.id}`);
  };

  const vaNumber = order.paymentMethod === 'bca_va' ? '8808 ' + order.id.replace(/\D/g, '').slice(-10) : null;

  return (
    <div className="payment-wrap">
      <div className="payment-card">
        <div className="payment-head">
          <Icon size={22} color="var(--primary)" />
          <div>
            <div className="payment-title">{isPaid ? 'Pembayaran Selesai' : `Selesaikan Pembayaran via ${order.paymentName}`}</div>
            <div className="payment-order">No. Pesanan: <strong>{order.id}</strong></div>
          </div>
        </div>

        <div className="payment-amount-box">
          <span>Total Tagihan</span>
          <strong>{formatRupiah(order.totalAmount)}</strong>
        </div>

        {!isPaid && order.paymentMethod === 'bca_va' && (
          <div className="payment-instruction">
            <div className="payment-instruction-title">Virtual Account</div>
            <div className="va-number">
              <span>{vaNumber}</span>
              <button
                className="link-btn"
                onClick={() => {
                  navigator.clipboard?.writeText(vaNumber.replace(/\s/g, ''));
                  showToast('Disalin', 'Nomor VA disalin ke clipboard', 'success');
                }}
              >
                <Copy size={13} /> Salin
              </button>
            </div>
            <p className="payment-hint">Bayar melalui m-BCA, ATM, atau internet banking. Pesanan otomatis diproses setelah pembayaran terverifikasi.</p>
          </div>
        )}

        {!isPaid && order.paymentMethod === 'qris' && (
          <div className="payment-instruction">
            <div className="payment-instruction-title">Scan QRIS</div>
            <div className="qris-placeholder"><QrCode size={120} /></div>
            <p className="payment-hint">Scan dengan aplikasi GoPay, OVO, DANA, atau mobile banking apa pun.</p>
          </div>
        )}

        <div className="payment-created">Dibuat: {formatDate(order.createdAt)}</div>

        {!isPaid ? (
          <>
            <button className="btn-primary" style={{ width: '100%' }} onClick={handlePaid}>
              <CheckCircle2 size={18} /> Saya Sudah Bayar (Simulasi)
            </button>
            <button className="btn-secondary" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => navigate(`/pesanan/${order.id}`)}>
              Bayar Nanti
            </button>
          </>
        ) : (
          <>
            <OrderStatusTracker status={order.status} />
            <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => navigate(`/pesanan/${order.id}`)}>
              Lihat Pesanan
            </button>
          </>
        )}
      </div>
    </div>
  );
};