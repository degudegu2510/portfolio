import { ProjectsContent } from "../../Organisms/Projects/ProjectsContent"
import { useHead } from "../../../hooks/useHead"
import { ProjectsPagePath } from "../../../utils/Routes";

export const ProjectsPage = () => {
  useHead({
    title: 'プロジェクト一覧 - degudegu2510のポートフォリオ',
    description: 'degudegu2510が関わったプロジェクト一覧ページです。',
    url: ProjectsPagePath(),
  });

  return (
    <main className="max-w-6xl px-4 w-full m-auto">
      <ProjectsContent />
    </main>
  )
}
