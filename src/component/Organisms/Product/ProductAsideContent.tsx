import { useParams } from "react-router"
import { getTocTree } from "../../../utils/TocItem"
import { TocList } from "../../Molecules/TocList/TocList"
import { useId } from "react"

export const ProductAsideContent = () => {
  const id = useId()
  const { productId } = useParams()
  const tocTree = productId ? getTocTree(productId) : []

  return (
    <aside className="sticky top-20">
      <nav className="grid gap-4 grid-cols-1" aria-label="目次">
        <h2 id={id} className="subhead-2">目次</h2>
        <TocList items={tocTree} ariaLabelledby={id}/>
      </nav>
    </aside>
  )
}
