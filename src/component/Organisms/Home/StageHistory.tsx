import { useId } from "react"
import { StageHistoryTable } from "../../Molecules/StageHistoryTable/StageHistoryTable"
import { StageHistory as StageHistories } from "../../../contents/StageHistory/StageHistory";
import { Link } from "react-router"
import { MaterialSymbols } from "../../Atoms/MaterialSymbols/MaterialSymbols"
import { StageHistoryPagePath } from "../../../utils/Routes"

export const StageHistory = () => {
  const id = useId()
  const stageHistories = StageHistories.slice(0, 5)

  return (
    <section className="py-16">
      <h2 id={id} className="heading-1">登壇歴</h2>
      <StageHistoryTable 
        className="mt-8"
        aria-labelledby={id}
        stageHistories={stageHistories}
      />
      <Link
        to={StageHistoryPagePath()}
        className="flex items-center hover:bg-surface p-2 pr-0.5 rounded mt-6 w-fit"
      >
        もっと見る
        <MaterialSymbols size={24}>chevron_right</MaterialSymbols>
      </Link>
    </section>
  )
}