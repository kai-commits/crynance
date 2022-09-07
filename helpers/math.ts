export const roundNumber = (num: number, decimalPlaces: number) => {
  return Math.round(num * Number('1'.padEnd(decimalPlaces + 1, '0'))) / Number('1'.padEnd(decimalPlaces + 1, '0'));
};
