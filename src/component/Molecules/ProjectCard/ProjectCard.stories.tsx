import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProjectCard } from "./ProjectCard";

const meta: Meta<typeof ProjectCard> = {
  title: "Molecules/ProjectCard",
  component: ProjectCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ul style={{ listStyle: "none", maxWidth: "400px" }}>
        <Story />
      </ul>
    ),
  ],
  argTypes: {
    project: {
      control: "object",
      description: "プロジェクトデータ",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    project: {
      labels: ["Qiita", "PdM"],
      title: "Qiita Advent Calendar 2025 プロジェクト",
      description: "新企画の立案、新機能/機能アップデートの企画/設計を担当した。",
      term: "2025年8月〜2026年1月",
      url: "https://example.com/project",
    },
  },
};

export const ManyLabels: Story = {
  args: {
    project: {
      labels: ["Qiita", "Frontend", "Accessibility", "UI"],
      title: "Qiitaダークモード導入",
      description: "Qiitaにダークモードを導入するため、カラーパレットの修正、カラートークンの設計、開発を担当した。",
      term: "2023年2月〜2024年2月",
      url: "https://example.com/project",
    },
  },
};
