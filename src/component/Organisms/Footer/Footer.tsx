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
    <footer className="flex flex-wrap gap-[8px_40px] items-center justify-between max-w-6xl px-4 py-6 w-full m-auto">
      <nav aria-label="フッター" className="flex gap-10">
        <button
          onClick={scrollToTop}
          className="cursor-pointer hover:decoration-l hover:underline underline-offset-4 whitespace-nowrap"
        >
          トップへ戻る
        </button>
        <ul className="flex gap-[8px_40px] border-l-1 border-medium-emphasis pl-10 flex-wrap">
          <li>
            <a href="https://x.com/degudegu2510" className="hover:underline underline-offset-4">X(Twitter)</a>
          </li>
          <li>
            <a href="https://qiita.com/degudegu2510" className="hover:underline underline-offset-4">Qiita</a>
          </li>
        </ul>
      </nav>
      <small className="body-1">&copy; 2025 出口 裕貴</small>
    </footer>
  )
}
