import { Pagination } from "../../Molecules/Pagination/Pagenation";
import { useSearchParams } from "react-router";
import { StageHistory } from "../../../contents/StageHistory/StageHistory";
import { StageHistoryTable } from "../../Molecules/StageHistoryTable/StageHistoryTable";
import { StageHistoryPagePath } from "../../../utils/Routes";

export const StageHistoryContent = () => {
  const ITEM_COUNT = 20
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const startIndex = (currentPage - 1) * ITEM_COUNT;
  const endIndex = startIndex + ITEM_COUNT;
  const StageHistories = StageHistory.slice(startIndex, endIndex);
  
  const totalPages = Math.ceil(StageHistory.length / ITEM_COUNT);

  return (
    <section className="py-16">
      <h2 className="heading-1">登壇歴</h2>
      <StageHistoryTable className="mt-8" stageHistories={StageHistories} />
      {totalPages > 1 && (
        <Pagination totalPage={totalPages} currentPage={currentPage} href={StageHistoryPagePath()} className="mt-8"/>
      )}
    </section>
  );
};