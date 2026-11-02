export const STATUS = {
  MENUNGGU_PEMBAYARAN: 'menunggu_pembayaran',
  DIKEMAS: 'dikemas',
  DIKIRIM: 'dikirim',
  SELESAI: 'selesai',
  DIBATALKAN: 'dibatalkan',
};

export const STATUS_FLOW = [
  STATUS.MENUNGGU_PEMBAYARAN,
  STATUS.DIKEMAS,
  STATUS.DIKIRIM,
  STATUS.SELESAI,
];

export const STATUS_LABEL = {
  [STATUS.MENUNGGU_PEMBAYARAN]: 'Menunggu Pembayaran',
  [STATUS.DIKEMAS]: 'Dikemas',
  [STATUS.DIKIRIM]: 'Dikirim',
  [STATUS.SELESAI]: 'Selesai',
  [STATUS.DIBATALKAN]: 'Dibatalkan',
};
