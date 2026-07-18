export type TimeZoneDifferenceResult = {
  fromOffsetMinutes: number;
  toOffsetMinutes: number;
  differenceMinutes: number;
};

function getDateTimeParts(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(date);

  const values: Record<string, string> = {};

  for (const part of parts) {
    if (part.type !== "literal") {
      values[part.type] = part.value;
    }
  }

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  };
}

export function getUtcOffsetMinutes(
  timeZone: string,
  date: Date = new Date()
): number {
  const parts = getDateTimeParts(date, timeZone);

  const displayedAsUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  );

  return Math.round((displayedAsUtc - date.getTime()) / 60000);
}

export function calculateTimeZoneDifference(
  fromTimeZone: string,
  toTimeZone: string,
  date: Date = new Date()
): TimeZoneDifferenceResult {
  const fromOffsetMinutes = getUtcOffsetMinutes(fromTimeZone, date);
  const toOffsetMinutes = getUtcOffsetMinutes(toTimeZone, date);

  return {
    fromOffsetMinutes,
    toOffsetMinutes,
    differenceMinutes: toOffsetMinutes - fromOffsetMinutes,
  };
}

export function formatUtcOffset(offsetMinutes: number): string {
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absoluteMinutes = Math.abs(offsetMinutes);

  const hours = Math.floor(absoluteMinutes / 60);
  const minutes = absoluteMinutes % 60;

  if (minutes === 0) {
    return `UTC${sign}${hours}`;
  }

  return `UTC${sign}${hours}:${minutes.toString().padStart(2, "0")}`;
}

export function formatTimeDifference(differenceMinutes: number): string {
  if (differenceMinutes === 0) {
    return "Same time";
  }

  const absoluteMinutes = Math.abs(differenceMinutes);
  const hours = Math.floor(absoluteMinutes / 60);
  const minutes = absoluteMinutes % 60;

  const hourText = `${hours} hour${hours === 1 ? "" : "s"}`;
  const minuteText = `${minutes} minute${minutes === 1 ? "" : "s"}`;

  if (hours === 0) {
    return minuteText;
  }

  if (minutes === 0) {
    return hourText;
  }

  return `${hourText} ${minuteText}`;
}

export function formatDifferenceSentence(
  fromLabel: string,
  toLabel: string,
  differenceMinutes: number
): string {
  if (differenceMinutes === 0) {
    return `${fromLabel} and ${toLabel} are in the same time zone.`;
  }

  const formattedDifference = formatTimeDifference(differenceMinutes);

  if (differenceMinutes > 0) {
    return `${toLabel} is ${formattedDifference} ahead of ${fromLabel}.`;
  }

  return `${toLabel} is ${formattedDifference} behind ${fromLabel}.`;
}

export function getCurrentTimeInTimeZone(
  timeZone: string,
  date: Date = new Date()
): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}