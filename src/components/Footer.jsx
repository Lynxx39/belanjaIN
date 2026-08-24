import React from 'react';
import { ShoppingBag, ShieldCheck, Truck, Clock, Headphones, Award } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="max-w-layout">
        {/* Value Proportions Banner */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            paddingBottom: '2.5rem',
            marginBottom: '2.5rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255, 75, 43, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem' }}>Gratis Ongkir XTRA</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Min. belanja Rp 0 se-Indonesia</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem' }}>100% Garansi Original</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Uang kembali 2x lipat jika palsu</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem' }}>Pengiriman Kilat</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Opsi Instant 2-3 jam tiba</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Headphones size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.9rem' }}>Layanan 24/7</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Customer service ramah & cepat</div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-grid">
          <div>
            <div className="footer-col-title">LAYANAN PELANGGAN</div>
            <ul className="footer-list">
              <li><a href="#help">Pusat Bantuan</a></li>
              <li><a href="#payment">Cara Pembayaran</a></li>
              <li><a href="#track">Lacak Pesanan Pembeli</a></li>
              <li><a href="#cod">COD (Bayar di Tempat)</a></li>
              <li><a href="#guarantee">Garansi Shopee</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">JELAJAHI belanjaIN</div>
            <ul className="footer-list">
              <li><a href="#about">Tentang belanjaIN</a></li>
              <li><a href="#career">Karir & Rekrutmen</a></li>
              <li><a href="#policy">Kebijakan Privasi</a></li>
              <li><a href="#blog">belanjaIN Blog & Tren</a></li>
              <li><a href="#mall">belanjaIN Mall Brand Resmi</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">PEMBAYARAN RESMI</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span style={{ background: 'var(--bg-surface-elevated)', padding: '4px 8px', borderRadius: '4px' }}>ShopeePay</span>
              <span style={{ background: 'var(--bg-surface-elevated)', padding: '4px 8px', borderRadius: '4px' }}>QRIS</span>
              <span style={{ background: 'var(--bg-surface-elevated)', padding: '4px 8px', borderRadius: '4px' }}>BCA VA</span>
              <span style={{ background: 'var(--bg-surface-elevated)', padding: '4px 8px', borderRadius: '4px' }}>Mandiri</span>
              <span style={{ background: 'var(--bg-surface-elevated)', padding: '4px 8px', borderRadius: '4px' }}>BNI / BRI</span>
              <span style={{ background: 'var(--bg-surface-elevated)', padding: '4px 8px', borderRadius: '4px' }}>COD</span>
            </div>
          </div>

          <div>
            <div className="footer-col-title">LOGISTIK & PENGIRIMAN</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span style={{ background: 'var(--bg-surface-elevated)', padding: '4px 8px', borderRadius: '4px' }}>SPX Express</span>
              <span style={{ background: 'var(--bg-surface-elevated)', padding: '4px 8px', borderRadius: '4px' }}>J&T Express</span>
              <span style={{ background: 'var(--bg-surface-elevated)', padding: '4px 8px', borderRadius: '4px' }}>SiCepat</span>
              <span style={{ background: 'var(--bg-surface-elevated)', padding: '4px 8px', borderRadius: '4px' }}>Anteraja</span>
              <span style={{ background: 'var(--bg-surface-elevated)', padding: '4px 8px', borderRadius: '4px' }}>GoSend / Grab</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © 2026 <strong>belanjaIN</strong>. Hak Cipta Dilindungi. Platform Belanja Modern & Terpercaya.
          </div>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-subtle)' }}>
            <span>Indonesia</span>
            <span>Singapura</span>
            <span>Malaysia</span>
            <span>Thailand</span>
            <span>Vietnam</span>
            <span>Filipina</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
