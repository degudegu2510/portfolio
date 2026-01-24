interface SkillListInterface {
  title: string
  skills: string[]
}

export const skillsList: SkillListInterface[] = [
  {
    title: "マネジメントスキル",
    skills: [
      "プロダクトマネジメント",
      "ピープルマネジメント",
    ],
  },
  {
    title: "デザインスキル",
    skills: [
      "UIデザイン",
      "UXデザイン",
      "Figma",
      "Illustrator",
      "Photoshop",
    ],
  },
  {
    title: "フロントエンドスキル",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "アクセシビリティ",
      "Git",
      "Next.js"
    ],
  },
  {
    title: "その他",
    skills: [
      "ChatGPT",
      "Cursor",
      "Copilot",
      "Claude Code",
      "Premiere Pro",
      "After Effects"
    ]
  }
]