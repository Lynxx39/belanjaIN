import React, { useState } from 'react';
import { useUi } from '../context/UiContext';
import { X, Send, Bot } from 'lucide-react';

export const ChatDrawer = () => {
  const { isChatOpen, setIsChatOpen } = useUi();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Halo Kak! Selamat datang di Customer Care belanjaIN. Ada yang bisa kami bantu seputar pesanan atau promo?',
    },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  if (!isChatOpen) return null;

  const quickReplies = [
    'Ada voucher diskon hari ini?',
    'Apakah semua barang bergaransi?',
    'Berapa lama estimasi pengiriman?',
  ];

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: query }]);
    setInputMsg('');

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
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: replyText }]);
    }, 700);
  };

  return (
    <>
      <div className="drawer-overlay" onClick={() => setIsChatOpen(false)} />
      <div className="drawer-panel" style={{ maxWidth: '420px' }}>
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="chat-avatar"><Bot size={20} /></div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>belanjaIN Assistant 24/7</div>
              <div className="chat-online"><span className="chat-online-dot" /> Online | Siap Membantu</div>
            </div>
          </div>
          <button className="drawer-close-btn" onClick={() => setIsChatOpen(false)} aria-label="Tutup chat">
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body chat-body">
          {messages.map((m) => (
            <div key={m.id} style={{ display: 'flex', justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <div className={`chat-bubble ${m.sender}`}>{m.text}</div>
            </div>
          ))}
        </div>

        <div className="chat-quick-row">
          {quickReplies.map((q) => (
            <button key={q} className="chat-quick-btn" onClick={() => handleSendMessage(q)}>{q}</button>
          ))}
        </div>

        <div className="chat-input-row">
          <input
            type="text"
            placeholder="Ketik pesan..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            className="chat-input"
            aria-label="Ketik pesan"
          />
          <button className="btn-primary chat-send-btn" onClick={() => handleSendMessage()} aria-label="Kirim pesan">
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
};