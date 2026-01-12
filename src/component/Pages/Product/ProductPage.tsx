import { ProductAsideContent } from "../../Organisms/Product/ProductAsideContent"
import { ProductMainContent } from "../../Organisms/Product/ProductMainContent"
import { useHead } from "../../../hooks/useHead"
import { useParams } from "react-router"
import { useMarkdown } from "../../../hooks/useMarkdown"
import { ProductPagePath } from "../../../utils/Routes"

export const ProductPage = () => {
  const { productId } = useParams()
  const { header } = useMarkdown(productId || '')

  useHead({
    title: `制作物「${header?.title}」 | degudegu2510のポートフォリオ`,
    description: header?.description,
    url: ProductPagePath(productId || ''),
    ogp: header?.thumbnail,
    keywords: header?.keywords,
  });

  return (
    <div className="max-w-6xl px-4 py-16 m-auto grid grid-cols-[22rem_minmax(0,_1fr)] items-start gap-8 max-tablet:grid-cols-1 max-tablet:grid-rows-[min-content]">
      <ProductAsideContent />
      <ProductMainContent />
    </div>
  )
}
