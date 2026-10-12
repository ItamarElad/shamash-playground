/** A member id is a string of exactly 6 ASCII digits, the first not 0. */
export function isValidMemberId(id) {
  return typeof id === "string" && /^[1-9][0-9]{5}$/.test(id);
}
