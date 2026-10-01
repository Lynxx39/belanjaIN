import React from 'react';

// --- 1. QUICK SERVICES 3D ILLUSTRATED ICONS ---

export const Icon3DFlashSale = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="flameGrad" x1="6" y1="44" x2="38" y2="4" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF1E56" />
        <stop offset="50%" stopColor="#FF5E00" />
        <stop offset="100%" stopColor="#FFAA00" />
      </linearGradient>
      <linearGradient id="boltGrad" x1="16" y1="6" x2="32" y2="42" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="30%" stopColor="#FFF382" />
        <stop offset="100%" stopColor="#FFC107" />
      </linearGradient>
      <filter id="glow3d" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#FF3300" floodOpacity="0.4" />
      </filter>
    </defs>
    {/* Flame Body */}
    <path
      d="M24 4C24 4 28 12 28 18C28 19.5 27.6 20.9 26.9 22.1C30.5 19.8 32 15 32 15C37 21 38 31 34.5 37C31.5 42.2 25.8 44 20 44C13.4 44 8 38.6 8 32C8 22 17 14 24 4Z"
      fill="url(#flameGrad)"
      filter="url(#glow3d)"
    />
    {/* Inner Lightning Bolt */}
    <path
      d="M28 8L16 26H24L20 42L34 22H25L28 8Z"
      fill="url(#boltGrad)"
      stroke="#FF9100"
      strokeWidth="0.75"
    />
  </svg>
);

export const Icon3DOngkir = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="truckBody" x1="4" y1="12" x2="38" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00E676" />
        <stop offset="100%" stopColor="#00B0FF" />
      </linearGradient>
      <linearGradient id="truckCab" x1="28" y1="18" x2="44" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00B0FF" />
        <stop offset="100%" stopColor="#2979FF" />
      </linearGradient>
      <linearGradient id="wheelGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#37474F" />
        <stop offset="100%" stopColor="#212121" />
      </linearGradient>
    </defs>
    {/* Cargo Container */}
    <rect x="4" y="14" width="24" height="20" rx="3" fill="url(#truckBody)" />
    <path d="M4 22H28" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="3 2" />
    <rect x="7" y="17" width="8" height="3" rx="1.5" fill="rgba(255,255,255,0.6)" />
    {/* Free Text / XTRA */}
    <rect x="18" y="25" width="8" height="6" rx="2" fill="#FFEB3B" />
    <path d="M20 28H24" stroke="#D50000" strokeWidth="1.5" strokeLinecap="round" />
    {/* Truck Front Cab */}
    <path d="M28 20H37L43 27V34H28V20Z" fill="url(#truckCab)" />
    <path d="M30 22H36L40 27H30V22Z" fill="#E1F5FE" opacity="0.9" />
    {/* Wheels */}
    <circle cx="12" cy="35" r="5" fill="url(#wheelGrad)" />
    <circle cx="12" cy="35" r="2" fill="#ECEFF1" />
    <circle cx="36" cy="35" r="5" fill="url(#wheelGrad)" />
    <circle cx="36" cy="35" r="2" fill="#ECEFF1" />
    {/* Speed Lines */}
    <path d="M2 18H0" stroke="#00E676" strokeWidth="2" strokeLinecap="round" />
    <path d="M2 25H-2" stroke="#00E676" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Icon3DMall = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shieldGrad" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF1744" />
        <stop offset="100%" stopColor="#880E4F" />
      </linearGradient>
      <linearGradient id="crownGrad" x1="12" y1="14" x2="36" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF176" />
        <stop offset="50%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#FFA000" />
      </linearGradient>
    </defs>
    {/* Shield Base */}
    <path
      d="M24 4L40 10V22C40 32.5 33.2 41.5 24 44C14.8 41.5 8 32.5 8 22V10L24 4Z"
      fill="url(#shieldGrad)"
    />
    <path
      d="M24 6.5L38 12V22C38 31.2 32 39.2 24 41.5V6.5Z"
      fill="white"
      fillOpacity="0.15"
    />
    {/* Crown */}
    <path
      d="M16 32L14 20L20 25L24 16L28 25L34 20L32 32H16Z"
      fill="url(#crownGrad)"
      stroke="#FF8F00"
      strokeWidth="0.5"
    />
    {/* Jewels */}
    <circle cx="24" cy="28" r="2" fill="#D50000" />
    <circle cx="18" cy="28" r="1.5" fill="#00B0FF" />
    <circle cx="30" cy="28" r="1.5" fill="#00B0FF" />
  </svg>
);

