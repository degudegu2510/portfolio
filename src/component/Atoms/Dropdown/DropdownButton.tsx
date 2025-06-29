import React from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  ref?: React.Ref<HTMLButtonElement>
}

export function DropdownButton({ children, className, ref, ...props }: Props) {
  return (
    <button className={className} ref={ref} {...props}>
      {children}
    </button>
  )
}
