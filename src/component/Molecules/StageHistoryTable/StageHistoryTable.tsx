import { TableHTMLAttributes } from "react";
import { StageHistory } from "../../../contents/StageHistory/StageHistory";
import { StageHistoryTableRow } from "./StageHistoryTableRow";

interface Props extends TableHTMLAttributes<HTMLTableElement> {}


export const StageHistoryTable = ({ ...props }: Props) => {
  return (
    <table {...props}>
      <thead>
        <tr className="text-left border-b border-gray">
          <th className="font-bold body-2 border-none pl-2 pr-4 pb-1 max-tablet:pr-2">日付</th>
          <th className="font-bold body-2 border-none pl-4 pr-2 pb-1 w-full max-tablet:pl-2">イベント名</th>
        </tr>
      </thead>
      <tbody>
        {StageHistory.map(data => (
          <StageHistoryTableRow data={data} key={data.date} />
        ))}
      </tbody>
    </table>
  );
};