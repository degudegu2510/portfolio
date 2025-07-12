const productFiles = import.meta.glob('/src/contents/product/**/*.md', {
  eager: true,
  as: 'raw',
});

export interface TocItem {
  level: 1 | 2 | 3;
  text: string;
  id: string;
  children?: TocItem[];
}

const slugify = (text: string): string => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\- ]+/g, '')
    .replace(/\s+/g, '-');
};

export const getTocTree = (slug: string): TocItem[] => {
  const filePath = `/src/contents/product/${slug}/${slug}.md`;
  const markdown = productFiles[filePath] as string;
  if (!markdown) return [];

  // frontmatter除去
  const body = markdown.replace(/^---[\s\S]*?---/, '');

  // フラットな配列を作成
  const flatToc: TocItem[] = [];
  const lines = body.split('\n');
  lines.forEach(line => {
    let match;
    if ((match = /^#\s+(.*)/.exec(line))) {
      flatToc.push({ level: 1, text: match[1], id: slugify(match[1]) });
    } else if ((match = /^##\s+(.*)/.exec(line))) {
      flatToc.push({ level: 2, text: match[1], id: slugify(match[1]) });
    } else if ((match = /^###\s+(.*)/.exec(line))) {
      flatToc.push({ level: 3, text: match[1], id: slugify(match[1]) });
    }
  });

  // フラット配列→ツリー構造に変換
  const tree: TocItem[] = [];
  const parents: TocItem[] = [];

  flatToc.forEach(item => {
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

  return tree;
};