export const Icon3DLive = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="camGrad" x1="4" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF3366" />
        <stop offset="100%" stopColor="#BA000D" />
      </linearGradient>
      <linearGradient id="lensGrad" x1="16" y1="16" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#42A5F5" />
        <stop offset="100%" stopColor="#0D47A1" />
      </linearGradient>
    </defs>
    {/* Camera Body */}
    <rect x="6" y="12" width="24" height="24" rx="6" fill="url(#camGrad)" />
    {/* Lens Projection Cone */}
    <path d="M30 19L42 12V36L30 29V19Z" fill="url(#camGrad)" />
    {/* Glass Lens */}
    <circle cx="18" cy="24" r="8" fill="url(#lensGrad)" />
    <circle cx="18" cy="24" r="4.5" fill="#1A237E" />
    <circle cx="16" cy="22" r="2" fill="#FFFFFF" opacity="0.8" />
    {/* Live Pulse Dot */}
    <circle cx="11" cy="17" r="2.5" fill="#76FF03" />
  </svg>
);

export const Icon3DVoucher = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="voucherGrad" x1="4" y1="12" x2="44" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFA726" />
        <stop offset="50%" stopColor="#FB8C00" />
        <stop offset="100%" stopColor="#E65100" />
      </linearGradient>
      <linearGradient id="goldRibbon" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFF59D" />
        <stop offset="100%" stopColor="#FBC02D" />
      </linearGradient>
    </defs>
    {/* Ticket Body with scalloped cutouts */}
    <path
      d="M6 12C6 12 42 12 42 12C42 12 42 20 42 20C39.8 20 38 21.8 38 24C38 26.2 39.8 28 42 28C42 28 42 36 42 36C42 36 6 36 6 36C6 36 6 28 6 28C8.2 28 10 26.2 10 24C10 21.8 8.2 20 6 20C6 20 6 12 6 12Z"
      fill="url(#voucherGrad)"
    />
    <path d="M18 12V36" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="3 2" />
    {/* Percent Badge */}
    <circle cx="30" cy="24" r="7" fill="url(#goldRibbon)" />
    <text x="30" y="27" textAnchor="middle" fill="#E65100" fontSize="8" fontWeight="900" fontFamily="sans-serif">%</text>
    {/* Left Star */}
    <circle cx="12" cy="24" r="3" fill="#FFE082" />
  </svg>
);

export const Icon3DKoin = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="coinGrad1" x1="8" y1="12" x2="32" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF176" />
        <stop offset="50%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#FF8F00" />
      </linearGradient>
      <linearGradient id="coinGrad2" x1="16" y1="4" x2="44" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFEE58" />
        <stop offset="60%" stopColor="#FFCA28" />
        <stop offset="100%" stopColor="#FF6F00" />
      </linearGradient>
    </defs>
    {/* Back Coin */}
    <circle cx="18" cy="28" r="14" fill="url(#coinGrad1)" stroke="#FFA000" strokeWidth="1" />
    <circle cx="18" cy="28" r="10.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" />
    {/* Front Coin */}
    <circle cx="30" cy="18" r="14" fill="url(#coinGrad2)" stroke="#FF8F00" strokeWidth="1" />
    <circle cx="30" cy="18" r="10.5" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" fill="none" />
    {/* 'B' for belanjaIN on front coin */}
    <text x="30" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="900" fontFamily="sans-serif">B</text>
    {/* Sparkle */}
    <path d="M42 6L43 10L47 11L43 12L42 16L41 12L37 11L41 10L42 6Z" fill="#FFFDE7" />
  </svg>
);

export const Icon3DPay = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="walletGrad" x1="4" y1="12" x2="44" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#7C4DFF" />
        <stop offset="100%" stopColor="#304FFE" />
      </linearGradient>
      <linearGradient id="cardGrad" x1="12" y1="4" x2="38" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00E5FF" />
        <stop offset="100%" stopColor="#00B0FF" />
      </linearGradient>
    </defs>
    {/* Credit Card popping out */}
    <rect x="12" y="6" width="26" height="18" rx="3" fill="url(#cardGrad)" transform="rotate(-6 12 6)" />
    <rect x="15" y="10" width="6" height="4" rx="1" fill="#FFD54F" transform="rotate(-6 15 10)" />
    {/* Wallet Main Body */}
    <rect x="6" y="14" width="36" height="26" rx="5" fill="url(#walletGrad)" />
    {/* Flap with gold coin clasp */}
    <path d="M28 22H42V32H28C25.8 32 24 30.2 24 28V26C24 23.8 25.8 22 28 22Z" fill="#651FFF" />
    <circle cx="36" cy="27" r="3" fill="#FFD700" stroke="#FFAB00" strokeWidth="0.75" />
    <circle cx="36" cy="27" r="1.2" fill="#FFFFFF" />
  </svg>
);

export const Icon3DPulsa = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="phoneGrad" x1="10" y1="4" x2="38" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#00B0FF" />
        <stop offset="100%" stopColor="#0091EA" />
      </linearGradient>
      <linearGradient id="zapGrad" x1="18" y1="12" x2="30" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFF00" />
        <stop offset="100%" stopColor="#FF6D00" />
      </linearGradient>
    </defs>
    {/* Smartphone */}
    <rect x="12" y="4" width="24" height="40" rx="5" fill="#263238" />
    <rect x="14" y="8" width="20" height="32" rx="3" fill="url(#phoneGrad)" />
    <circle cx="24" cy="6" r="1" fill="#78909C" />
    {/* Electric Bolt */}
    <path d="M26 12L17 25H23L21 36L31 22H25L26 12Z" fill="url(#zapGrad)" stroke="#FFA000" strokeWidth="0.5" />
  </svg>
);


