
import { useParams } from "react-router"
import { useMarkdown } from "../../../hooks/useMarkdown"
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner"
import { ErrorMessage } from "../../Atoms/ErrorMessage/ErrorMessage"

export const MarkdownBody = () => {
  const { productId } = useParams()
  const { body, loading, error } = useMarkdown(productId || '')

  if (loading) {
    return (
      <article className="mt-10">
        <LoadingSpinner message="コンテンツを読み込み中..." />
      </article>
    )
  }

  if (error || !body) {
    return (
      <article className="mt-10">
        <ErrorMessage message={error || "コンテンツの読み込みに失敗しました"} showRetryButton={false} />
      </article>
    )
  }

  return (
    <article
      className="mt-10 markdown-body"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  )
}

