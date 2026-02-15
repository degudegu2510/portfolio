import type { Meta, StoryObj } from "@storybook/react-vite";
import { AnimationToggle } from "./AnimationToggle";

const meta: Meta<typeof AnimationToggle> = {
  title: "Molecules/AnimationToggle",
  component: AnimationToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playing: Story = {
  args: {
    isAnimating: true,
    onToggle: () => {},
  },
};

export const Paused: Story = {
  args: {
    isAnimating: false,
    onToggle: () => {},
  },
};
