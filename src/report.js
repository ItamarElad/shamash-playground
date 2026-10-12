import { isLate, lateFee } from "./loans.js";

/** Only the loans returned late, in their original order. */
export function lateLoans(loans) {
  return loans.filter((loan) => isLate(loan.dueDate, loan.returnedDate));
}

/** Sum of late fees per customer; customers without late loans are left out. */
export function feesByCustomer(loans) {
  const fees = {};
  for (const loan of lateLoans(loans)) {
    fees[loan.customer] =
      (fees[loan.customer] ?? 0) + lateFee(loan.dueDate, loan.returnedDate);
  }
  return fees;
}

/** Report lines per customer (highest first, ties by first appearance) plus a total line. */
export function reportText(loans) {
  const entries = Object.entries(feesByCustomer(loans));
  if (entries.length === 0) {
    return "אין איחורים";
  }
  entries.sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, fee]) => sum + fee, 0);
  const lines = entries.map(([name, fee]) => `${name}: ${fee}`);
  lines.push(`סה"כ: ${total}`);
  return lines.join("\n");
}
