import type { SourceRef } from '../types';

const CHECKED = '2026-10-18';

/**
 * Metadata sumber edukasi. Kebijakan verifikasi:
 *  - Judul & nomor fatwa dicocokkan lewat pencarian web pada tanggal CHECKED
 *    (beberapa sumber sekunder + upaya akses situs DSN-MUI).
 *  - Naskah primer lengkap BELUM dibaca ulang oleh tim pengembang; aplikasi
 *    tidak mengutip isi pasal, hanya merujuk judul agar pengguna membaca sendiri.
 *  - Tautan hanya ke beranda situs resmi karena tautan dalam belum diverifikasi.
 */
export const SOURCES: SourceRef[] = [
  {
    id: 'dsnmui-117-2018',
    title:
      'Fatwa DSN-MUI No. 117/DSN-MUI/II/2018 tentang Layanan Pembiayaan Berbasis Teknologi Informasi Berdasarkan Prinsip Syariah',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    lastVerified: CHECKED,
    verificationNote:
      'Judul dan nomor dicocokkan via pencarian web. Naskah primer perlu dibaca pengguna di situs resmi.',
  },
  {
    id: 'dsnmui-111-2017',
    title: 'Fatwa DSN-MUI No. 111/DSN-MUI/IX/2017 tentang Akad Jual Beli Murabahah',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    lastVerified: CHECKED,
    verificationNote:
      'Judul dan nomor dicocokkan via pencarian web. Naskah primer perlu dibaca pengguna di situs resmi.',
  },
  {
    id: 'dsnmui-77-2010',
    title: 'Fatwa DSN-MUI No. 77/DSN-MUI/V/2010 tentang Jual Beli Emas Secara Tidak Tunai',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    lastVerified: CHECKED,
    verificationNote:
      'Judul dan nomor dicocokkan via pencarian web. Naskah primer perlu dibaca pengguna di situs resmi.',
  },
  {
    id: 'dsnmui-116-2017',
    title: 'Fatwa DSN-MUI No. 116/DSN-MUI/IX/2017 tentang Uang Elektronik Syariah',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    url: 'https://dsnmui.or.id',
    kind: 'fatwa',
    lastVerified: CHECKED,
    verificationNote:
      'Judul dan nomor dicocokkan via pencarian web. Naskah primer perlu dibaca pengguna di situs resmi.',
  },
  {
    id: 'ojk-portal',
    title: 'Portal resmi Otoritas Jasa Keuangan (daftar entitas berizin, edukasi, pengaduan konsumen)',
    publisher: 'Otoritas Jasa Keuangan',
    url: 'https://ojk.go.id',
    kind: 'portal',
    lastVerified: CHECKED,
    verificationNote:
      'Hanya beranda situs resmi yang dirujuk. Gunakan situs tersebut untuk mengecek izin penyelenggara.',
  },
  {
    id: 'bi-portal',
    title: 'Portal resmi Bank Indonesia (sistem pembayaran dan perlindungan konsumen)',
    publisher: 'Bank Indonesia',
    url: 'https://www.bi.go.id',
    kind: 'portal',
    lastVerified: CHECKED,
    verificationNote: 'Hanya beranda situs resmi yang dirujuk.',
  },
  {
    id: 'dsnmui-portal',
    title: 'Portal resmi DSN-MUI (kumpulan fatwa)',
    publisher: 'Dewan Syariah Nasional – Majelis Ulama Indonesia',
    url: 'https://dsnmui.or.id',
    kind: 'portal',
    lastVerified: CHECKED,
    verificationNote:
      'Situs dapat diakses pada tanggal pengecekan; daftar fatwa pada halaman kategori tidak memuat semua nomor di atas, sehingga pencocokan judul memakai sumber tambahan.',
  },
];

export const SOURCES_BY_ID: Record<string, SourceRef> = Object.fromEntries(
  SOURCES.map((s) => [s.id, s]),
);

export function getSources(ids: string[]): SourceRef[] {
  return ids.map((id) => SOURCES_BY_ID[id]).filter((s): s is SourceRef => !!s);
}
