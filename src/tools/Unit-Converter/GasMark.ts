export const gasMarkTable = [
  { gas: 0.25, c: 110, f: 225 },
  { gas: 0.5, c: 120, f: 250 },
  { gas: 1, c: 140, f: 275 },
  { gas: 2, c: 150, f: 300 },
  { gas: 3, c: 170, f: 325 },
  { gas: 4, c: 180, f: 350 },
  { gas: 5, c: 190, f: 375 },
  { gas: 6, c: 200, f: 400 },
  { gas: 7, c: 220, f: 425 },
  { gas: 8, c: 230, f: 450 },
  { gas: 9, c: 240, f: 475 },
];

export function gasMarkToCelsius(gas: number) {
  const match = gasMarkTable.find((x) => x.gas === gas);
  return match ? match.c : 140 + (gas - 1) * 14;
}

export function celsiusToGasMark(celsius: number) {
  const closest = gasMarkTable.reduce((prev, curr) =>
    Math.abs(curr.c - celsius) < Math.abs(prev.c - celsius) ? curr : prev
  );

  return closest.gas;
}