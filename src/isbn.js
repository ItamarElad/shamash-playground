export function isValidIsbn10(text) {
  if (typeof text !== "string") return false;
  const s = text.replace(/[-\s]/g, "");
  if (!/^[0-9]{9}[0-9Xx]$/.test(s)) return false;
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const c = s[i];
    const v = c === "X" || c === "x" ? 10 : Number(c);
    sum += v * (10 - i);
  }
  return sum % 11 === 0;
}
