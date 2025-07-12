import { TocItem } from "../../../utils/TocItem"

interface Props {
  items: TocItem[]
  ariaLabelledby?: string 
}

export const TocList = ({
  items,
  ariaLabelledby
}: Props) => {
  return (
    <ul aria-labelledby={ariaLabelledby}>
      {items.map(item => (
        <li key={item.id} className="grid grid-cols-1">
          <a
            href={`#${item.id}`}
            className="py-2 pl-3 pr-2 body-1-dense border-l-1 border-gray rounded-r-sm hover:bg-surface-variant"
          >
            {item.text}
          </a>
          {item.children && item.children.length > 0 && (
            <TocList items={item.children} />
          )}
        </li>
      ))}
    </ul>
  )
}
