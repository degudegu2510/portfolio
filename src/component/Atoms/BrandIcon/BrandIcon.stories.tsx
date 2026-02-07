import type { Meta, StoryObj } from "@storybook/react-vite";
import { LogoIcon, QiitaIcon, XIcon } from "./index";

const LogoIconMeta: Meta<typeof LogoIcon> = {
  title: "Atoms/BrandIcon/LogoIcon",
  component: LogoIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    ariaLabel: {
      control: "text",
      description: "アクセシビリティ用のラベル",
    },
  },
};

export default LogoIconMeta;
type LogoIconStory = StoryObj<typeof LogoIconMeta>;

export const LogoIconDefault: LogoIconStory = {
  args: {
    ariaLabel: "Deguchi Hiroki",
  },
};

// QiitaIcon Stories
export const QiitaIconDefault: StoryObj<typeof QiitaIcon> = {
  render: (args) => <QiitaIcon {...args} />,
  args: {
    ariaLabel: "Qiita",
  },
};

// XIcon Stories
export const XIconDefault: StoryObj<typeof XIcon> = {
  render: (args) => <XIcon {...args} />,
  args: {
    ariaLabel: "X (Twitter)",
  },
};
