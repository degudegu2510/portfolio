import { Link } from "react-router"
import { PostArticleList } from "../../Molecules/PostArticleList/PostArticleList"
import { MaterialSymbols } from "../../Atoms/MaterialSymbols/MaterialSymbols"
import { ArticlesPagePath } from "../../../utils/Routes"
import { useArticles } from "../../../hooks/useArticles"
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner"
import { ErrorMessage } from "../../Atoms/ErrorMessage/ErrorMessage"

export const PostArticle = () => {
  const ITEM_COUNT = 5
  const { articles, loading, error, refetch } = useArticles(1, ITEM_COUNT)

  return (
    <section className="py-16">
      <h2 className="heading-1">投稿記事</h2>
        {loading ? (
          <LoadingSpinner message="記事を読み込み中..." className="mt-8"/>
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} showRetryButton={false} className="mt-8" />
        ) : articles.length > 0 ? (
          <>
            <PostArticleList items={articles} className="mt-8"/>
          </>
        ) : (
          <div className={`flex flex-col items-center justify-center gap-4 p-8 backdrop-blur-[2px] backdrop-filter bg-surface-alpha rounded-lg border border-gray-variant mt-8`}>
            <p>記事がありません</p>
          </div>
        )}
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