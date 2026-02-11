import type { Meta, StoryObj } from "@storybook/react-vite";
import { TocList } from "./TocList";

const meta: Meta<typeof TocList> = {
  title: "Molecules/TocList",
  component: TocList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
      description: "目次アイテムの配列",
    },
    ariaLabelledby: {
      control: "text",
      description: "aria-labelledby属性",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        level: 2,
        text: "はじめに",
        id: "introduction",
      },
      {
        level: 2,
        text: "セットアップ",
        id: "setup",
        children: [
          {
            level: 3,
            text: "インストール",
            id: "installation",
          },
          {
            level: 3,
            text: "設定",
            id: "configuration",
          },
        ],
      },
      {
        level: 2,
        text: "使い方",
        id: "usage",
      },
      {
        level: 2,
        text: "まとめ",
        id: "conclusion",
      },
    ],
  },
};

export const Flat: Story = {
  args: {
    items: [
      { level: 2, text: "概要", id: "overview" },
      { level: 2, text: "詳細", id: "details" },
      { level: 2, text: "参考", id: "references" },
    ],
  },
};
