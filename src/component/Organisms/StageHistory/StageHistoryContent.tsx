import { StageHistory } from "../../../contents/StageHistory/StageHistory";
import { StageHistoryTable } from "../../Molecules/StageHistoryTable/StageHistoryTable";

export const StageHistoryContent = () => {

  return (
    <section className="py-16">
      <h2 className="heading-1">登壇歴</h2>
      <StageHistoryTable className="mt-8" stageHistories={StageHistory} />
    </section>
  );
};