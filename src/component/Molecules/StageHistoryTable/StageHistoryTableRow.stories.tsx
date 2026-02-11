import type { Meta, StoryObj } from "@storybook/react-vite";
import { StageHistoryTableRow } from "./StageHistoryTableRow";

const meta: Meta<typeof StageHistoryTableRow> = {
  title: "Molecules/StageHistoryTableRow",
  component: StageHistoryTableRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <table>
        <tbody>
          <Story />
        </tbody>
      </table>
    ),
  ],
  argTypes: {
    data: {
      control: "object",
      description: "登壇履歴データ",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPresentationLink: Story = {
  args: {
    data: {
      date: "2025年8月7日",
      event: "Canly Tech Hub ~vol.1~ みんなで学ぼう！開発現場におけるMCPの活用事例LT会",
      eventLink: "https://connpass.com/event/361426/",
      presentationLink: "https://speakerdeck.com/example",
    },
  },
};

export const WithoutPresentationLink: Story = {
  args: {
    data: {
      date: "2024年5月10日",
      event: "Meguro.css #10 @ oRo",
      eventLink: "https://example.com/event",
    },
  },
};
