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

/** Late fee: 2 per late day, at most 30. */
export function lateFee(dueDate, returnedDate) {
  if (!isLate(dueDate, returnedDate)) {
    return 0;
  }
  return Math.min(daysBetween(dueDate, returnedDate) * 2, 30);
}

/** Returns a copy of the loan with dueDate moved forward by a positive whole number of days. */
export function renewLoan(loan, days) {
  if (!Number.isInteger(days) || days <= 0) {
    throw new Error("days must be a positive integer");
  }
  const dueDate = new Date(loan.dueDate);
  dueDate.setDate(dueDate.getDate() + days);
  return { ...loan, dueDate };
}
