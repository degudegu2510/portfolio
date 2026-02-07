import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoadingSpinner } from "./LoadingSpinner";

const meta: Meta<typeof LoadingSpinner> = {
  title: "Atoms/LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "text",
      description: "表示するメッセージ",
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
  args: {},
};

export const CustomMessage: Story = {
  args: {
    message: "データを取得しています...",
  },
};

export const LongMessage: Story = {
  args: {
    message: "コンテンツを準備しています。しばらくお待ちください...",
  },
};
