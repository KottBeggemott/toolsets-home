export type AgeResult = {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  daysUntilBirthday: number;
  nextBirthday: Date;
};

const millisecondsPerDay = 1000 * 60 * 60 * 24;

export function parseLocalDate(value: string): Date | null {
  if (!value) return null;

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);

  const isValid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day;

  return isValid ? date : null;
}

export function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function createClampedDate(
  year: number,
  month: number,
  day: number
): Date {
  const clampedDay = Math.min(day, daysInMonth(year, month));

  return new Date(year, month, clampedDay);
}

function addYearsClamped(date: Date, years: number): Date {
  return createClampedDate(
    date.getFullYear() + years,
    date.getMonth(),
    date.getDate()
  );
}

function addMonthsClamped(date: Date, months: number): Date {
  const totalMonths = date.getMonth() + months;
  const year = date.getFullYear() + Math.floor(totalMonths / 12);
  const month = ((totalMonths % 12) + 12) % 12;

  return createClampedDate(year, month, date.getDate());
}

function differenceInDays(start: Date, end: Date): number {
  const startUtc = Date.UTC(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  );

  const endUtc = Date.UTC(
    end.getFullYear(),
    end.getMonth(),
    end.getDate()
  );

  return Math.floor((endUtc - startUtc) / millisecondsPerDay);
}

export function calculateAge(
  birthDate: Date,
  targetDate: Date
): AgeResult | null {
  if (birthDate > targetDate) return null;

  let years = targetDate.getFullYear() - birthDate.getFullYear();

  let yearCursor = addYearsClamped(birthDate, years);

  if (yearCursor > targetDate) {
    years -= 1;
    yearCursor = addYearsClamped(birthDate, years);
  }

  let months = 0;

  while (months < 11) {
    const nextMonth = addMonthsClamped(yearCursor, months + 1);

    if (nextMonth > targetDate) break;

    months += 1;
  }

  const monthCursor = addMonthsClamped(yearCursor, months);
  const days = differenceInDays(monthCursor, targetDate);

  const totalDays = differenceInDays(birthDate, targetDate);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  let nextBirthday = createClampedDate(
    targetDate.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );

  if (nextBirthday < targetDate) {
    nextBirthday = createClampedDate(
      targetDate.getFullYear() + 1,
      birthDate.getMonth(),
      birthDate.getDate()
    );
  }

  const daysUntilBirthday = differenceInDays(
    targetDate,
    nextBirthday
  );

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    daysUntilBirthday,
    nextBirthday,
  };
}