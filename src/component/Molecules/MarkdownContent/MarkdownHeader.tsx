
import { useParams } from "react-router"
import { useMarkdown } from "../../../hooks/useMarkdown"
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner"
import { ErrorMessage } from "../../Atoms/ErrorMessage/ErrorMessage"

export const MarkdownHeader = () => {
  const { productId } = useParams()
  const { header, loading, error } = useMarkdown(productId || '')

  if (loading) {
    return (
      <header>
        <LoadingSpinner message="ヘッダーを読み込み中..." className="mt-6" />
      </header>
    )
  }

  if (error || !header) {
    return (
      <header>
        <ErrorMessage message={error || "ヘッダーの読み込みに失敗しました"} showRetryButton={false} className="mt-6" />
      </header>
    )
  }

  return (
    <header>
      <h1 className="heading-1">{header.title}</h1>
      <img
        src={header.thumbnail}
        alt=""
        width={832}
        height={468}
        className="w-full rounded-lg mt-6 aspect-[16/9] object-cover border border-divider box-sizing-border"
      />
    </header>
  )
}