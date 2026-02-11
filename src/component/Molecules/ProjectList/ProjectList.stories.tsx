import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProjectList } from "./ProjectList";

const meta: Meta<typeof ProjectList> = {
  title: "Molecules/ProjectList",
  component: ProjectList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    projects: {
      control: "object",
      description: "プロジェクト一覧データ",
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
    projects: [
      {
        labels: ["Qiita", "PdM"],
        title: "Qiita Advent Calendar 2025 プロジェクト",
        description: "新企画の立案、新機能/機能アップデートの企画/設計を担当した。",
        term: "2025年8月〜2026年1月",
        url: "https://example.com/project-1",
      },
      {
        labels: ["Qiita", "Frontend", "Accessibility", "UI"],
        title: "Qiitaダークモード導入",
        description: "Qiitaにダークモードを導入するため、カラーパレットの修正、カラートークンの設計、開発を担当した。",
        term: "2023年2月〜2024年2月",
        url: "https://example.com/project-2",
      },
      {
        labels: ["Qiita", "イベント"],
        title: "Qiita Bash",
        description: "Qiita Bashに関するイベント企画・集客・運営・配信",
        term: "2024年4月〜",
        url: "https://example.com/project-3",
      },
      {
        labels: ["Qiita", "PdM", "UI", "UX"],
        title: "AIサジェスト機能",
        description: "機能開発の企画/設計・プロジェクトマネジメント・UXの設計・UIデザインを担当した。",
        term: "2023年8月〜2023年11月",
        url: "https://example.com/project-4",
      },
    ],
  },
};

export const Single: Story = {
  args: {
    projects: [
      {
        labels: ["Qiita", "Accessibility"],
        title: "アクセシビリティ改善プロジェクト",
        description: "アクセシビリティに関する知識の浸透、人材育成、Qiitaのプロダクト改善を担当した。",
        term: "2024年4月〜",
        url: "https://example.com/project-1",
      },
    ],
  },
};
