import { LESSONS } from '../data/lessons';
import type { Lesson } from '../types';

/** Menyaring materi berdasarkan kata kunci (judul/ringkasan/penjelasan/contoh/kategori) dan kategori. */
export function filterLessons(query: string, category: string, lessons: Lesson[] = LESSONS): Lesson[] {
  const q = query.trim().toLowerCase();
  return lessons.filter(
    (l) =>
      (category === 'Semua' || l.category.toLowerCase() === category.toLowerCase()) &&
      (q === '' ||
        `${l.title} ${l.summary} ${l.introduction || ''} ${l.conceptExplanation} ${l.practicalExample} ${l.category} ${l.body.join(' ')} ${l.keyPoints.join(' ')}`
          .toLowerCase()
          .includes(q)),
  );
}
