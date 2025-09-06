import { ArticlesInterface } from "../../../hooks/useArticles"
import { Article } from "../../Atoms/Article/Article"

export const PostArticleList = ({ items, className }: { items: ArticlesInterface[], className?: string }) => {
  return (
    <ul className={`grid gap-4 ${className}`}>
      {items.map(item => (
        <li key={item.url}>
          <Article
            title={item.title}
            link={item.url}
            likes={item.likes_count}
            tags={item.tags}
          />
        </li>
      ))}
    </ul>
  )
}
