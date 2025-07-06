import { useParams } from "react-router"
import { Header } from "../../Organisms/Header/Header"

export const ProductPage = () => {
  const { productId } = useParams()
  return (
    <>
      <Header />
      <main className="max-w-6xl px-4 w-full m-auto">
        {productId} ProductPage
      </main>
    </>
  )
}
