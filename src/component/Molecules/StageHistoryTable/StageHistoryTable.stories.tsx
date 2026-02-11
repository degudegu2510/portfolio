import type { Meta, StoryObj } from "@storybook/react-vite";
import { StageHistoryTable } from "./StageHistoryTable";

const meta: Meta<typeof StageHistoryTable> = {
  title: "Molecules/StageHistoryTable",
  component: StageHistoryTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    stageHistories: {
      control: "object",
      description: "登壇履歴データの配列",
    },
    className: {
      control: "text",
      description: "追加のCSSクラス",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stageHistories: [
      {
        date: "2025年8月7日",
        event: "Canly Tech Hub ~vol.1~ みんなで学ぼう！開発現場におけるMCPの活用事例LT会",
        eventLink: "https://connpass.com/event/361426/",
        presentationLink: "https://speakerdeck.com/example",
      },
      {
        date: "2024年9月7日",
        event: "アクセシビリティカンファレンス名古屋",
        eventLink: "https://example.com/event-2",
        presentationLink: "https://speakerdeck.com/example-2",
      },
      {
        date: "2024年5月10日",
        event: "Meguro.css #10 @ oRo",
        eventLink: "https://example.com/event-3",
      },
    ],
    className: "w-full",
  },
};

export const WithoutPresentationLinks: Story = {
  args: {
    stageHistories: [
      {
        date: "2023年12月9日",
        event: "DIST.38 「CSSな夜」",
        eventLink: "https://example.com/event-1",
      },
      {
        date: "2023年6月2日",
        event: "DIST.39 「みんなのFigma」",
        eventLink: "https://example.com/event-2",
      },
    ],
    className: "w-full",
  },
};
