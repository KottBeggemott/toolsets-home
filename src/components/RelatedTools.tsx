import "./RelatedTools.css";

type RelatedTool = {
  name: string;
  url: string;
  description: string;
};

type RelatedToolsProps = {
  tools: RelatedTool[];
};

export default function RelatedTools({ tools }: RelatedToolsProps) {
  return (
    <>
      <h2>Related Tools</h2>

      <div className="related-tools-grid">
        {tools.map((tool) => (
          <a key={tool.url} href={tool.url} className="related-tool-card">
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
          </a>
        ))}
      </div>
    </>
  );
}