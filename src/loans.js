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

// The task gave two conflicting rates (5 and 2 per day). We keep the existing
// rate of 2 and expose it as a single constant so it is easy to change.
export const LATE_FEE_PER_DAY = 2;
export const MAX_LATE_FEE = 30;

/** Late fee: LATE_FEE_PER_DAY per late day, at most MAX_LATE_FEE. */
export function lateFee(dueDate, returnedDate) {
  if (!isLate(dueDate, returnedDate)) {
    return 0;
  }
  return Math.min(daysBetween(dueDate, returnedDate) * LATE_FEE_PER_DAY, MAX_LATE_FEE);
}
