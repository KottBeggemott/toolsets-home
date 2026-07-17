import { useEffect, useState } from "react";
import "./DateInput.css";

type DateInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

type ParsedDate = {
  day: number;
  month: number;
  year: number;
};

function isLeapYear(year: number): boolean {
  return (
    year % 400 === 0 ||
    (year % 4 === 0 && year % 100 !== 0)
  );
}

function getDaysInMonth(
  month: number,
  year: number,
): number {
  const daysByMonth = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return daysByMonth[month - 1] ?? 0;
}

function isValidDate({
  day,
  month,
  year,
}: ParsedDate): boolean {
  if (year < 1 || year > 9999) {
    return false;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  const daysInMonth = getDaysInMonth(
    month,
    year,
  );

  return day >= 1 && day <= daysInMonth;
}

function formatDisplayValue(
  isoValue: string,
): string {
  if (!isoValue) {
    return "";
  }

  const [year, month, day] =
    isoValue.split("-");

  if (!year || !month || !day) {
    return "";
  }

  return `${day}/${month}/${year}`;
}

function formatIsoValue({
  day,
  month,
  year,
}: ParsedDate): string {
  const paddedDay = String(day).padStart(
    2,
    "0",
  );

  const paddedMonth = String(
    month,
  ).padStart(2, "0");

  const paddedYear = String(year).padStart(
    4,
    "0",
  );

  return `${paddedYear}-${paddedMonth}-${paddedDay}`;
}

function parseDisplayValue(
  value: string,
): ParsedDate | null {
  const match = value.match(
    /^(\d{2})\/(\d{2})\/(\d{4})$/,
  );

  if (!match) {
    return null;
  }

  const parsedDate = {
    day: Number(match[1]),
    month: Number(match[2]),
    year: Number(match[3]),
  };

  return isValidDate(parsedDate)
    ? parsedDate
    : null;
}

function formatTypedValue(value: string): string {
  const numbersOnly = value
    .replace(/\D/g, "")
    .slice(0, 8);

  if (numbersOnly.length <= 2) {
    return numbersOnly;
  }

  if (numbersOnly.length <= 4) {
    return `${numbersOnly.slice(
      0,
      2,
    )}/${numbersOnly.slice(2)}`;
  }

  return `${numbersOnly.slice(
    0,
    2,
  )}/${numbersOnly.slice(
    2,
    4,
  )}/${numbersOnly.slice(4)}`;
}

function compareIsoDates(
  first: string,
  second: string,
): number {
  return first.localeCompare(second);
}

export default function DateInput({
  label,
  value,
  onChange,
  min,
  max,
  required = false,
  disabled = false,
  placeholder = "DD/MM/YYYY",
}: DateInputProps) {
  const [displayValue, setDisplayValue] =
    useState(() => formatDisplayValue(value));

  const [error, setError] = useState("");

  useEffect(() => {
    setDisplayValue(formatDisplayValue(value));

    if (!value) {
      setError("");
    }
  }, [value]);

  const validateAndUpdate = (
    nextDisplayValue: string,
  ) => {
    if (!nextDisplayValue) {
      setError("");
      onChange("");
      return;
    }

    if (nextDisplayValue.length < 10) {
      setError("");
      onChange("");
      return;
    }

    const parsedDate =
      parseDisplayValue(nextDisplayValue);

    if (!parsedDate) {
      setError("Enter a valid date.");
      onChange("");
      return;
    }

    const isoValue =
      formatIsoValue(parsedDate);

    if (
      min &&
      compareIsoDates(isoValue, min) < 0
    ) {
      setError(
        `Date must be on or after ${formatDisplayValue(
          min,
        )}.`,
      );

      onChange("");
      return;
    }

    if (
      max &&
      compareIsoDates(isoValue, max) > 0
    ) {
      setError(
        `Date must be on or before ${formatDisplayValue(
          max,
        )}.`,
      );

      onChange("");
      return;
    }

    setError("");
    onChange(isoValue);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const formattedValue = formatTypedValue(
      event.target.value,
    );

    setDisplayValue(formattedValue);
    validateAndUpdate(formattedValue);
  };

  const handleBlur = () => {
    if (
      displayValue &&
      displayValue.length < 10
    ) {
      setError(
        "Enter the complete date in DD/MM/YYYY format.",
      );
    }
  };

  return (
    <label className="date-input-field">
      <span className="date-input-label">
        {label}
        {required && (
          <span
            className="date-input-required"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </span>

      <input
        type="text"
        inputMode="numeric"
        autoComplete="off"
        className={`date-input ${
          error ? "date-input-error-state" : ""
        }`}
        value={displayValue}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        maxLength={10}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${label
                .toLowerCase()
                .replace(/\s+/g, "-")}-error`
            : undefined
        }
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {error && (
        <span
          id={`${label
            .toLowerCase()
            .replace(/\s+/g, "-")}-error`}
          className="date-input-error"
          role="alert"
        >
          {error}
        </span>
      )}
    </label>
  );
}