import { StageHistoryContent } from "../../Organisms/StageHistory/StageHistoryContent"
import { useHead } from "../../../hooks/useHead"
import { StageHistoryPagePath } from "../../../utils/Routes";

export const StageHistoryPage = () => {
  useHead({
    title: '登壇歴一覧 - degudegu2510のポートフォリオ',
    description: 'degudegu2510の登壇歴一覧ページです。',
    url: StageHistoryPagePath(),
  });

  return (
    <main className="max-w-6xl px-4 w-full m-auto">
      <StageHistoryContent />
    </main>
  )
}
