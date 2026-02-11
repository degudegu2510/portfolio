import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductCard } from "./ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: "Molecules/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "プロダクト名",
    },
    thumbnail: {
      control: "text",
      description: "サムネイル画像のURL",
    },
    slug: {
      control: "text",
      description: "プロダクトのスラグ",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "ポートフォリオサイト",
    thumbnail: "https://placehold.co/352x198",
    slug: "portfolio",
  },
};
