import { ArticlesContent } from "../../Organisms/Articles/ArticlesContent"
import { useHead } from "../../../hooks/useHead"
import { ArticlesPagePath } from "../../../utils/Routes";

export const ArticlesPage = () => {
  useHead({
    title: '記事一覧 - degudegu2510のポートフォリオ',
    description: 'degudegu2510が書いた記事の一覧ページです。UI・フロントエンド周りの技術記事を公開しています。',
    url: ArticlesPagePath(),
  });

  return (
    <main className="max-w-6xl px-4 w-full m-auto">
      <ArticlesContent />
    </main>
  )
}
