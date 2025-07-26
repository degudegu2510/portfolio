import matter from 'gray-matter'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'

const productFiles = import.meta.glob('/src/contents/product/**/*.md', {
  eager: true,
  as: 'raw',
})

export const getMarkdownHeader = (slug: string) => {
  const filePath = `/src/contents/product/${slug}/${slug}.md`
  const markdown = productFiles[filePath] as string
  const { data: frontmatter } = matter(markdown)

  return {
    title: frontmatter.title as string,
    thumbnail: frontmatter.thumbnail as string
  }
}

export const getMarkdownBody = (slug: string) => {
  const filePath = `/src/contents/product/${slug}/${slug}.md`
  const markdown = productFiles[filePath] as string

  const { content } = matter(markdown)

  const parseContent = remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug, { prefix: '', uniqueSlugStartIndex: 1 })
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content)

  return parseContent
}
