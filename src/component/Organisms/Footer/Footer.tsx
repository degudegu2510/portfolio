import { RefObject } from "react"

interface Props {
  logoRef: RefObject<HTMLAnchorElement | null>
}

export const Footer = ({ logoRef }: Props) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    logoRef.current?.focus()
  }

  return (
    <footer className="flex flex-wrap gap-x-10 gap-2 items-center justify-between max-w-6xl px-4 py-6 w-full m-auto">
      <nav aria-label="フッター" className="flex gap-x-10 gap-2 flex-wrap">
        <button
          onClick={scrollToTop}
          className="cursor-pointer hover:decoration-l hover:underline underline-offset-4 whitespace-nowrap"
        >
          トップへ戻る
        </button>
        <ul className="flex gap-x-10 gap-2 flex-wrap">
          <li>
            <a href="https://x.com/degudegu2510" className="hover:underline underline-offset-4">X(Twitter)</a>
          </li>
          <li>
            <a href="https://qiita.com/degudegu2510" className="hover:underline underline-offset-4">Qiita</a>
          </li>
          <li>
            <a href={import.meta.env.DEV ? "http://localhost:6006/" : "/portfolio/storybook/"} className="hover:underline underline-offset-4">Storybook</a>
          </li>
        </ul>
      </nav>
      <small className="body-1">&copy; 2025 出口 裕貴</small>
    </footer>
  )
}
