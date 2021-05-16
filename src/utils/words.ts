export const capitalize = (s: string): string => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const titleCase = (s: string): string => {
  if (typeof s !== "string") return "";
  let str = s.toLowerCase();
  str
    .split(" ") // cut it up into words
    .map(c => capitalize(c)) // capitalize those words
    .join(" "); // join it back together

  return str;
};
