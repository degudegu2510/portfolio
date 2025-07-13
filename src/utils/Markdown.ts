import matter from 'gray-matter'

const productFiles = import.meta.glob('/src/contents/product/**/*.md', {
  eager: true,
  as: 'raw',
})

export const getMarkdownHeader = (slug: string) => {

  const filePath = `/src/contents/product/${slug}/${slug}.md`
  const markdown = productFiles[filePath] as string
  const { data: frontmatter } = matter(markdown as string)

  return {
    title: frontmatter.title as string,
    thumbnail: frontmatter.thumbnail as string
  }
}