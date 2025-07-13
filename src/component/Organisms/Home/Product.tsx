import { useId } from "react"
import { ProductCard } from "../../Molecules/ProductCard.tsx/ProductCard"
import { ProductList, ProductListItem } from "../../../utils/productList"

export const Product = () => {
  const id = useId()
  const productList: ProductListItem[] = ProductList()

  return (
    <section className="mt-16 py-16">
      <h2 id={id} className="heading-1">制作物</h2>
      <ul
        className="grid grid-cols-[repeat(auto-fill,minmax(352px,1fr))] gap-8 mt-8 max-mobile:grid-cols-1"
        aria-labelledby={id}
      >
        {productList.map((product, index) => (
          <ProductCard
            key={product.slug + index}
            title={product.title}
            thumbnail={product.thumbnail}
            slug={product.slug}
          />
        ))}
      </ul>
    </section>
  )
}
