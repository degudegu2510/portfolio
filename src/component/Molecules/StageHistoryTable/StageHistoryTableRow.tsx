import { MaterialSymbols } from "../../Atoms/MaterialSymbols/MaterialSymbols";
import { StageHistoryProps } from "../../../contents/StageHistory/StageHistory";

interface Props {
  data: StageHistoryProps
}

export const StageHistoryTableRow = ({ data }: Props) => {
  return (
    <tr key={data.event} className="border-b border-gray">
      <td className="border-none w-fit whitespace-nowrap pl-2 pr-4 py-4 font-bold max-tablet:pr-2">
        <time className="max-tablet:body-2">
          {data.date}
        </time>
        </td>
      <td className="border-none pl-4 pr-2 py-4 grid gap-x-8 gap-y-1 grid-cols-[minmax(0,_1fr)_auto] items-center max-tablet:grid-cols-1 max-tablet:pl-2">
        <a
          href={data.eventLink}
          className="subhead-2 font-bold truncate hover:underline underline-offset-4 max-tablet:body-1"
        >
          {data.event}
        </a>
        {data.presentationLink && (
          <a
            href={data.presentationLink}
            className="flex items-center hover:bg-surface p-2 pr-0.5 rounded"
          >
            発表資料
            <MaterialSymbols size={24}>chevron_right</MaterialSymbols>
          </a>
        )}
      </td>
    </tr>
  );
};