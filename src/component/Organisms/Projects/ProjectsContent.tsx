import { Pagination } from "../../Molecules/Pagination/Pagenation";
import { useSearchParams } from "react-router";
import { ProjectsPagePath } from "../../../utils/Routes";
import { ProjectList } from "../../Molecules/ProjectList/ProjectList";
import { Projects } from "../../../contents/Project/Project";

export const ProjectsContent = () => {
  const ITEM_COUNT = 20
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;


  const startIndex = (currentPage - 1) * ITEM_COUNT;
  const endIndex = startIndex + ITEM_COUNT;
  const projects = Projects.slice(startIndex, endIndex);
  
  const totalPages = Math.ceil(Projects.length / ITEM_COUNT);

  return (
    <section className="py-16">
      <h2 className="heading-1">プロジェクト</h2>
      <ProjectList projects={projects} className="mt-8"/>
      {totalPages > 1 && (
        <Pagination totalPage={totalPages} currentPage={currentPage} href={ProjectsPagePath()} className="mt-8"/>
      )}
    </section>
  );
};