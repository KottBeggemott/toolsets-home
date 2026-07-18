import { useEffect, useMemo, useState } from "react";
import "./TimezoneDifferenceCalculator.css";

import { timeZones } from "../../components/TimezoneData";

import {
  calculateTimeZoneDifference,
  formatUtcOffset,
  formatDifferenceSentence,
  getCurrentTimeInTimeZone,
  formatTimeDifference,
} from "../../components/TimezoneUtils";

export default function TimeZoneDifferenceCalculator() {
  const [fromZone, setFromZone] = useState("Europe/Zurich");
  const [toZone, setToZone] = useState("Asia/Tokyo");
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const from = useMemo(
    () => timeZones.find((zone) => zone.id === fromZone),
    [fromZone]
  );

  const to = useMemo(
    () => timeZones.find((zone) => zone.id === toZone),
    [toZone]
  );

  const result = calculateTimeZoneDifference(
    fromZone,
    toZone,
    currentDate
  );

  function handleSwap() {
    setFromZone(toZone);
    setToZone(fromZone);
  }

  if (!from || !to) {
    return <p>Time zone not found.</p>;
  }

  return (
    <div className="timezone-calculator">
      <div className="timezone-calculator__header">
        <h1>Time Zone Difference Calculator</h1>

        <p>
          Compare the current time and UTC difference between two locations.
        </p>
      </div>

      <div className="timezone-calculator__controls">
        <div className="timezone-field">
          <label htmlFor="from-timezone">From</label>

          <select
            id="from-timezone"
            value={fromZone}
            onChange={(event) => setFromZone(event.target.value)}
          >
            {timeZones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="timezone-swap-button"
          onClick={handleSwap}
          aria-label="Swap time zones"
          title="Swap time zones"
        >
          ⇄
        </button>

        <div className="timezone-field">
          <label htmlFor="to-timezone">To</label>

          <select
            id="to-timezone"
            value={toZone}
            onChange={(event) => setToZone(event.target.value)}
          >
            {timeZones.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="timezone-result">
        <div className="timezone-result__locations">
          <div className="timezone-location">
            <span className="timezone-location__label">From</span>

            <h2>{from.city}</h2>

            <p className="timezone-location__country">
              {from.country}
            </p>
            
            <p className="timezone-location__offset">
              {formatUtcOffset(result.fromOffsetMinutes)}
            </p>

            <p className="timezone-location__time">
              {getCurrentTimeInTimeZone(from.id, currentDate)}
            </p>

          </div>

          <div className="timezone-result__arrow">→</div>

          <div className="timezone-location">
            <span className="timezone-location__label">To</span>

            <h2>{to.city}</h2>

            <p className="timezone-location__country">
              {to.country}
            </p>
            
            <p className="timezone-location__offset">
              {formatUtcOffset(result.toOffsetMinutes)}
            </p>

            <p className="timezone-location__time">
              {getCurrentTimeInTimeZone(to.id, currentDate)}
            </p>

          </div>
        </div>

        <div className="timezone-result__summary">
  <span className="timezone-result__summary-label">
    Time difference
  </span>

  <strong className="timezone-result__difference">
    {formatTimeDifference(result.differenceMinutes)}
  </strong>

  <p>
    {formatDifferenceSentence(
      from.city,
      to.city,
      result.differenceMinutes
    )}
  </p>
</div>
      </div>
    </div>
  );
}