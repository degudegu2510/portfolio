
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

interface MicrolinkResponse {
  status: string
  data: {
    title?: string
    description?: string
    image?: { url?: string }
    url?: string
  }
}

async function populateLinkCard(card: HTMLElement): Promise<void> {
  const url = card.dataset.url
  if (!url) return

  try {
    const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`)
    const json: MicrolinkResponse = await res.json()
    if (json.status !== "success") return

    const { title, description, image } = json.data

    const inner = document.createElement("a")
    inner.href = url
    inner.target = "_blank"
    inner.rel = "noopener noreferrer"
    inner.className = "link-card-inner"

    const content = document.createElement("div")
    content.className = "link-card-content"

    if (title) {
      const titleEl = document.createElement("p")
      titleEl.className = "link-card-title"
      titleEl.textContent = title
      content.appendChild(titleEl)
    }

    if (description) {
      const descEl = document.createElement("p")
      descEl.className = "link-card-description"
      descEl.textContent = description
      content.appendChild(descEl)
    }

    const urlEl = document.createElement("span")
    urlEl.className = "link-card-url"
    try {
      urlEl.textContent = new URL(url).hostname
    } catch {
      urlEl.textContent = url
    }
    content.appendChild(urlEl)

    inner.appendChild(content)

    if (image?.url) {
      const img = document.createElement("img")
      img.src = image.url
      img.alt = ""
      img.className = "link-card-image"
      img.loading = "lazy"
      inner.appendChild(img)
    }

    card.replaceChildren(inner)
  } catch {
    // keep fallback link on fetch failure
  }
}

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

  useEffect(() => {
    if (!body || !articleRef.current) return
    const cards = articleRef.current.querySelectorAll<HTMLElement>(".link-card[data-url]")
    cards.forEach(card => { populateLinkCard(card) })
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
