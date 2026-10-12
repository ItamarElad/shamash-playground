export const MAX_ACTIVE_LOANS = 3;

export function canBorrow(activeLoans) {
  return activeLoans < MAX_ACTIVE_LOANS;
}
