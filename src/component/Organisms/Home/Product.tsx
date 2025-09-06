import { useId } from "react"
import { ProductCard } from "../../Molecules/ProductCard.tsx/ProductCard"
import { useProductList } from "../../../hooks/useProductList"
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner"
import { ErrorMessage } from "../../Atoms/ErrorMessage/ErrorMessage"

export const Product = () => {
  const id = useId()
  const { products, loading, error } = useProductList()

  return (
    <section className="mt-16 py-16">
      <h2 id={id} className="heading-1">制作物</h2>
      {loading ? (
        <LoadingSpinner message="制作物を読み込み中..." className="mt-8" />
      ) : error ? (
        <ErrorMessage message={error} showRetryButton={false} className="mt-8" />
      ) : products.length > 0 ? (
        <ul
          className="grid grid-cols-[repeat(auto-fill,minmax(352px,1fr))] gap-8 mt-8 max-mobile:grid-cols-1"
          aria-labelledby={id}
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.slug + index}
              title={product.title}
              thumbnail={product.thumbnail}
              slug={product.slug}
            />
          ))}
        </ul>
      ) : (
        <div className={`flex flex-col items-center justify-center gap-4 p-8 backdrop-blur-[2px] backdrop-filter bg-surface-alpha rounded-lg mt-8`}>
          <p>制作物がありません</p>
        </div>
      )}
    </section>
  )
}
