import {
  gasMarkToCelsius,
  celsiusToGasMark,
} from "./GasMark";

export function temperatureToKelvin(
  value: number,
  from: string
): number {
  if (from === "K") return value;
  if (from === "C") return value + 273.15;
  if (from === "F") return ((value - 32) * 5) / 9 + 273.15;
  if (from === "gasMark") {
    return gasMarkToCelsius(value) + 273.15;
  }

  return Number.NaN;
}

export function convertTemperature(value: number, from: string, to: string): number {
  const kelvin = temperatureToKelvin(value, from);

if (kelvin < 0) {
  return NaN;
}
  let celsius: number;

if (from === "C")
    celsius = value;
else if (from === "F")
    celsius = (value - 32) * (5 / 9);
else if (from === "gasMark")
    celsius = gasMarkToCelsius(value);
else
    celsius = value - 273.15;

  if (to === "C") return celsius;
if (to === "F") return celsius * (9 / 5) + 32;
if (to === "gasMark") return celsiusToGasMark(celsius);
return celsius + 273.15;
}