const NAME_MAX = 30;
const NAME_PATTERN = /^[\p{L}\p{N}][\p{L}\p{N} .'’-]*$/u;

export interface NameValidation {
  ok: boolean;
  value: string;
  error?: string;
}

/** Nama panggilan opsional: dirapikan, dibatasi panjang & karakter. */
export function validateDisplayName(input: string): NameValidation {
  // eslint-disable-next-line no-control-regex
  const cleaned = input.replace(/[\u0000-\u001F\u007F]/g, '').replace(/\s+/g, ' ').trim();
  if (cleaned === '') return { ok: true, value: '' };
  if (cleaned.length > NAME_MAX) {
    return { ok: false, value: cleaned, error: `Maksimal ${NAME_MAX} karakter.` };
  }
  if (!NAME_PATTERN.test(cleaned)) {
    return {
      ok: false,
      value: cleaned,
      error: 'Gunakan huruf, angka, spasi, titik, apostrof, atau tanda hubung.',
    };
  }
  return { ok: true, value: cleaned };
}

export const NAME_MAX_LENGTH = NAME_MAX;

export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function makeId(prefix: string, now: Date = new Date()): string {
  return `${prefix}-${now.getTime().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
}
