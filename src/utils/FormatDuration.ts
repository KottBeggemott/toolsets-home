export function formatDuration(years: number, months: number) {
  const yearText = years === 1 ? "year" : "years";
  const monthText = months === 1 ? "month" : "months";

  if (years === 0) {
    return `${months} ${monthText}`;
  }

  if (months === 0) {
    return `${years} ${yearText}`;
  }

  return `${years} ${yearText} ${months} ${monthText}`;
}