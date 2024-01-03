import { ja } from 'date-fns/locale';

/**
 * date-fns format DBなどショートフォーマット
 */
export const dateShortFormats = ['yyyy-MM-dd', { locale: ja }] as const;

/**
 * date-fns format 日本向けショートフォーマット
 */
export const japaneseDateShortFormats = ['yyyy/MM/dd', { locale: ja }] as const;

/**
 * date-fns format 日本向けDateTimeフォーマット
 */
export const japaneseDateTimeFormats = [
  'yyyy/MM/dd (eee) HH:mm',
  { locale: ja },
] as const;

/**
 * date-fns format 日本向けDate曜日付きフォーマット
 */
export const japaneseDateFormats = [
  'yyyy/MM/dd (eee)',
  { locale: ja },
] as const;

/**
 * Dateのクローン
 */
export function cloneDate(date: Date) {
  return new Date(date.getTime());
}
