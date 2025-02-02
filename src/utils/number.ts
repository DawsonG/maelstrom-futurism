const ALPHABET = "23456789abcdefghijkmnpqrstuvwxyz";

export const clamp = (numb: number, min: number, max: number) =>
  Math.min(Math.max(numb, min), max);

export const uniqueHash = (length: number) => {
  var rtn = "";
  for (var i = 0; i < length; i++) {
    rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return rtn;
};
