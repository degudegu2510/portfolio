import { StageHistoryProps } from "../../../contents/StageHistory/StageHistory";
import { StageHistoryTableRow } from "./StageHistoryTableRow";

interface Props {
  stageHistories: StageHistoryProps[]
  className: string
}


export const StageHistoryTable = ({ stageHistories, className }: Props) => {
  return (
    <table className={`border-none ${className}`}>
      <thead>
        <tr className="text-left border-b border-gray">
          <th className="font-bold body-2 border-none pl-2 pr-4 pb-1 max-tablet:pr-2">日付</th>
          <th className="font-bold body-2 border-none pl-4 pr-2 pb-1 w-full max-tablet:pl-2">イベント名</th>
        </tr>
      </thead>
      <tbody>
        {stageHistories.map(data => (
          <StageHistoryTableRow data={data} key={data.date} />
        ))}
      </tbody>
    </table>
  );
};