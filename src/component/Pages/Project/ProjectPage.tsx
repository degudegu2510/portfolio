import { MarkdownAsideContent } from "../../Organisms/MarkdownContent/MarkdownAsideContent"
import { MarkdownMainContent } from "../../Organisms/MarkdownContent/MarkdownMainContent"
import { useHead } from "../../../hooks/useHead"
import { useParams } from "react-router"
import { useMarkdown } from "../../../hooks/useMarkdown"
import { ProjectPagePath } from "../../../utils/Routes"

export const ProjectPage = () => {
  const { projectId = '' } = useParams()
  const { header } = useMarkdown(projectId, 'Project')

  useHead({
    title: `プロジェクト「${header?.title}」 | degudegu2510のポートフォリオ`,
    description: header?.description,
    url: ProjectPagePath(projectId),
    keywords: header?.keywords,
  });

  return (
    <div className="max-w-6xl px-4 py-16 m-auto grid grid-cols-[22rem_minmax(0,_1fr)] items-start gap-8 max-tablet:grid-cols-1 max-tablet:grid-rows-[min-content]">
      <MarkdownAsideContent slug={projectId} contentType="Project" />
      <MarkdownMainContent slug={projectId} contentType="Project" />
    </div>
  )
}
