export const formatRupiah = (val) => 'Rp ' + Number(val || 0).toLocaleString('id-ID');

export const formatSold = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace('.0', '') + 'RB';
  }
  return num;
};

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });