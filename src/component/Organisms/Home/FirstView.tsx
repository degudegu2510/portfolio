import { QiitaIcon, XIcon } from "../../Atoms/BrandIcon"
import { Logo } from "../../Atoms/Logo/Logo"
import { ScrollDown } from "../../Atoms/ScrollDown/ScrollDown"

export const FirstView = () => {
  return (
    <section className="grid grid-cols-[minmax(0,_1fr)] grid-rows-[minmax(0,_1fr)_auto] h-[calc(100dvh-80px)] min-h-137 relative">
      <div className="grid gap-8 items-center content-center py-4">
        <h1>
          <Logo className="w-full max-w-170 h-auto" ariaLabel="Deguchi Hiroki Portfolio"/>
        </h1>
        <div className="text-medium-emphasis">
          <p>デザインとテクノロジーの架け橋を担うデザインテクノロジスト。</p>
          <p>デザインとテクノロジーの両面から誰にとっても心地よく使えるプロダクトづくりを大切にしています。</p>
          <ul className="flex gap-[0_16px] mt-4 body-2 flex-wrap">
            <li>#Design</li>
            <li>#PdM</li>
            <li>#UX</li>
            <li>#UI</li>
            <li>#Accessibility</li>
            <li>#Frontend</li>
          </ul>
        </div>
      </div>
      <div className="absolute right-0 bottom-4">
        <a href="https://x.com/degudegu2510" className="flex items-center justify-center p-3 hover:bg-surface rounded-lg">
          <XIcon ariaLabel="Xのプロフィール"/>
        </a>
        <a href="https://qiita.com/degudegu2510" className="flex items-center justify-center p-3 hover:bg-surface rounded-lg">
          <QiitaIcon ariaLabel="Qiitaのプロフィール" />
        </a>
      </div>
      <ScrollDown />
    </section>
  )
}
