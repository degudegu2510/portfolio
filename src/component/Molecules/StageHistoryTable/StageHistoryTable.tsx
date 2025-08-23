import { TableHTMLAttributes } from "react";
import { MaterialSymbols } from "../../Atoms/MaterialSymbols/MaterialSymbols";
import { StageHistory } from "../../../contents/StageHistory/StageHistory";

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
          <tr key={data.event} className="border-b border-gray">
            <td className="border-none w-fit whitespace-nowrap pl-2 pr-4 py-4 font-bold max-tablet:pr-2">
              <time className="max-tablet:body-2">
                {data.date}
              </time>
              </td>
            <td className="border-none pl-4 pr-2 py-4 grid gap-[4px_32px] grid-cols-[minmax(0,_1fr)_auto] items-center max-tablet:grid-cols-1 max-tablet:pl-2">
              <a
                href={data.eventLink}
                className="subhead-2 font-bold truncate hover:underline underline-offset-4 max-tablet:body-1"
              >
                {data.event}
              </a>
              <a
                href={data.presentationLink}
                className="flex items-center hover:bg-surface p-2 pr-0.5 rounded"
              >
                発表資料
                <MaterialSymbols size={24}>chevron_right</MaterialSymbols>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};