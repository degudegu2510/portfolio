import { FirstView } from "../../Organisms/Home/FirstView"
import { PostArticle } from "../../Organisms/Home/PostArticle"
import { Product } from "../../Organisms/Home/Product"
import { Project } from "../../Organisms/Home/Project"
import { StageHistory } from "../../Organisms/Home/StageHistory"

export const HomePage = () => {
  return (
    <main className="max-w-6xl px-4 w-full m-auto">
      <FirstView />
      <Product />
      <StageHistory />
      <PostArticle />
      <Project />
    </main>
  )
}
