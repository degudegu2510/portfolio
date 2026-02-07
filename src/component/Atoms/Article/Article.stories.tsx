import type { Meta, StoryObj } from "@storybook/react-vite";
import { Article } from "./Article";

const meta: Meta<typeof Article> = {
  title: "Atoms/Article",
  component: Article,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "記事のタイトル",
    },
    link: {
      control: "text",
      description: "記事へのリンクURL",
    },
    likes: {
      control: "number",
      description: "いいね数",
    },
    tags: {
      control: "object",
      description: "タグの配列",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "React 19の新機能まとめ",
    link: "https://example.com/article",
    likes: 42,
    tags: ["React", "TypeScript", "フロントエンド"],
  },
};

export const ManyTags: Story = {
  args: {
    title: "Tailwind CSS 4で変わったこと",
    link: "https://example.com/article-2",
    likes: 128,
    tags: ["CSS", "Tailwind", "デザイン", "フロントエンド", "Web"],
  },
};
