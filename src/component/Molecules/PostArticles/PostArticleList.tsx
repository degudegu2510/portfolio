import { useEffect, useState } from "react";
import { ArticleListInterface, getArticleList } from "../../../utils/ArticleList"
import { Article } from "../../Atoms/Article/Article"

export const PostArticleList = ({ items }: { items?: number }) => {
  const [articleList, setArticleList] = useState<ArticleListInterface[]>([])

  useEffect(() => {
    getArticleList(1, items).then(setArticleList)
  }, [items])

  return (
    <ul className="mt-8 grid gap-4">
      {articleList.map(article => (
        <li key={article.url}>
          <Article
            title={article.title}
            link={article.url}
            likes={article.likes_count}
            tags={article.tags}
          />
        </li>
      ))}
    </ul>
  )
}
