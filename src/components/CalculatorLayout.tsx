// src/components/CalculatorLayout.tsx
import "./CalculatorLayout.css";

type CalculatorLayoutProps = {
  title: string;
  subtitle: string;

  children: React.ReactNode;

  result?: React.ReactNode;

  infoTitle?: string;
  info?: React.ReactNode;

  actions?: React.ReactNode;

  faq?: React.ReactNode;

  relatedTools?: React.ReactNode;
};

export default function CalculatorLayout({
  title,
  subtitle,
  children,
  result,
  infoTitle,
  info,
  actions,
  faq,
  relatedTools  
}: CalculatorLayoutProps) {
  return (
    <div className="calculator-page">
      <a href="/" className="back-link">← Back to Toolsets</a>

      <header className="calculator-header">
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </header>
       <main className="calculator-card">
        <div className="calculator-inputs">
          {children}
        </div>

        {result && (
          <div className="result-card">
            {result}
          </div>
        )}

          {actions && (
            <div className="layout-actions">
            {actions}
            </div>
        )}
      </main>

      {info && (
        <section className="info-section">
          {infoTitle && <h2>{infoTitle}</h2>}
          {info}
        </section>
      )}
      {faq && (
  <section className="faq-section">
    {faq}
  </section>
)}
{relatedTools && (
  <section className="related-tools">
    {relatedTools}
  </section>
)}
    </div>
  );
}