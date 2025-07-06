import { FirstView } from "../../Organisms/Home/FirstView"
import { Product } from "../../Organisms/Home/Product"

export const HomePage = () => {
  return (
    <main className="max-w-6xl px-4 w-full m-auto">
      <FirstView />
      <Product />
    </main>
  )
}
