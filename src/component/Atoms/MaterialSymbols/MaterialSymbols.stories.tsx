import type { Meta, StoryObj } from "@storybook/react-vite";
import { MaterialSymbols } from "./MaterialSymbols";

const meta: Meta<typeof MaterialSymbols> = {
  title: "Atoms/MaterialSymbols",
  component: MaterialSymbols,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "アイコン名（Material Symbols Rounded）",
    },
    fill: {
      control: "boolean",
      description: "塗りつぶしスタイル",
    },
    size: {
      control: "select",
      options: [12, 14, 16, 20, 24, 28, 32, 48],
      description: "アイコンサイズ",
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
    children: "home",
  },
};

export const Filled: Story = {
  args: {
    children: "favorite",
    fill: true,
  },
};

export const Outlined: Story = {
  args: {
    children: "favorite",
    fill: false,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {([12, 14, 16, 20, 24, 28, 32, 48] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <MaterialSymbols size={size}>star</MaterialSymbols>
          <span className="text-xs text-gray-dim">{size}px</span>
        </div>
      ))}
    </div>
  ),
};
