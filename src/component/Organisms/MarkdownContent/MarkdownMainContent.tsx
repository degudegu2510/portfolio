import { MarkdownBody } from "../../Molecules/MarkdownContent/MarkdownBody"
import { MarkdownHeader } from "../../Molecules/MarkdownContent/MarkdownHeader"
import { ContentType } from "../../../utils/markdownFiles"

interface MarkdownMainContentProps {
  slug: string
  contentType: ContentType
}

export const MarkdownMainContent = ({ slug, contentType }: MarkdownMainContentProps) => {
  return (
    <main>
      <article>
        <MarkdownHeader slug={slug} contentType={contentType} />
        <MarkdownBody slug={slug} contentType={contentType} />
      </article>
    </main>
  )
}
