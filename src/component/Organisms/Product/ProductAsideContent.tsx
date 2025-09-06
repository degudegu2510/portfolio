import { useParams } from "react-router"
import { useToc } from "../../../hooks/useToc"
import { TocList } from "../../Molecules/TocList/TocList"
import { useId } from "react"
import { MaterialSymbols } from "../../Atoms/MaterialSymbols/MaterialSymbols"
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner"
import { ErrorMessage } from "../../Atoms/ErrorMessage/ErrorMessage"

export const ProductAsideContent = () => {
  const id = useId()
  const { productId } = useParams()
  const { toc, loading, error } = useToc(productId || '')

  return (
    <aside className="sticky top-20 max-tablet:relative max-tablet:top-0">
      <nav className="grid gap-4 grid-cols-1" aria-label="目次">
        <h2 id={id} className="subhead-2 flex gap-1 items-center">
          <MaterialSymbols className="hidden max-tablet:block">toc</MaterialSymbols>
          目次
        </h2>
        {loading ? (
          <LoadingSpinner message="目次を生成中..." />
        ) : error ? (
          <ErrorMessage message={error} showRetryButton={false} />
        ) : (
          <TocList items={toc} ariaLabelledby={id}/>
        )}
      </nav>
    </aside>
  )
}
