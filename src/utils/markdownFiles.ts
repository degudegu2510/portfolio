export type ContentType = 'Product' | 'Project';

const markdownFiles = import.meta.glob(['../contents/Product/**/*.md', '../contents/Project/**/*.md'], {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export const getMarkdownFile = (contentType: ContentType, slug: string): string | undefined => {
  return markdownFiles[`../contents/${contentType}/${slug}/${slug}.md`];
};
