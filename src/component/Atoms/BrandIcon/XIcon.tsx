interface Props {
  ariaLabel: string
}

export const XIcon = ({ ariaLabel }: Props) => {
  return (
    <svg width="1.125rem" height="1.125rem" viewBox="0 0 24 24" fill="var(--color-x)" aria-label={ariaLabel}>
      <path d="M10.0973 13.5314L2.65183 22H4.41616L10.881 14.6468L16.0445 22H22L14.1918 10.8807L22 2H20.2356L13.4085 9.76523L7.95547 2H2L10.0977 13.5314H10.0973ZM12.5139 10.7827L13.305 11.8899L19.5998 20.7003H16.8898L11.8098 13.5901L11.0187 12.4828L4.41533 3.24057H7.1254L12.5139 10.7823V10.7827Z"/>
    </svg>
  )
}
