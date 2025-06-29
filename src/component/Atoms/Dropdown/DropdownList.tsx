import React from "react"

interface Props extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
  className?: string
}
export const DropdownList = ({ children, className, ...props }: Props) => {
  return (
    <li className={className} {...props}>
      {children}
    </li>
  )
}
