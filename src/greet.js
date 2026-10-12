/** Greeting for a name; just the greeting when the name is empty or missing. */
export function greet(name) {
  if (name === undefined || name === null || name === "") return "שלום";
  return "שלום, " + name;
}
