import { daysBetween, lateFee } from "./loans.js";

/** Loans returned one full day or more after their due date. */
export function lateLoans(loans) {
  return loans.filter((loan) => daysBetween(loan.dueDate, loan.returnedDate) >= 1);
}

/** Total late fees per customer; customers without late loans are omitted. */
export function feesByCustomer(loans) {
  const fees = {};
  for (const loan of lateLoans(loans)) {
    fees[loan.customer] = (fees[loan.customer] ?? 0) + lateFee(loan.dueDate, loan.returnedDate);
  }
  return fees;
}

/** Text report: one line per customer (highest fee first) and a total line. */
export function reportText(loans) {
  const fees = feesByCustomer(loans);
  const names = [...new Set(lateLoans(loans).map((loan) => loan.customer))];
  if (names.length === 0) {
    return "אין איחורים";
  }
  const sorted = names
    .map((name, index) => ({ name, index, fee: fees[name] }))
    .sort((a, b) => b.fee - a.fee || a.index - b.index);
  const total = sorted.reduce((sum, row) => sum + row.fee, 0);
  return [...sorted.map((row) => `${row.name}: ${row.fee}`), `סה"כ: ${total}`].join("\n");
}
