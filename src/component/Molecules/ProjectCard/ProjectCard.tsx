import { ProjectInterface } from "../../../contents/Project/Project"

interface ProjectCardProps {
  project: ProjectInterface
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <li className="p-4 rounded-lg bg-surface-alpha backdrop-blur-[2px] backdrop-filter border border-gray-variant">
        <h3 className="subhead-2">{project.title}</h3>
        <p className="mt-2">{project.description}</p>
        <p className="body-3 text-medium-emphasis mt-2">{project.term}</p>
    </li>
  )
}
