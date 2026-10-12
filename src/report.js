import { daysBetween } from "./loans.js";

/** Loans returned one full day or more after their due date. */
export function lateLoans(loans) {
  return loans.filter((loan) => daysBetween(loan.dueDate, loan.returnedDate) >= 1);
}
