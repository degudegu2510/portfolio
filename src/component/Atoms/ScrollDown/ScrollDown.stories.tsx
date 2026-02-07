import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollDown } from "./ScrollDown";

const meta: Meta<typeof ScrollDown> = {
  title: "Atoms/ScrollDown",
  component: ScrollDown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
