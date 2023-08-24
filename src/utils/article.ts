type BuildArticleDetailsMarkdownArgs = {
  title: string;
  description: string | null | undefined;
  annotation: string | null | undefined;
  highlights: {
    quote: string | null | undefined;
    annotation: string | null | undefined;
  }[];
};

export function buildArticleDetailsMarkdown({
  title,
  description,
  annotation,
  highlights,
}: BuildArticleDetailsMarkdownArgs) {
  const formattedTitle = `# ${title}`;

  const formattedDescription = description ? `\n\n${description}` : "";

  const formattedAnnotation = annotation ? `\n\n## Note\n\n${annotation}` : "";

  const formattedHighlights =
    highlights && highlights.length > 0
      ? highlights.reduce((prev, highlight) => {
          const hasData = highlight.quote || highlight.annotation;
          if (!hasData) {
            return prev;
          }
          return `${prev}${highlight.quote ? `\n\n> ${highlight.quote}` : ""}${
            highlight.annotation ? `\n\n${highlight.annotation}` : ""
          }`;
        }, "\n\n## Highlights")
      : "";

  return `${formattedTitle}${formattedDescription}${formattedAnnotation}${formattedHighlights}`;
}
