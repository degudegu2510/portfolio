import { Link } from "react-router"
import { LogoIcon } from "../../Atoms/BrandIcon"
import { ModeSelector } from "../../Molecules/ModeSelector/ModeSelector"

export const Header = () => {
  return (
    <header className="flex items-center justify-between max-w-6xl p-4 sticky w-full top-0 m-auto z-10">
      <Link to="/">
        <LogoIcon ariaLabel="ホーム"/>
      </Link>
      <ModeSelector />
    </header>
  )
}
