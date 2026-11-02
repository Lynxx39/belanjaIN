// Tiny dependency-free validators returning { ok, message }.
export const required = (value, label, maxLen = 200) => {
  const str = String(value || '').trim();
  if (!str) return { ok: false, message: `${label} wajib diisi` };
  if (str.length > maxLen) return { ok: false, message: `${label} maksimal ${maxLen} karakter` };
  return { ok: true };
};

export const phone = (value) => {
  const clean = String(value || '').replace(/[\s-]/g, '').trim();
  return /^(\+62|62|0)8\d{7,12}$/.test(clean)
    ? { ok: true }
    : { ok: false, message: 'Nomor HP tidak valid (contoh: 08xxxxxxxxxx)' };
};

export const addressForm = ({ name, phone: ph, detail }) => {
  for (const [value, label, max] of [
    [name, 'Nama penerima', 100],
    [ph, 'Nomor HP', 20],
    [detail, 'Alamat lengkap', 300],
  ]) {
    const check = required(value, label, max);
    if (!check.ok) return check;
  }
  return phone(ph);
};
