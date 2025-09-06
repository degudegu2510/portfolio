import { ProjectInterface } from "../../../contents/Project/Project"
import { ProjectCard } from "../ProjectCard/ProjectCard"

interface ProjectListProps {
  projects: ProjectInterface[]
  className?: string
}

export const ProjectList = ({ className, projects }: ProjectListProps) => {
  return (
    <ul className={`grid grid-cols-2 gap-8 ${className}`}>
      {projects.map(project => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </ul>
  )
}
