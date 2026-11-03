import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useUi } from '../context/UiContext';
import { Sparkles, MessageSquare, X, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

const TIPS = [
  { text: 'Halo! Selamat datang di belanjaIN 👋', tag: 'Salam' },
  { text: 'Flash Sale diskon s/d 90% sedang berlangsung! 🔥', tag: 'Flash Sale' },
  { text: 'Gunakan voucher HEMAT50 di keranjang belanja! 🎁', tag: 'Promo' },
  { text: 'Klaim voucher rahasia: SIBELANJA10 untuk diskon 10%! ✨', tag: 'Voucher', code: 'SIBELANJA10' },
  { text: 'Semua pesanan dilindungi Garansi Original 100% 🛡️', tag: 'Jaminan' },
  { text: 'Gratis Ongkir ke seluruh Indonesia tanpa batas! 🚚', tag: 'Ongkir' },
];

export const Mascot = ({ onOpenChat }) => {
  const { totalCartCount } = useCart();
  const { showToast } = useUi();
  const [tipIndex, setTipIndex] = useState(0);
  const [isBubbleOpen, setIsBubbleOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExcited, setIsExcited] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const prevCountRef = useRef(totalCartCount);

  // React to cart count additions
  useEffect(() => {
    if (totalCartCount > prevCountRef.current) {
      setIsExcited(true);
      setIsBubbleOpen(true);
      setTipIndex(-1); // Special cart cheer state
      const timer = setTimeout(() => {
        setIsExcited(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
    prevCountRef.current = totalCartCount;
  }, [totalCartCount]);

  // Rotate tips periodically when not excited
  useEffect(() => {
    if (isExcited || !isBubbleOpen || isMinimized) return;
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isExcited, isBubbleOpen, isMinimized]);

  const handleMascotClick = () => {
    setIsExcited(true);
    setIsBubbleOpen(true);
    setTipIndex((prev) => (prev < 0 ? 0 : (prev + 1) % TIPS.length));
    setTimeout(() => setIsExcited(false), 2000);
  };

  const handleCopySecret = (code) => {
    if (!code) return;
    navigator.clipboard?.writeText(code).then(() => {
      setCopiedCode(true);
      showToast('Kode Tersalin!', `Gunakan kode ${code} saat checkout`, 'success');
      setTimeout(() => setCopiedCode(false), 2500);
    }).catch(() => {
      showToast('Kode Promo', `Kode: ${code}`, 'info');
    });
  };

  const activeTip = tipIndex === -1
    ? { text: 'Yaaay! Produk berhasil ditambah ke keranjang! 🎉', tag: 'Keranjang' }
    : TIPS[tipIndex % TIPS.length];

  if (isMinimized) {
    return (
      <div className="mascot-minimized-pill" onClick={() => setIsMinimized(false)} role="button" tabIndex={0} aria-label="Buka Si Belanja">
        <span className="mascot-mini-avatar">🛍️</span>
        <span className="mascot-mini-text">Si Belanja</span>
        <span className="mascot-mini-pulse" />
        <ChevronUp size={14} />
      </div>
    );
  }

  return (
    <div className={`mascot-container ${isExcited ? 'is-excited' : ''}`}>
      {/* Dynamic Speech Bubble */}
      {isBubbleOpen && (
        <div className="mascot-bubble" role="dialog" aria-label="Tips belanja dari Si Belanja">
          <div className="mascot-bubble-header">
            <span className="mascot-bubble-badge">
              <Sparkles size={11} /> {activeTip.tag}
            </span>
            <div className="mascot-bubble-controls">
              <button
                className="mascot-icon-btn"
                onClick={() => setIsMinimized(true)}
                title="Sembunyikan ke ikon mini"
                aria-label="Sembunyikan"
              >
                <ChevronDown size={13} />
              </button>
              <button
                className="mascot-icon-btn"
                onClick={() => setIsBubbleOpen(false)}
                title="Tutup pesan"
                aria-label="Tutup pesan"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          <p className="mascot-bubble-text">{activeTip.text}</p>

          <div className="mascot-bubble-actions">
            {activeTip.code ? (
              <button
                className="mascot-action-btn copy-code-btn"
                onClick={() => handleCopySecret(activeTip.code)}
              >
                {copiedCode ? <Check size={12} color="#10B981" /> : <Copy size={12} />}
                <span>{copiedCode ? 'Tersalin!' : `Salin ${activeTip.code}`}</span>
              </button>
            ) : null}

            {onOpenChat && (
              <button className="mascot-action-btn chat-shortcut-btn" onClick={onOpenChat}>
                <MessageSquare size={12} />
                <span>Tanya CS</span>
              </button>
            )}
          </div>
          <div className="mascot-bubble-tail" />
        </div>
      )}

      {/* SVG Animated Character: Si Belanja */}
      <div
        className="mascot-avatar-wrap"
        onClick={handleMascotClick}
        role="button"
        tabIndex={0}
        aria-label="Maskot Si Belanja - Klik untuk tips dan promo"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMascotClick();
          }
        }}
      >
        <svg
          viewBox="0 0 100 105"
          className="mascot-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="bagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B4A" />
              <stop offset="50%" stopColor="#EE4D2D" />
              <stop offset="100%" stopColor="#D83210" />
            </linearGradient>
            <linearGradient id="handleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="100%" stopColor="#FFB300" />
            </linearGradient>
            <linearGradient id="cheeksGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFA4A4" />
              <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
            <filter id="mascotGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#EE4D2D" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Shadow beneath mascot */}
          <ellipse cx="50" cy="98" rx="28" ry="5" className="mascot-svg-shadow" fill="rgba(0,0,0,0.22)" />

          {/* Dual Bag Handles */}
          <path
            d="M 33 34 C 33 12, 67 12, 67 34"
            fill="none"
            stroke="url(#handleGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            className="mascot-handle"
          />

          {/* Main Body (Shopping Bag Robot) */}
          <path
            d="M 22 34 Q 50 30 78 34 L 84 86 Q 50 92 16 86 Z"
            fill="url(#bagGrad)"
            filter="url(#mascotGlow)"
            className="mascot-body"
          />

          {/* Bag Inner Rim Highlight */}
          <ellipse cx="50" cy="34" rx="27" ry="4.5" fill="#FF7E5F" opacity="0.8" />

          {/* Front Pocket / Screen */}
          <rect
            x="27"
            y="43"
            width="46"
            height="35"
            rx="10"
            fill="rgba(255, 255, 255, 0.95)"
            className="mascot-face-screen"
          />

          {/* Cute Eyes */}
          <g className="mascot-eyes">
            {/* Left Eye */}
            <circle cx="39" cy="56" r="4.5" fill="#1E293B" />
            <circle cx="40.5" cy="54.5" r="1.6" fill="#FFFFFF" />
            {/* Right Eye */}
            <circle cx="61" cy="56" r="4.5" fill="#1E293B" />
            <circle cx="62.5" cy="54.5" r="1.6" fill="#FFFFFF" />
          </g>

          {/* Blushing Cheeks */}
          <ellipse cx="33" cy="63" rx="3.5" ry="2" fill="url(#cheeksGrad)" opacity="0.75" />
          <ellipse cx="67" cy="63" rx="3.5" ry="2" fill="url(#cheeksGrad)" opacity="0.75" />

          {/* Smiling Grin */}
          <path
            d={isExcited ? "M 43 64 Q 50 73 57 64 Z" : "M 44 65 Q 50 71 56 65"}
            fill={isExcited ? "#EE4D2D" : "none"}
            stroke={isExcited ? "#D83210" : "#1E293B"}
            strokeWidth={isExcited ? "1.5" : "2"}
            strokeLinecap="round"
            className="mascot-mouth"
          />

          {/* Cute Little Feet */}
          <ellipse cx="36" cy="88" rx="6" ry="4" fill="#FFB300" />
          <ellipse cx="64" cy="88" rx="6" ry="4" fill="#FFB300" />

          {/* Waving Hand / Star Badge */}
          <g className="mascot-waving-hand">
            <circle cx="83" cy="52" r="5" fill="#FFE082" stroke="#FFB300" strokeWidth="1.5" />
            <path d="M 83 49 L 84 52 L 87 52 L 84.5 54 L 85.5 57 L 83 55 L 80.5 57 L 81.5 54 L 79 52 L 82 52 Z" fill="#EE4D2D" />
          </g>
        </svg>

        {/* Floating Aura Sparkle */}
        <div className="mascot-sparkle-dot" />
      </div>
    </div>
  );
};
