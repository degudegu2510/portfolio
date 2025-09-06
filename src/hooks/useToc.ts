import { useState, useEffect } from 'react';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkToc from 'remark-toc';

const productFiles = import.meta.glob('/src/contents/Product/**/*.md', {
  eager: true,
  as: 'raw',
});

export interface TocItem {
  level: 1 | 2 | 3;
  text: string;
  id: string;
  children?: TocItem[];
}

export interface UseTocResult {
  toc: TocItem[];
  loading: boolean;
  error: string | null;
}

export const useToc = (slug: string): UseTocResult => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateToc = async () => {
      try {
        setLoading(true);
        setError(null);

        const filePath = `/src/contents/Product/${slug}/${slug}.md`;
        const markdown = productFiles[filePath] as string;

        if (!markdown) {
          throw new Error(`Markdown file not found: ${slug}`);
        }

        const { content } = matter(markdown);
        const parseSetting = remark().use(remarkToc, { maxDepth: 3, prefix: 'user-content-' });
        const parseStructure = parseSetting.parse(content).children;

        const flatToc: TocItem[] = [];
        const idCounts: { [key: string]: number } = {};

        parseStructure.forEach((item) => {
          if (item.type === 'heading' && item.children[0] && 'value' in item.children[0]) {
            const text = item.children[0].value;
            let id = text;

            // 重複するIDに連番を付ける
            if (idCounts[id]) {
              idCounts[id]++;
              id = `${text}-${idCounts[id] - 1}`;
            } else {
              idCounts[id] = 1;
            }

            switch (item.depth) {
              case 1:
                flatToc.push({ level: 1, text: text, id: id });
                break;
              case 2:
                flatToc.push({ level: 2, text: text, id: id });
                break;
              case 3:
                flatToc.push({ level: 3, text: text, id: id });
                break;
            }
          }
        });

        // 階層構造に変換
        const tree: TocItem[] = [];
        const parents: TocItem[] = [];

        flatToc.forEach((item) => {
          while (parents.length > 0 && parents[parents.length - 1].level >= item.level) {
            parents.pop();
          }
          if (parents.length === 0) {
            tree.push(item);
            parents.push(item);
          } else {
            const parent = parents[parents.length - 1];
            if (!parent.children) parent.children = [];
            parent.children.push(item);
            parents.push(item);
          }
        });

        setToc(tree);
      } catch (err) {
        setError(err instanceof Error ? err.message : '目次の生成に失敗しました');
        setToc([]);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      generateToc();
    }
  }, [slug]);

  return {
    toc,
    loading,
    error,
  };
};
