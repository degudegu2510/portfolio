import { PostArticleList } from "../../Molecules/PostArticles/PostArticleList";
import { Pagination } from "../../Molecules/Pagination/Pagenation";
import { useSearchParams } from "react-router";
import { ArticlesPagePath } from "../../../utils/Routes";
import { useArticles } from "../../../hooks/useArticles";
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner";
import { ErrorMessage } from "../../Atoms/ErrorMessage/ErrorMessage";
import { useUserTotalPages } from "../../../hooks/useUserTotalPages";

export const ArticlesContent = () => {
  const ITEM_COUNT = 20;
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { articles, loading, error, refetch } = useArticles(currentPage, ITEM_COUNT);
  const { totalPages } = useUserTotalPages(ITEM_COUNT);

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
          <Pagination totalPage={totalPages} currentPage={currentPage} href={ArticlesPagePath()} className="mt-8"/>
        </>
      ) : (
        <div className={`flex flex-col items-center justify-center gap-4 p-8 backdrop-blur-[2px] backdrop-filter bg-surface-alpha rounded-lg mt-8`}>
          <p>記事がありません</p>
        </div>
      )}
    </section>
  );
};