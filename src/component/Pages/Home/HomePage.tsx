import { FirstView } from "../../Organisms/Home/FirstView"
import { Product } from "../../Organisms/Home/Product"
import { StageHistory } from "../../Organisms/Home/StageHistory"

export const HomePage = () => {
  return (
    <main className="max-w-6xl px-4 w-full m-auto">
      <FirstView />
      <Product />
      <StageHistory />
    </main>
  )
}
