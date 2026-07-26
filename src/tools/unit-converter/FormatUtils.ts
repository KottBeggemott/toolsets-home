export function formatNumber(n: number): string {
  if (!isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs !== 0 && (abs < 0.0001 || abs >= 1e15)) {
    return n.toExponential(6);
  }
  return n.toLocaleString(undefined, { minimumFractionDigits: 0,
    maximumFractionDigits: 3,
   });
}
export function metersToFeetInches(meters: number): string {
  const totalInches = meters / 0.0254;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);

  return `${feet} ft ${inches} in`;
}
export function feetInchesToMeters(text: string): number {
  const match = text.match(
    /(\d+(?:\.\d+)?)\s*(?:ft|feet|foot|')\s*(\d+(?:\.\d+)?)?\s*(?:in|inch|inches|")?/i
  );

  if (!match) return parseFloat(text) * 0.3048;

  const feet = parseFloat(match[1]);
  const inches = match[2] ? parseFloat(match[2]) : 0;

  return (feet * 12 + inches) * 0.0254;
}

export function formatTimeSmart(seconds: number): string {
  if (!isFinite(seconds)) return "";
  let remaining = Math.round(seconds);
  const years = Math.floor(remaining / 31536000);
  remaining %= 31536000;
  const months = Math.floor(remaining / 2629800);
  remaining %= 2629800;
  const days = Math.floor(remaining / 86400);
  remaining %= 86400;
  const hours = Math.floor(remaining / 3600);
  remaining %= 3600;
  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const parts: string[] = [];

  if (years > 0) parts.push(`${years} yr`);
  if (months > 0) parts.push(`${months} mo`);
  if (days > 0) parts.push(`${days} d`);
  if (hours > 0) parts.push(`${hours} h`);
  if (minutes > 0) parts.push(`${minutes} min`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs} sec`);

  return parts.join(" ");
}
export function formatTimeForTarget(seconds: number, target: string): string {
  if (!isFinite(seconds)) return "";

  const totalSeconds = Math.round(seconds);

  if (target === "wk") {
    const weeks = Math.floor(totalSeconds / 604800);
    const days = Math.floor((totalSeconds % 604800) / 86400);
    return days > 0 ? `${weeks} wk ${days} d` : `${weeks} wk`;
  }

  if (target === "yr") {
    return formatTimeSmart(totalSeconds);
  }

  if (target === "mo") {
    const months = Math.floor(totalSeconds / 2629800);
    const days = Math.floor((totalSeconds % 2629800) / 86400);
    return days > 0 ? `${months} mo ${days} d` : `${months} mo`;
  }

  return formatTimeSmart(totalSeconds);
}