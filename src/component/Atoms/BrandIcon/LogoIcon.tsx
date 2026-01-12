interface Props {
  ariaLabel: string
}

export const LogoIcon = ({ ariaLabel }: Props) => {
  return (
    <svg width="2rem" height="2rem" viewBox="0 0 48 48" fill="var(--color-high-emphasis)" aria-label={ariaLabel}>
      <path d="M10.7648 11.7824L7.5376 6.21918H24.5424C34.5952 6.21918 40.464 13.8736 40.464 23.8752C40.464 33.8768 34.5952 41.3776 24.5424 41.3776H10.7648V15.536H16.9904V35.8176H24.5424C30.9216 35.8176 34.1872 30.408 34.1872 23.8768C34.1872 17.3456 30.9216 11.784 24.5424 11.784H10.7648V11.7824Z"/>
    </svg>
  )
}
