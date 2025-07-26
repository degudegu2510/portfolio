
import { useParams } from "react-router"
import { getMarkdownHeader } from "../../../utils/Markdown"

export const MarkdownHeader = () => {
  const { productId } = useParams()
  const date = getMarkdownHeader(productId ? productId : '')
  return (
    <header>
      <h1 className="heading-1">{date.title}</h1>
      <img
        src={date.thumbnail}
        alt=""
        width={832}
        height={468}
        className="w-full rounded-lg mt-6 aspect-[16/9] object-cover border border-divider box-sizing-border"
      />
    </header>
  )
}