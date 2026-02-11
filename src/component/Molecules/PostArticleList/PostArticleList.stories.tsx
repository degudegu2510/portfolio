import type { Meta, StoryObj } from "@storybook/react-vite";
import { PostArticleList } from "./PostArticleList";

const meta: Meta<typeof PostArticleList> = {
  title: "Molecules/PostArticleList",
  component: PostArticleList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
      description: "記事一覧データ",
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
    items: [
      {
        title: "React 19の新機能まとめ",
        url: "https://example.com/article-1",
        likes_count: 42,
        tags: ["React", "TypeScript"],
      },
      {
        title: "Tailwind CSS 4で変わったこと",
        url: "https://example.com/article-2",
        likes_count: 128,
        tags: ["CSS", "Tailwind", "デザイン"],
      },
      {
        title: "アクセシビリティの基本",
        url: "https://example.com/article-3",
        likes_count: 56,
        tags: ["アクセシビリティ", "HTML"],
      },
    ],
  },
};

export const Single: Story = {
  args: {
    items: [
      {
        title: "Viteで始めるモダンフロントエンド開発",
        url: "https://example.com/article-1",
        likes_count: 200,
        tags: ["Vite", "JavaScript", "フロントエンド"],
      },
    ],
  },
};
