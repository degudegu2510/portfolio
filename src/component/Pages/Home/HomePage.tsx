import { Header } from "../../Organisms/Header/Header"
import { FirstView } from "../../Organisms/Home/FirstView"

export const HomePage = () => {
  return (
    <>
      <Header />
      <main className="max-w-6xl px-4 w-full m-auto">
        <FirstView />
      </main>
    </>
  )
}
