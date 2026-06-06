
import { useEffect, useRef } from "react"
import { useParams } from "react-router"
import mermaid from "mermaid"
import { useMarkdown } from "../../../hooks/useMarkdown"
import { LoadingSpinner } from "../../Atoms/LoadingSpinner/LoadingSpinner"
import { ErrorMessage } from "../../Atoms/ErrorMessage/ErrorMessage"

const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
mermaid.initialize({
  startOnLoad: false,
  theme: isDark ? "dark" : "neutral",
})

export const MarkdownBody = () => {
  const { productId } = useParams()
  const { body, loading, error } = useMarkdown(productId || '')
  const articleRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (body && articleRef.current) {
      const nodes = articleRef.current.querySelectorAll<HTMLElement>(".mermaid")
      if (nodes.length > 0) {
        mermaid.run({ nodes: Array.from(nodes) })
      }
    }
  }, [body])

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
      ref={articleRef}
      className="mt-10 markdown-body"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  )
}
