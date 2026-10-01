import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../context/AccountContext';
import { useCart } from '../context/CartContext';
import { useUi } from '../context/UiContext';
import { addressForm } from '../utils/validate';
import { formatRupiah } from '../utils/format';
import { User, MapPin, Plus, Trash2, LogOut, ShoppingBag, Check, Phone, Store } from 'lucide-react';

const emptyAddress = { label: 'Rumah', name: '', phone: '', detail: '', isDefault: false };

export const Account = () => {
  const navigate = useNavigate();
  const { account, login, logout, addresses, saveAddress, removeAddress, setDefaultAddress, orders } = useAccount();
  const { totalCartCount, wishlist, selectedItems, subtotal } = useCart();
  const { showToast } = useUi();

  const [form, setForm] = useState({ name: '', phone: '' });
  const [addrForm, setAddrForm] = useState(emptyAddress);
  const [editing, setEditing] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      showToast('Data Belum Lengkap', 'Isi nama dan nomor HP', 'warning');
      return;
    }
    login(form);
    showToast('Berhasil Masuk', `Selamat datang, ${form.name.trim()}!`, 'success');
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    const result = addressForm(addrForm);
    if (!result.ok) {
      showToast('Alamat Tidak Valid', result.message, 'error');
      return;
    }
    saveAddress(addrForm);
    setAddrForm(emptyAddress);
    setEditing(false);
    showToast('Alamat Disimpan', 'Alamat pengiriman berhasil disimpan', 'success');
  };

  if (!account) {
    return (
      <div className="auth-wrap">
        <div className="auth-card">
          <h1 className="auth-title">Masuk / Daftar</h1>
          <p className="auth-sub">Masuk untuk menyimpan alamat, wishlist, dan riwayat pesanan. (Simulasi — tanpa password)</p>
          <form onSubmit={handleLogin} className="auth-form">
            <label className="field-label">Nama Lengkap</label>
            <input className="field-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama kamu" />
            <label className="field-label">Nomor HP / WhatsApp</label>
            <input className="field-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="08xxxxxxxxxx" />
            <button className="btn-primary" type="submit" style={{ width: '100%', marginTop: '0.75rem' }}>
              <User size={16} /> Masuk Sekarang
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div className="account-head">
        <div className="account-avatar"><User size={26} /></div>
        <div>
          <div className="account-name">{account.name}</div>
          <div className="account-phone"><Phone size={13} /> {account.phone}</div>
        </div>
        <button className="btn-outline-primary" style={{ marginLeft: 'auto' }} onClick={() => { logout(); showToast('Berhasil Keluar', 'Kamu kembali sebagai tamu', 'info'); }}>
          <LogOut size={15} /> Keluar
        </button>
      </div>

      <div className="account-stats">
        <button className="account-stat" onClick={() => navigate('/pesanan')}>
          <ShoppingBag size={18} /><strong>{orders.length}</strong><span>Pesanan</span>
        </button>
        <button className="account-stat" onClick={() => navigate('/wishlist')}>
          <Check size={18} /><strong>{wishlist.length}</strong><span>Wishlist</span>
        </button>
        <button className="account-stat" onClick={() => navigate('/keranjang')}>
          <Store size={18} /><strong>{totalCartCount}</strong><span>Keranjang</span>
        </button>
      </div>

      <div className="account-section">
        <div className="section-head-row">
          <h2 className="section-title">Alamat Pengiriman</h2>
          <button className="btn-outline-primary" onClick={() => { setEditing(true); setAddrForm(emptyAddress); }}>
            <Plus size={15} /> Tambah Alamat
          </button>
        </div>

        {(editing || addresses.length === 0) && (
          <form className="address-form" onSubmit={handleSaveAddress}>
            <div className="address-form-grid">
              <div>
                <label className="field-label">Label</label>
                <input className="field-input" value={addrForm.label} onChange={(e) => setAddrForm({ ...addrForm, label: e.target.value })} placeholder="Rumah / Kantor" />
              </div>
              <div>
                <label className="field-label">Nama Penerima</label>
                <input className="field-input" value={addrForm.name} onChange={(e) => setAddrForm({ ...addrForm, name: e.target.value })} placeholder="Nama penerima" />
              </div>
              <div>
                <label className="field-label">Nomor HP</label>
                <input className="field-input" value={addrForm.phone} onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })} placeholder="08xxxxxxxxxx" />
              </div>
              <div>
                <label className="field-label">Alamat Lengkap</label>
                <input className="field-input" value={addrForm.detail} onChange={(e) => setAddrForm({ ...addrForm, detail: e.target.value })} placeholder="Jalan, kelurahan, kota, kode pos" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
              <button className="btn-primary" type="submit"><Check size={15} /> Simpan</button>
              {addresses.length > 0 && <button type="button" className="btn-secondary" onClick={() => setEditing(false)}>Batal</button>}
            </div>
          </form>
        )}

        <div className="address-list">
          {addresses.map((a) => (
            <div key={a.id} className={`address-item ${a.isDefault ? 'default' : ''}`}>
              <div className="address-item-main">
                <div className="address-item-top">
                  <strong>{a.name}</strong> <span className="address-label">{a.label}</span>
                  {a.isDefault && <span className="address-default-badge">Utama</span>}
                </div>
                <div className="address-item-detail"><MapPin size={12} /> {a.detail}</div>
                <div className="address-item-detail">{a.phone}</div>
              </div>
              <div className="address-item-actions">
                {!a.isDefault && <button className="link-btn" onClick={() => setDefaultAddress(a.id)}>Jadikan Utama</button>}
                <button className="link-btn" onClick={() => { setAddrForm(a); setEditing(true); }}>Ubah</button>
                <button className="icon-danger-btn" aria-label="Hapus alamat" onClick={() => removeAddress(a.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="account-cta-bar">
          <span>{selectedItems.length} produk siap checkout · {formatRupiah(subtotal)}</span>
          <button className="btn-primary" onClick={() => navigate('/checkout')}>Lanjut ke Checkout</button>
        </div>
      )}
    </div>
  );
};