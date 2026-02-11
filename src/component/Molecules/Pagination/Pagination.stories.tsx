import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "./Pagenation";

const meta: Meta<typeof Pagination> = {
  title: "Molecules/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    totalPage: {
      control: "number",
      description: "総ページ数",
    },
    currentPage: {
      control: "number",
      description: "現在のページ番号",
    },
    href: {
      control: "text",
      description: "ページネーションのベースURL",
    },
    className: {
      control: "text",
      description: "追加のCSSクラス",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    totalPage: 10,
    currentPage: 1,
    href: "/posts",
  },
};

export const MiddlePage: Story = {
  args: {
    totalPage: 10,
    currentPage: 5,
    href: "/posts",
  },
};

export const LastPage: Story = {
  args: {
    totalPage: 10,
    currentPage: 10,
    href: "/posts",
  },
};

export const FewPages: Story = {
  args: {
    totalPage: 3,
    currentPage: 2,
    href: "/posts",
  },
};

export const SinglePage: Story = {
  args: {
    totalPage: 1,
    currentPage: 1,
    href: "/posts",
  },
};
