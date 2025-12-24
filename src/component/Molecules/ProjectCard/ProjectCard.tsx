import { ProjectInterface } from "../../../contents/Project/Project"

interface ProjectCardProps {
  project: ProjectInterface
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <li className="rounded-lg bg-surface-alpha backdrop-blur-[2px] backdrop-filter border border-gray-variant">
      <a href={project.url} className="p-4 group grid"  target="_blank">
        <ul className="flex gap-2 flex-wrap">
          {project.labels.map(label => (
            <li
              key={label}
              className="body-2-bold-dense bg-green text-on-container flex rounded-2xl px-3 py-0.5 w-fit"
            >
              {label}
            </li>
          ))}
        </ul>
        <h3 className="subhead-2 mt-2.5 group-hover:underline underline-offset-4">{project.title}</h3>
        <p className="mt-2">{project.description}</p>
        <p className="body-3 text-medium-emphasis mt-2">{project.term}</p>
      </a>
    </li>
  )
}
