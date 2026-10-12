import { daysBetween } from './loans.js';

/** Describes a due date relative to today, by calendar day only. */
export function dueText(dueDate, today) {
  const n = daysBetween(today, dueDate);
  if (n === 0) return 'היום';
  if (n === 1) return 'מחר';
  if (n > 1) return `בעוד ${n} ימים`;
  return `לפני ${-n} ימים`;
}
