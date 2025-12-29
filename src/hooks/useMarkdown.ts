import { useState, useEffect } from 'react';
import matter from 'gray-matter';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { rehypeImageResolver, resolveImagePath } from '../utils/rehypeImageResolver';

const productFiles = import.meta.glob('/src/contents/Product/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export interface MarkdownHeader {
  title: string;
  thumbnail: string;
}

export interface UseMarkdownResult {
  header: MarkdownHeader | null;
  body: string | null;
  loading: boolean;
  error: string | null;
}

export const useMarkdown = (slug: string): UseMarkdownResult => {
  const [header, setHeader] = useState<MarkdownHeader | null>(null);
  const [body, setBody] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('productFiles count:', Object.keys(productFiles).length);
        console.log('productFiles keys:', Object.keys(productFiles));

        const filePath = `/src/contents/Product/${slug}/${slug}.md`;
        const markdown = productFiles[filePath] as string;

        if (!markdown) {
          throw new Error(`Markdown file not found: ${slug}`);
        }

        // ヘッダー情報の取得
        const { data: frontmatter } = matter(markdown);
        const thumbnailPath = frontmatter.thumbnail as string;
        setHeader({
          title: frontmatter.title as string,
          thumbnail: resolveImagePath(thumbnailPath, slug),
        });

        // ボディの処理
        const { content } = matter(markdown);
        const processedContent = await remark()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeSlug, { prefix: '', uniqueSlugStartIndex: 1 })
          .use(rehypeImageResolver(slug))
          .use(rehypeHighlight)
          .use(rehypeStringify, { allowDangerousHtml: true })
          .process(content);

        setBody(processedContent.toString());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Markdownの読み込みに失敗しました');
        setHeader(null);
        setBody(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadMarkdown();
    }
  }, [slug]);

  return {
    header,
    body,
    loading,
    error,
  };
};
