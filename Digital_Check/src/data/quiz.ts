import type { QuizQuestion } from '../types';

export const QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Jika biaya dan ketentuan transaksi belum jelas, apa tindakan terbaik?',
    options: ['Tetap lanjut karena terlihat mudah', 'Berhenti sejenak dan minta penjelasan', 'Percaya pada iklan saja'],
    correctIndex: 1,
    explanation: 'Informasi yang belum jelas perlu diperiksa sebelum keputusan dibuat.',
  },
  {
    id: 'q2',
    question: 'Apakah checklist ini dapat memastikan suatu produk halal atau haram?',
    options: ['Ya, selalu', 'Tidak; ini alat edukasi, bukan fatwa', 'Ya, jika semua pertanyaan dijawab'],
    correctIndex: 1,
    explanation: 'Penilaian syariah memerlukan informasi produk dan panduan pihak yang kompeten.',
  },
  {
    id: 'q3',
    question: 'Sumber mana yang sebaiknya diprioritaskan untuk memeriksa ketentuan produk?',
    options: ['Dokumen resmi dan sumber otoritatif yang relevan', 'Komentar anonim saja', 'Iklan tanpa detail'],
    correctIndex: 0,
    explanation: 'Gunakan dokumen resmi dan sumber otoritatif, serta periksa apakah sumber tersebut relevan.',
  },
  {
    id: 'q4',
    question: 'Dua produk dengan nama kategori yang sama pasti memiliki struktur identik.',
    options: ['Benar', 'Tidak benar'],
    correctIndex: 1,
    explanation: 'Produk dapat memiliki akad, mekanisme, biaya, dan ketentuan yang berbeda.',
  },
  {
    id: 'q5',
    question: 'Apa makna PAUSE → CHECK → CHOOSE?',
    options: [
      'Berhenti, pahami informasi, lalu putuskan dengan sadar',
      'Klik cepat lalu baca belakangan',
      'Mengikuti keputusan orang lain',
    ],
    correctIndex: 0,
    explanation: 'Tujuannya membangun kebiasaan mengambil keputusan yang lebih sadar.',
  },
  {
    id: 'q6',
    question: 'Untuk memeriksa apakah penyelenggara layanan keuangan berizin, sebaiknya kamu…',
    options: [
      'Melihat jumlah pengikut media sosialnya',
      'Memeriksa situs resmi regulator seperti OJK',
      'Bertanya pada komentar iklan',
    ],
    correctIndex: 1,
    explanation: 'Situs resmi regulator adalah rujukan yang tepat untuk mengecek izin penyelenggara.',
  },
  {
    id: 'q7',
    question: 'Promo "hanya 5 menit lagi!" muncul saat kamu belum membaca rincian biaya. Apa yang sebaiknya dilakukan?',
    options: [
      'Segera checkout agar tidak terlewat',
      'Jangan biarkan tekanan waktu menggantikan pemeriksaan informasi penting',
      'Mengabaikan seluruh ketentuan',
    ],
    correctIndex: 1,
    explanation: 'Urgensi buatan tidak boleh menggantikan pemeriksaan harga akhir, biaya, dan kebijakan pembatalan.',
  },
  {
    id: 'q8',
    question: 'Sebelum berdonasi dari ajakan di media sosial, hal yang baik untuk diverifikasi adalah…',
    options: [
      'Identitas penyelenggara, rekening tujuan, dan laporan penyaluran',
      'Banyaknya komentar positif saja',
      'Warna poster donasi',
    ],
    correctIndex: 0,
    explanation: 'Verifikasi penerima dan informasi penyaluran membantu menghindari penipuan.',
  },
];
