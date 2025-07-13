import matter from 'gray-matter'
import { remark } from 'remark'
import remarkToc from 'remark-toc'
export interface TocItem {
  level: 1 | 2 | 3
  text: string
  id: string
  children?: TocItem[]
}

const productFiles = import.meta.glob('/src/contents/product/**/*.md', {
  eager: true,
  as: 'raw',
})

export const getTocTree = (slug: string) => {
  const filePath = `/src/contents/product/${slug}/${slug}.md`
  const markdown = productFiles[filePath] as string
  
  const { content } = matter(markdown)
  const parseSetting = remark().use(remarkToc, {maxDepth: 3, prefix: 'user-content-' })
  const parseStructure = parseSetting.parse(content).children

  const flatToc: TocItem[] = []
  parseStructure.forEach((node) => {
    if (node.type === 'heading' && node.children[0] && "value" in node.children[0]) {
      switch (node.depth) {
        case 1:
          flatToc.push({ level: 1, text: node.children[0].value, id: node.children[0].value})
          break
        case 2:
          flatToc.push({ level: 2, text: node.children[0].value, id: node.children[0].value})
          break
        case 3:
          flatToc.push({ level: 3, text: node.children[0].value, id: node.children[0].value})
          break
      }
    }
  })

  const tree: TocItem[] = []
  const parents: TocItem[] = []

  flatToc.forEach(item => {
    while (parents.length > 0 && parents[parents.length - 1].level >= item.level) {
      parents.pop()
    }
    if (parents.length === 0) {
      tree.push(item)
      parents.push(item)
    } else {
      const parent = parents[parents.length - 1]
      if (!parent.children) parent.children = []
      parent.children.push(item)
      parents.push(item)
    }
  })

  return tree
}