// --- 2. CATEGORIES 3D ILLUSTRATED ICONS ---

export const CategoryIconAll = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect x="4" y="4" width="12" height="12" rx="3.5" fill="#FF3366" />
    <rect x="20" y="4" width="12" height="12" rx="3.5" fill="#3B82F6" />
    <rect x="4" y="20" width="12" height="12" rx="3.5" fill="#F59E0B" />
    <rect x="20" y="20" width="12" height="12" rx="3.5" fill="#10B981" />
    <circle cx="10" cy="10" r="2" fill="white" opacity="0.8" />
    <circle cx="26" cy="10" r="2" fill="white" opacity="0.8" />
    <circle cx="10" cy="26" r="2" fill="white" opacity="0.8" />
    <circle cx="26" cy="26" r="2" fill="white" opacity="0.8" />
  </svg>
);

export const CategoryIconGadget = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect x="9" y="3" width="18" height="30" rx="4" fill="#2563EB" />
    <rect x="11" y="6" width="14" height="22" rx="2" fill="#60A5FA" />
    <circle cx="18" cy="30" r="1.5" fill="#93C5FD" />
    <path d="M13 14L18 9L23 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const CategoryIconElektronik = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect x="4" y="6" width="28" height="20" rx="3" fill="#7C3AED" />
    <rect x="6" y="8" width="24" height="16" rx="2" fill="#A78BFA" />
    <path d="M14 26L11 31H25L22 26" fill="#6D28D9" />
    <circle cx="18" cy="16" r="3" fill="white" opacity="0.9" />
  </svg>
);

export const CategoryIconGaming = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <path d="M7 12C7 8 29 8 29 12L32 25C32 28 28 30 25 27L22 22H14L11 27C8 30 4 28 4 25L7 12Z" fill="#EC4899" />
    {/* D-Pad */}
    <rect x="9" y="16" width="6" height="2" rx="1" fill="white" />
    <rect x="11" y="14" width="2" height="6" rx="1" fill="white" />
    {/* Buttons */}
    <circle cx="25" cy="15" r="1.5" fill="#FDE047" />
    <circle cx="23" cy="18" r="1.5" fill="#67E8F9" />
  </svg>
);

export const CategoryIconFashionPria = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <path d="M11 6L4 12L9 16L11 13V30H25V13L27 16L32 12L25 6L18 10L11 6Z" fill="#059669" />
    <path d="M18 10V30" stroke="#34D399" strokeWidth="1.5" strokeDasharray="2 2" />
    <circle cx="18" cy="15" r="1" fill="white" />
    <circle cx="18" cy="20" r="1" fill="white" />
  </svg>
);

export const CategoryIconFashionWanita = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <path d="M13 12V8C13 5.2 15.2 3 18 3C20.8 3 23 5.2 23 8V12" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M6 12H30L28 32H8L6 12Z" fill="#F59E0B" />
    <rect x="16" y="18" width="4" height="5" rx="1" fill="#FEF3C7" />
  </svg>
);

export const CategoryIconKecantikan = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    {/* Serum Dropper Bottle */}
    <rect x="15" y="3" width="6" height="5" rx="2" fill="#FDA4AF" />
    <rect x="16" y="8" width="4" height="3" fill="#E11D48" />
    <rect x="10" y="11" width="16" height="21" rx="4" fill="#F43F5E" />
    <rect x="13" y="15" width="10" height="12" rx="2" fill="#FFE4E6" />
    <circle cx="18" cy="21" r="2" fill="#F43F5E" />
  </svg>
);

export const CategoryIconSepatu = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <path d="M6 22L13 10H20L23 16H29C32 16 34 20 33 24L31 28H5L6 22Z" fill="#0891B2" />
    <rect x="4" y="28" width="28" height="4" rx="2" fill="#67E8F9" />
    <path d="M16 13L14 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19 13L17 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const CategoryIconAksesoris = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    {/* Watch Strap */}
    <rect x="14" y="2" width="8" height="32" rx="2" fill="#4F46E5" />
    {/* Watch Dial */}
    <circle cx="18" cy="18" r="10" fill="#312E81" stroke="#818CF8" strokeWidth="2" />
    <circle cx="18" cy="18" r="7" fill="#6366F1" />
    <path d="M18 14V18L21 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const CategoryIconHome = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <path d="M18 4L4 16H8V30H28V16H32L18 4Z" fill="#0D9488" />
    <rect x="14" y="18" width="8" height="12" rx="1.5" fill="#CCFBF1" />
    <circle cx="20" cy="24" r="1" fill="#0D9488" />
  </svg>
);
