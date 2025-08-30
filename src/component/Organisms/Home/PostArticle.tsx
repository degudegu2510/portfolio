import { Link } from "react-router"
import { PostArticleList } from "../../Molecules/PostArticles/PostArticleList"
import { MaterialSymbols } from "../../Atoms/MaterialSymbols/MaterialSymbols"
import { ArticlesPagePath } from "../../../utils/Routes"

export const PostArticle = () => {

  return (
    <section className="py-16">
      <h2 className="heading-1">投稿記事</h2>
      <PostArticleList items={5} />
      <Link
        to={ArticlesPagePath()}
        className="flex items-center hover:bg-surface p-2 pr-0.5 rounded mt-6 w-fit"
      >
        もっと見る
        <MaterialSymbols size={24}>chevron_right</MaterialSymbols>
      </Link>
    </section>
  )
}