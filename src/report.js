import { isLate } from "./loans.js";

/** Only the loans returned late, in their original order. */
export function lateLoans(loans) {
  return loans.filter((loan) => isLate(loan.dueDate, loan.returnedDate));
}
