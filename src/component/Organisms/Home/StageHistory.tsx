import { useId } from "react"
import { StageHistoryTable } from "../../Molecules/StageHistoryTable/StageHistoryTable"

export const StageHistory = () => {
  const id = useId()

  return (
    <section className="py-16">
      <h2 id={id} className="heading-1">登壇歴</h2>
      <StageHistoryTable 
        className="mt-8 border-none"
        aria-labelledby={id}
      />
    </section>
  )
}