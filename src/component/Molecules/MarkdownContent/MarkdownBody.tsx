
import { useParams } from "react-router"
import { getMarkdownBody } from "../../../utils/Markdown"
import { useEffect, useState } from "react"

export const MarkdownBody = () => {
  const { productId } = useParams()
  const contents = getMarkdownBody(productId ? productId : '')
  const [markdownBody, setMarkdownBody] = useState<string>()

  useEffect(() => {
    contents.then(content => {
      setMarkdownBody(content.value as string)
    })
  },[])

  return (
    <article
      className="mt-10 markdown-body"
      dangerouslySetInnerHTML={{ __html: markdownBody ?? "" }}
    />
  )
}

