export const makeMove = (matches: number, m: number): number => {
  if ((matches - 3) % (m + 1) === 0 || (matches - 3) % (m + 1) === 1) {
    return 3;
  } else {
    return 1;
  }
};

export const canWin = (
  maxMatches: number,
  matches: number,
  computerMatches: number
): number => {
  for (let i = 1; i <= maxMatches; i++) {
    if (matches - i === 0 || matches - i === 1) {
      if ((computerMatches + i) % 2 === 0) {
        return i;
      }
    }
  }
  return 0;
};

export const clamp = (number: number, min: number, max: number): number => {
  return Math.min(Math.max(number, min), max);
};
