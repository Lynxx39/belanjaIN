// Tiny dependency-free validators returning { ok, message }.
export const required = (value, label) =>
  value && String(value).trim() ? { ok: true } : { ok: false, message: `${label} wajib diisi` };

export const phone = (value) => {
  const clean = String(value || '').replace(/[\s-]/g, '');
  return /^(\+62|62|0)8\d{7,12}$/.test(clean)
    ? { ok: true }
    : { ok: false, message: 'Nomor HP tidak valid (contoh: 08xxxxxxxxxx)' };
};

export const addressForm = ({ name, phone: ph, detail }) => {
  for (const [value, label] of [[name, 'Nama penerima'], [ph, 'Nomor HP'], [detail, 'Alamat lengkap']]) {
    const check = required(value, label);
    if (!check.ok) return check;
  }
  return phone(ph);
};