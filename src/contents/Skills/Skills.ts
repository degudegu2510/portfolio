interface SkillListInterface {
  title: string
  skills: string[]
}

export const skillsList: SkillListInterface[] = [
  {
    title: "マネジメントスキル",
    skills: [
      "プロジェクトマネジメント",
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
      "Git"
    ],
  },
  {
    title: "その他",
    skills: [
      "ChatGPT",
      "Cursor",
      "Copilot",
      "Premiere Pro",
      "After Effects"
    ]
  }
]