import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAccount, STATUS, STATUS_LABEL } from '../context/AccountContext';
import { useUi } from '../context/UiContext';
import { getStore } from '../data/stores';
import { formatRupiah, formatDate } from '../utils/format';
import { OrderStatusTracker } from '../components/OrderStatusTracker';
import { Package, Store, MapPin, CreditCard, ShieldCheck } from 'lucide-react';

export const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrder, advanceOrderStatus, cancelOrder } = useAccount();
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

  const canCancel = order.status === STATUS.MENUNGGU_PEMBAYARAN || order.status === STATUS.DIKEMAS;
  const canAdvance = [STATUS.DIKEMAS, STATUS.DIKIRIM].includes(order.status);

  const groups = Object.values(
    order.items.reduce((acc, item) => {
      const sid = item.storeId || 'unknown';
      (acc[sid] = acc[sid] || []).push(item);
      return acc;
    }, {})
  );

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div className="section-head-row">
        <h1 className="section-title">Detail Pesanan</h1>
        <span className={`order-status status-${order.status}`}>{STATUS_LABEL[order.status]}</span>
      </div>

      <div className="order-detail-card">
        <div className="order-detail-head">
          <div><span className="muted">No. Pesanan</span><strong>{order.id}</strong></div>
          <div><span className="muted">Tanggal</span><strong>{formatDate(order.createdAt)}</strong></div>
        </div>

        <OrderStatusTracker status={order.status} />

        {order.status === STATUS.MENUNGGU_PEMBAYARAN && (
          <button className="btn-primary" style={{ width: '100%', margin: '1rem 0' }} onClick={() => navigate(`/pembayaran/${order.id}`)}>
            Bayar Sekarang
          </button>
        )}

        {groups.map((items) => {
          const store = getStore(items[0].storeId || 'unknown');
          return (
            <div key={store.id} className="order-store-block">
              <div className="checkout-card-head"><Store size={15} /> {store.name} {store.isOfficial && <ShieldCheck size={12} />}</div>
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
            </div>
          );
        })}
      </div>

      <div className="order-detail-grid">
        <div className="order-detail-card">
          <div className="checkout-card-head"><MapPin size={16} color="var(--primary)" /> Alamat Pengiriman</div>
          <div className="address-item-top"><strong>{order.buyer.name}</strong></div>
          <div className="address-item-detail">{order.buyer.address}</div>
          <div className="address-item-detail">{order.buyer.phone}</div>
        </div>

        <div className="order-detail-card">
          <div className="checkout-card-head"><CreditCard size={16} color="var(--accent-green)" /> Pembayaran</div>
          <div className="cart-summary-row"><span>Metode</span><span>{order.paymentName}</span></div>
          <div className="cart-summary-row"><span>Subtotal produk</span><span>{formatRupiah(order.itemsTotal)}</span></div>
          <div className="cart-summary-row"><span>Ongkir</span><span>{formatRupiah(order.shippingCost)}</span></div>
          {order.itemDiscount > 0 && <div className="cart-summary-row discount"><span>Diskon</span><span>-{formatRupiah(order.itemDiscount)}</span></div>}
          {order.shippingDiscount > 0 && <div className="cart-summary-row discount"><span>Gratis ongkir</span><span>-{formatRupiah(order.shippingDiscount)}</span></div>}
          <div className="cart-summary-total"><span>Total</span><span>{formatRupiah(order.totalAmount)}</span></div>
        </div>
      </div>

      {order.note && <div className="order-detail-card"><div className="checkout-card-head"><Package size={16} /> Catatan</div><p style={{ fontSize: '0.9rem' }}>{order.note}</p></div>}

      <div className="order-actions">
        {canAdvance && (
          <button className="btn-primary" onClick={() => { advanceOrderStatus(order.id); showToast('Status Diperbarui', 'Status pesanan maju satu langkah (simulasi)', 'success'); }}>
            Majukan Status (Simulasi)
          </button>
        )}
        {canCancel && (
          <button className="btn-secondary" onClick={() => { cancelOrder(order.id); showToast('Pesanan Dibatalkan', 'Pesanan telah dibatalkan', 'info'); }}>
            Batalkan Pesanan
          </button>
        )}
        <button className="btn-secondary" onClick={() => navigate('/pesanan')}>Kembali</button>
      </div>
    </div>
  );
};