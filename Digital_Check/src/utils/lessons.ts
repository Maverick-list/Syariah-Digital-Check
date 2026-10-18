import { LESSONS } from '../data/lessons';
import type { Lesson } from '../types';

/** Menyaring materi berdasarkan kata kunci (judul/ringkasan/kategori) dan kategori. */
export function filterLessons(query: string, category: string, lessons: Lesson[] = LESSONS): Lesson[] {
  const q = query.trim().toLowerCase();
  return lessons.filter(
    (l) =>
      (category === 'Semua' || l.category === category) &&
      (q === '' || `${l.title} ${l.summary} ${l.category}`.toLowerCase().includes(q)),
  );
}
