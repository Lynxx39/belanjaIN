import React from 'react';
import { useCart } from '../context/CartContext';
import { getStore } from '../data/stores';
import { formatRupiah } from '../utils/format';
import { ShieldCheck, Store, Minus, Plus, Trash2 } from 'lucide-react';

export const StoreCartGroup = ({ storeId, items }) => {
  const { updateQuantity, removeFromCart, toggleCartItemSelection, toggleSelectStore } = useCart();
  const store = getStore(storeId);
  const allSelected = items.length > 0 && items.every((i) => i.selected);

  return (
    <div className="cart-store-group">
      <div className="cart-store-head">
        <label className="cart-store-select">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) => toggleSelectStore(storeId, e.target.checked)}
            className="cart-checkbox"
          />
          <Store size={15} />
          <span className="cart-store-name">{store.name}</span>
          {store.isOfficial && (
            <span className="cart-store-badge"><ShieldCheck size={11} /> Official</span>
          )}
        </label>
        <span className="cart-store-loc">{store.location}</span>
      </div>

      {items.map((item) => (
        <div key={item.cartItemId} className="cart-item">
          <input
            type="checkbox"
            checked={item.selected}
            onChange={() => toggleCartItemSelection(item.cartItemId)}
            className="cart-checkbox"
          />
          <img src={item.product.images[0]} alt={item.product.name} className="cart-item-img" />
          <div className="cart-item-info">
            <div className="cart-item-name" title={item.product.name}>{item.product.name}</div>
            <div className="cart-item-variant">Variasi: {item.selectedVariant?.color}, {item.selectedVariant?.option}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="cart-item-price">{formatRupiah(item.product.price)}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="qty-control">
                  <button className="qty-btn" aria-label="Kurangi jumlah" onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}><Minus size={12} /></button>
                  <span className="qty-val">{item.quantity}</span>
                  <button className="qty-btn" aria-label="Tambah jumlah" onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}><Plus size={12} /></button>
                </div>
                <button className="cart-delete-btn" aria-label="Hapus item" onClick={() => removeFromCart(item.cartItemId)}><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};