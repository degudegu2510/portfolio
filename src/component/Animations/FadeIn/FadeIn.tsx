import { useScrollAnimation } from "../../../hooks/useScrollAnimation"

type Props = {
  as?: keyof HTMLElementTagNameMap
  children: React.ReactNode
  className?: string
  translate?: boolean
}

export const FadeIn = ({ as: Tag = "div", children, className = "", translate = true }: Props) => {
  const { ref, isInView } = useScrollAnimation<HTMLElement>()
  const Component = Tag as React.ElementType

  return (
    <Component
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isInView ? `opacity-100 ${translate ? "translate-y-0" : ""}` : `opacity-0 ${translate ? "translate-y-28" : ""}`} ${className}`}
    >
      {children}
    </Component>
  )
}
