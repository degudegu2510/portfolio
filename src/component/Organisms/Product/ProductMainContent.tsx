import { MarkdownBody } from "../../Molecules/MarkdownContent/MarkdownBody"
import { MarkdownHeader } from "../../Molecules/MarkdownContent/MarkdownHeader"

export const ProductMainContent = () => {
  return (
    <main>
      <article>
        <MarkdownHeader />
        <MarkdownBody />
      </article>
    </main>
  )
}
