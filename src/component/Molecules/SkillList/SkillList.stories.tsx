import type { Meta, StoryObj } from "@storybook/react-vite";
import { SkillList } from "./SkillList";

const meta: Meta<typeof SkillList> = {
  title: "Molecules/SkillList",
  component: SkillList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "追加のCSSクラス",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
