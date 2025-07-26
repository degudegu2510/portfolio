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
  const idCounts: { [key: string]: number } = {}

  parseStructure.forEach((item) => {
    if (item.type === 'heading' && item.children[0] && "value" in item.children[0]) {
      const text = item.children[0].value
      let id = text
      
      // 重複するIDに連番を付ける
      if (idCounts[id]) {
        idCounts[id]++
        id = `${text}-${idCounts[id] - 1}`
      } else {
        idCounts[id] = 1
      }

      switch (item.depth) {
        case 1:
          flatToc.push({ level: 1, text: text, id: id})
          break
        case 2:
          flatToc.push({ level: 2, text: text, id: id})
          break
        case 3:
          flatToc.push({ level: 3, text: text, id: id})
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
