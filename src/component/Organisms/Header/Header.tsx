import { Link } from "react-router"
import { LogoIcon } from "../../Atoms/BrandIcon"
import { AnimationToggle } from "../../Molecules/AnimationToggle/AnimationToggle"
import { ModeSelector } from "../../Molecules/ModeSelector/ModeSelector"
import { Ref } from "react"
import { HomePagePath } from "../../../utils/Routes"

interface Props {
  logoRef: Ref<HTMLAnchorElement>
  isAnimating: boolean
  onAnimationToggle: () => void
}

export const Header = ({ logoRef, isAnimating, onAnimationToggle }: Props) => {
  return (
    <header className="flex items-center justify-between max-w-6xl p-4 sticky w-full top-0 m-auto z-10">
      <Link to={HomePagePath()} ref={logoRef}>
        <LogoIcon ariaLabel="ホーム"/>
      </Link>
      <div className="flex items-center">
        <ModeSelector />
        <AnimationToggle isAnimating={isAnimating} onToggle={onAnimationToggle} />
      </div>
    </header>
  )
}
