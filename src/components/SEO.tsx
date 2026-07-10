type SEOProps = {
  title: string;
  description: string;
  canonicalPath?: string;
};

export default function SEO({
  title,
  description,
  canonicalPath,
}: SEOProps) {
  const siteName = "Toolsets";
  const fullTitle = `${title} | ${siteName}`;
  const canonicalUrl = canonicalPath
    ? `https://toolsets.tools${canonicalPath}`
    : "https://toolsets.tools";

  document.title = fullTitle;

  const setMeta = (name: string, content: string) => {
    let tag = document.querySelector(
      `meta[name="${name}"]`
    ) as HTMLMetaElement | null;

    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", name);
      document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
  };

  const setProperty = (property: string, content: string) => {
    let tag = document.querySelector(
      `meta[property="${property}"]`
    ) as HTMLMetaElement | null;

    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("property", property);
      document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
  };

  let canonical = document.querySelector(
    `link[rel="canonical"]`
  ) as HTMLLinkElement | null;

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", canonicalUrl);

  setMeta("description", description);
  setProperty("og:title", fullTitle);
  setProperty("og:description", description);
  setProperty("og:type", "website");
  setProperty("og:url", canonicalUrl);

  return null;
}