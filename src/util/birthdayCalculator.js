let x = 1;
let UNIQ_PROB = Array.from({ length: 365 }, (q, i) => x *= (365 - i) / 365);

const isNumber = n => Object.prototype.toString.call(n) === '[object Number]';

export function uniqBirthdayProb(n) {
  if (!isNumber(n) || n < 1) return undefined;
  if (n >= 365) return 0;
  return UNIQ_PROB[Math.floor(n) - 1];
}