import type { Meta, StoryObj } from "@storybook/react-vite";
import { ModeSelector } from "./ModeSelector";

const meta: Meta<typeof ModeSelector> = {
  title: "Molecules/ModeSelector",
  component: ModeSelector,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
