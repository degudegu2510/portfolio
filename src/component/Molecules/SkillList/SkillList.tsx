import { skillsList } from "../../../contents/Skills/Skills"

interface SkillListProps {
  className?: string
}

export const SkillList = ({ className }: SkillListProps) => {

  return (
    <ul className={`grid grid-cols-[minmax(0,_1fr)] gap-2 ${className}`}>
      {skillsList.map( skillList => (
        <li className="backdrop-blur-[2px] backdrop-filter bg-surface-alpha rounded-lg border border-gray-variant p-[8px_16px]">
          <p className="body-2-bold text-medium-emphasis">{skillList.title}</p>
          <ul className="flex flex-wrap gap-x-5 mt-1">
            {skillList.skills.map(skill => (
              <li className="body-1-bold">{skill}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
