// import matter from 'gray-matter';

// export interface MarkdownContent {
//   frontmatter: {
//     title: string;
//     description: string;
//     date: string;
//     [key: string]: any;
//   };
//   content: string;
// }

// export const loadMarkdownContent = async (filename: string): Promise<MarkdownContent> => {
//   try {
//     const response = await fetch(`/src/content/${filename}.md`);
//     const markdownText = await response.text();
//     const { data: frontmatter, content } = matter(markdownText);
    
//     return {
//       frontmatter: frontmatter as MarkdownContent['frontmatter'],
//       content
//     };
//   } catch (error) {
//     console.error(`Error loading markdown content: ${filename}`, error);
//     throw new Error(`Failed to load markdown content: ${filename}`);
//   }
// };

// export const loadAllMarkdownContent = async (): Promise<Record<string, MarkdownContent>> => {
//   const contentFiles = ['about', 'projects'];
//   const content: Record<string, MarkdownContent> = {};
  
//   for (const filename of contentFiles) {
//     try {
//       content[filename] = await loadMarkdownContent(filename);
//     } catch (error) {
//       console.error(`Failed to load ${filename}.md`);
//     }
//   }
  
//   return content;
// };

const productFiles = import.meta.glob('/src/contents/product/**/*.md', {
  eager: true,
  as: 'raw',
})

export interface ProductListItem {
  title: string;
  thumbnail: string;
  slug: string;
}

export const ProductList = (): ProductListItem[] => {
  const productList: ProductListItem[] = []

  Object.entries(productFiles).forEach(([filePath, content]) => {
    const slug = filePath.split('/').pop()?.replace('.md', '') || ''

    const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)/.exec(content as string)
    if (!match) return null

    const frontMatterLines = match[1].split('\n').filter(Boolean)
    const metadata: Record<string, string> = {}
    frontMatterLines.forEach((line) => {
      const [key, ...value] = line.split(': ')
      metadata[key.trim()] = value.join(': ').trim()
    })

    productList.push({
      title: metadata.title || '',
      thumbnail: metadata.thumbnail || '',
      slug: slug
    })
  })

  return productList
};
