import { FirstView } from "../../Organisms/Home/FirstView"
import { PostArticle } from "../../Organisms/Home/PostArticle"
import { Product } from "../../Organisms/Home/Product"
import { Profile } from "../../Organisms/Home/Profile"
import { Project } from "../../Organisms/Home/Project"
import { StageHistory } from "../../Organisms/Home/StageHistory"
import { useHead } from "../../../hooks/useHead"
import { HomePagePath } from "../../../utils/Routes"

export const HomePage = () => {
  useHead({
    title: 'degudegu2510のポートフォリオ',
    description: 'degudegu2510のポートフォリオサイト。degudegu2510は、Qiita株式会社デザインGのマネージャーで、Qiitaのプロダクトマネジメントをしている。UI・フロントエンド周りのことを発信しているデザインテクノロジスト。',
    url: HomePagePath(),
  });

  return (
    <main className="max-w-6xl px-4 w-full m-auto">
      <FirstView />
      <Profile />
      <Product />
      <Project />
      <StageHistory />
      <PostArticle />
    </main>
  )
}
