import "./ResultCard.css";

type ResultItem = {
  label: string;
  value: string | number;
};

type ResultCardProps = {
  title?: string;
  mainResult: string;
  items?: ResultItem[];
};

export default function ResultCard({
  title,
  mainResult,
  items = [],
}: ResultCardProps) {
  return (
    <>
      {title && <p className="result-label">{title}</p>}

      <h2 className="result-main">{mainResult}</h2>

      {items.length > 0 && (
        <div className="result-breakdown">
          {items.map((item) => (
            <div key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      )}
    </>
  );
}