import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Send, Bot } from 'lucide-react';

export const ChatDrawer = () => {
  const { isChatOpen, setIsChatOpen } = useShop();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Halo Kak! Selamat datang di Customer Care belanjaIN 🛍️ Ada yang bisa kami bantu seputar pesanan atau promo?',
      time: 'Baru saja'
    }
  ]);

  const [inputMsg, setInputMsg] = useState('');

  if (!isChatOpen) return null;

  const quickReplies = [
    'Ada voucher diskon hari ini?',
    'Apakah semua barang bergaransi?',
    'Berapa lama estimasi pengiriman?'
  ];

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: 'Baru saja'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMsg('');

    // Simulate smart bot response
    setTimeout(() => {
      let replyText = 'Terima kasih atas pertanyaannya! Tim kami siap melayani pesanan Anda dengan jaminan 100% original.';

      const lower = query.toLowerCase();
      if (lower.includes('voucher') || lower.includes('diskon')) {
        replyText = 'Gunakan kode voucher HEMAT50 untuk potongan 50% atau GRATISONGKIR di halaman keranjang belanja!';
      } else if (lower.includes('garansi')) {
        replyText = 'Semua produk di Official Store & Star+ memiliki garansi resmi 1 tahun dan jaminan uang kembali 100% jika rusak saat sampai.';
      } else if (lower.includes('pengiriman') || lower.includes('kirim')) {
        replyText = 'Pengiriman Reguler 1-2 hari kerja via SiCepat/J&T. Tersedia opsi Instant (2-3 jam) untuk area Jabodetabek.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: replyText,
          time: 'Baru saja'
        }
      ]);
    }, 700);
  };

  return (
    <>
      <div className="drawer-overlay" onClick={() => setIsChatOpen(false)} />
      <div className="drawer-panel" style={{ maxWidth: '420px' }}>
        {/* Header */}
        <div className="drawer-header" style={{ background: 'var(--bg-surface-elevated)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}
            >
              <Bot size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>belanjaIN Assistant 24/7</div>
              <div style={{ fontSize: '0.72rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                Online | Siap Membantu
              </div>
            </div>
          </div>

          <button className="drawer-close-btn" onClick={() => setIsChatOpen(false)} aria-label="Tutup chat">
            <X size={18} />
          </button>
        </div>

        {/* Message stream */}
        <div className="drawer-body" style={{ background: 'var(--bg-main)', gap: '0.75rem' }}>
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '82%',
                  padding: '0.75rem 1rem',
                  borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  background: m.sender === 'user' ? 'var(--primary-gradient)' : 'var(--bg-surface-elevated)',
                  color: m.sender === 'user' ? 'white' : 'var(--text-main)',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
                  fontSize: '0.85rem',
                  lineHeight: 1.4,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick suggestions */}
        <div style={{ padding: '0.5rem 1rem', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.4rem', overflowX: 'auto' }}>
          {quickReplies.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                borderRadius: 'var(--radius-full)',
                padding: '4px 10px',
                fontSize: '0.72rem',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div style={{ padding: '0.85rem 1rem', background: 'var(--bg-surface-elevated)', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Ketik pesan..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            style={{
              flex: 1,
              padding: '0.6rem 0.85rem',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
          <button
            className="btn-primary"
            style={{ borderRadius: 'var(--radius-full)', width: '38px', height: '38px', padding: 0 }}
            onClick={() => handleSendMessage()}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
};
