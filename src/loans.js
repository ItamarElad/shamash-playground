const DAY_MS = 24 * 60 * 60 * 1000;

/** Whole days between two dates (ignores the time of day). */
export function daysBetween(from, to) {
  const start = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const end = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((end - start) / DAY_MS);
}

/** A loan is late when the book comes back after its due date. */
export function isLate(dueDate, returnedDate) {
  return daysBetween(dueDate, returnedDate) >= 0;
}

/** Late fee: 2 per late day, at most 5; over 30 days late costs a flat 30. */
export function lateFee(dueDate, returnedDate) {
  if (!isLate(dueDate, returnedDate)) {
    return 0;
  }
  const days = daysBetween(dueDate, returnedDate);
  if (days > 30) {
    return 30;
  }
  return Math.min(days * 2, 5);
}
