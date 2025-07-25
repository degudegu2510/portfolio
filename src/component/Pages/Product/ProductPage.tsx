import { ProductAsideContent } from "../../Organisms/Product/ProductAsideContent"
import { ProductMainContent } from "../../Organisms/Product/ProductMainContent"

export const ProductPage = () => {
  return (
    <div className="max-w-6xl px-4 py-16 m-auto grid grid-cols-[256px_minmax(0,_1fr)] items-start gap-8 min-h-[calc(100dvh_-_154px)] max-tablet:grid-cols-1 max-tablet:grid-rows-[min-content]">
      <ProductAsideContent />
      <ProductMainContent />
    </div>
  )
}
