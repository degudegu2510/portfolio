import { useId } from "react"
import { ProductCard, ProductCardProps } from "../../Molecules/ProductCard.tsx/ProductCard"

export const Product = () => {
  const id = useId()
  const productList: ProductCardProps[] = [
    {
      title: "ほげ",
      image: "./public/image-ogp.png"
    },{
      title: "hoge",
      image: "./public/image-ogp.png"
    },
    {
      title: "ほげ",
      image: "./public/image-ogp.png"
    },{
      title: "hoge",
      image: "./public/image-ogp.png"
    }
  ]

  return (
    <section className="mt-16 py-16">
      <h2 id={id} className="heading-1">制作物</h2>
      <ul
        className="grid grid-cols-[repeat(auto-fill,minmax(352px,1fr))] gap-8 mt-8 max-mobile:grid-cols-1"
        aria-labelledby={id}
      >
        {productList.map((product, index) => (
          <ProductCard
            key={product.title + index}
            title={product.title}
            image={product.image}
          />
        ))}
      </ul>
    </section>
  )
}
