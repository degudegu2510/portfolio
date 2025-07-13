import matter from 'gray-matter';

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
    const { data: frontmatter } = matter(content as string)
    productList.push({
      title: frontmatter.title || '',
      thumbnail: frontmatter.thumbnail || '',
      slug: slug
    })
  })
  return productList
};
