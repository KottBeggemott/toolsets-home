import { useMemo, useState } from "react";

import CalculatorLayout from "../../components/CalculatorLayout";
import ResultCard from "../../components/ResultCard";
import ActionButtons from "../../components/ActionButtons";
import FAQ from "../../components/FAQ";
import RelatedTools from "../../components/RelatedTools";
import SEO from "../../components/SEO";
import DateInput from "../../components/DateInput";

import {
  calculateAge,
  formatDateForInput,
  parseLocalDate,
} from "./CalculateAge";

const faqItems = [
  {
    question: "How is exact age calculated?",
    answer:
      "Exact age is calculated as completed years, followed by completed months and remaining days between the date of birth and the selected calculation date.",
  },
  {
    question: "Can I calculate my age on a past or future date?",
    answer:
      "Yes. Change the calculation date to see how old you were on a past date or how old you will be on a future date.",
  },
  {
    question: "How are leap-year birthdays handled?",
    answer:
      "For someone born on February 29, the calculator uses February 28 in years that do not contain February 29.",
  },
  {
    question: "Why are total weeks rounded down?",
    answer:
      "Total weeks shows the number of fully completed seven-day periods. Remaining days are not counted as another full week.",
  },
];

const relatedTools = [
  /*
  {
    name: "Date Difference Calculator",
    url: "/date-difference-calculator",
    description:
      "Calculate the exact difference between two calendar dates.",
  },
  */
  {
    name: "Percentage Calculator",
    url: "/percentage-calculator",
    description:
      "Calculate percentages, increases, decreases and percentage differences.",
  },
  {
    name: "Unit Converter",
    url: "/unit-converter",
    description:
      "Convert units of length, weight, temperature, time and more.",
  },
];

function formatReadableDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AgeCalculator() {
  const today = useMemo(
    () => formatDateForInput(new Date()),
    []
  );

  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(today);

  const birth = useMemo(
    () => parseLocalDate(birthDate),
    [birthDate]
  );

  const target = useMemo(
    () => parseLocalDate(targetDate),
    [targetDate]
  );

  const result = useMemo(() => {
    if (!birth || !target) return null;

    return calculateAge(birth, target);
  }, [birth, target]);

  const hasInvalidDateOrder =
    birth !== null &&
    target !== null &&
    birth > target;

  const resultText = result
    ? `${result.years} years, ${result.months} months and ${result.days} days`
    : "";

  const handleReset = () => {
    setBirthDate("");
    setTargetDate(today);
  };

  const handleCopy = async () => {
    if (!result) return;

    const text = [
      `Exact age: ${resultText}`,
      `Total months: ${result.totalMonths.toLocaleString()}`,
      `Total weeks: ${result.totalWeeks.toLocaleString()}`,
      `Total days: ${result.totalDays.toLocaleString()}`,
      `Next birthday: ${formatReadableDate(result.nextBirthday)}`,
      `Days until next birthday: ${result.daysUntilBirthday}`,
    ].join("\n");

    await navigator.clipboard.writeText(text);
  };

  const handleShare = async () => {
    if (!result) return;

    const text = `My exact age is ${resultText}.`;

    if (navigator.share) {
      await navigator.share({
        title: "Age Calculator Result",
        text,
        url: window.location.href,
      });

      return;
    }

    await navigator.clipboard.writeText(
      `${text}\n${window.location.href}`
    );
  };

  return (
    <>
      <SEO
        title="Age Calculator"
        description="Calculate your exact age in years, months and days, total days lived, total weeks and time until your next birthday."
        canonicalPath="/age-calculator"
      />

      <CalculatorLayout
        title="Age Calculator"
        subtitle="Calculate your exact age, total days lived and time until your next birthday."
       result={
  result ? (
    <>
      {result.daysUntilBirthday === 0 && (
        <div className="birthday-banner">
          <h2>🥳 Happy Birthday! 🎂</h2>

          <p>
            Today marks another trip around the Sun.
            <br />
            Have an amazing day!
          </p>
        </div>
      )}
            <ResultCard
              title="Your exact age"
              mainResult={resultText}
              items={[
                {
                  label: "Total months",
                  value: result.totalMonths.toLocaleString(),
                },
                {
                  label: "Total weeks",
                  value: result.totalWeeks.toLocaleString(),
                },
                {
                  label: "Total days",
                  value: result.totalDays.toLocaleString(),
                },
                {
                  label: "Next birthday",
                  value: formatReadableDate(result.nextBirthday),
                },
                {
                    label: "Next birthday",
                    value:
                    result.daysUntilBirthday === 0
                    ? "🎉 Happy Birthday! 🎂"
                    : formatReadableDate(result.nextBirthday),
                },
                {
                    label: "Time until next birthday",
                    value:
                    result.daysUntilBirthday === 0
                    ? "Enjoy your special day!"
                    : `${result.daysUntilBirthday.toLocaleString()} day${
                        result.daysUntilBirthday === 1 ? "" : "s"
                    }`,
                },
               ]}
      />
    </>
  ) : undefined
}
        actions={
          <ActionButtons
            onReset={handleReset}
            onCopy={result ? handleCopy : undefined}
            onShare={result ? handleShare : undefined}
          />
        }
        infoTitle="How the age calculator works"
        info={
          <p>
            Enter a date of birth and choose the date on which the age
            should be calculated. The calculator counts completed years,
            completed months and the remaining number of days. It also
            calculates total days, full weeks and the next birthday.
          </p>
        }
        faq={<FAQ items={faqItems} />}
        relatedTools={<RelatedTools tools={relatedTools} />}
      >
      <DateInput
  label="Date of birth"
  value={birthDate}
  max={targetDate}
  onChange={setBirthDate}
/>

<DateInput
  label="Calculate age on"
  value={targetDate}
  onChange={setTargetDate}
/>

        {hasInvalidDateOrder && (
          <p role="alert">
            Date of birth cannot be later than the calculation
            date.
          </p>
        )}
      </CalculatorLayout>
    </>
  );
}