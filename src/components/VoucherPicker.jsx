import React, { useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { useUi } from '../context/UiContext';
import { useCart } from '../context/CartContext';
import { voucherDiscount, isEligible } from '../utils/coupon';
import { formatRupiah } from '../utils/format';
import { Ticket, Check, Tag } from 'lucide-react';

export const VoucherPicker = ({ subtotal, storeId = null }) => {
  const { vouchers } = useCatalog();
  const { appliedVoucher, setAppliedVoucher, removeVoucher, showToast } = useUi();
  const { selectedItems } = useCart();
  const [tab, setTab] = useState('platform');
  const [code, setCode] = useState('');

  const activeStoreIds = Array.from(
    new Set([storeId, ...selectedItems.map((i) => i.storeId || i.product?.storeId)].filter(Boolean))
  );

  const byScope = (scope) =>
    vouchers.filter((v) => {
      if (scope === 'platform') return v.scope === 'platform';
      if (v.scope !== 'store') return false;
      return activeStoreIds.length === 0 || activeStoreIds.includes(v.storeId);
    });

  const current = appliedVoucher;
  const discount = voucherDiscount(subtotal, current, selectedItems);

  const apply = (voucher) => {
    if (!isEligible(subtotal, voucher, selectedItems)) {
      showToast('Belum Memenuhi Syarat', `Min. belanja ${formatRupiah(voucher.minSpend)} untuk voucher ini`, 'warning');
      return;
    }
    setAppliedVoucher(voucher);
    showToast('Voucher Dipasang!', `Hemat dengan promo ${voucher.code}`, 'success');
  };

  const applyByCode = () => {
    const found = vouchers.find((v) => v.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      showToast('Kode Tidak Valid', 'Kupon promo tidak ditemukan', 'error');
      return;
    }
    apply(found);
    setCode('');
  };

  return (
    <div className="voucher-box">
      <div className="voucher-box-head"><Ticket size={16} color="var(--primary)" /> Voucher Diskon & Gratis Ongkir</div>

      <div className="voucher-tabs">
        <button className={`voucher-tab ${tab === 'platform' ? 'active' : ''}`} onClick={() => setTab('platform')}>Platform belanjaIN</button>
        <button className={`voucher-tab ${tab === 'store' ? 'active' : ''}`} onClick={() => setTab('store')} disabled={activeStoreIds.length === 0}>Voucher Toko</button>
      </div>

      <div className="voucher-list">
        {byScope(tab).map((v) => {
          const eligible = isEligible(subtotal, v, selectedItems);
          const active = current?.code === v.code;
          return (
            <button
              key={v.code}
              className={`voucher-chip ${active ? 'active' : ''} ${eligible ? '' : 'disabled'}`}
              onClick={() => apply(v)}
              disabled={!eligible}
            >
              <Tag size={12} />
              <span className="voucher-code">{v.code}</span>
              <span className="voucher-title">{v.title}</span>
              {active && <Check size={14} />}
            </button>
          );
        })}
      </div>

      <div className="voucher-code-row">
        <input
          type="text"
          placeholder="Masukkan kode promo..."
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="filter-input"
          aria-label="Kode promo"
        />
        <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={applyByCode}>Pakai</button>
      </div>

      {current && (
        <div className="voucher-applied">
          <span>Voucher terpasang: <strong>{current.code}</strong>{discount > 0 ? ` (-${formatRupiah(discount)})` : ''}</span>
          <button onClick={removeVoucher} className="voucher-remove">Hapus</button>
        </div>
      )}
    </div>
  );
};
