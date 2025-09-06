import { Link } from "react-router"
import { MaterialSymbols } from "../../Atoms/MaterialSymbols/MaterialSymbols"
import { ProjectsPagePath } from "../../../utils/Routes"
import { ProjectList } from "../../Molecules/ProjectList/ProjectList"
import { Projects } from "../../../contents/Project/Project"

export const Project = () => {
  const projects = Projects.slice(0, 6)
  return (
    <section className="py-16">
      <h2 className="heading-1">プロジェクト</h2>
      <ProjectList projects={projects} className="mt-8" />
      <Link
        to={ProjectsPagePath()}
        className="flex items-center hover:bg-surface p-2 pr-0.5 rounded mt-6 w-fit"
      >
        もっと見る
        <MaterialSymbols size={24}>chevron_right</MaterialSymbols>
      </Link>
    </section>
  )
}