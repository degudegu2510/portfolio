import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorMessage } from "./ErrorMessage";

const meta: Meta<typeof ErrorMessage> = {
  title: "Atoms/ErrorMessage",
  component: ErrorMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "text",
      description: "エラーメッセージ",
    },
    showRetryButton: {
      control: "boolean",
      description: "再試行ボタンを表示するか",
    },
    onRetry: {
      action: "retry clicked",
      description: "再試行時のコールバック",
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
    message: "データの読み込みに失敗しました",
  },
};

export const WithoutRetryButton: Story = {
  args: {
    message: "エラーが発生しました",
    showRetryButton: false,
  },
};

export const NetworkError: Story = {
  args: {
    message: "ネットワークエラーが発生しました。接続を確認してください。",
  },
};

export const NotFoundError: Story = {
  args: {
    message: "ページが見つかりませんでした",
    showRetryButton: false,
  },
};
