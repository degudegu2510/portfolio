export interface ProjectInterface {
  title: string,
  description: string,
  term: string,
  url: string,
}

export const Projects: ProjectInterface[] = [
  {
    title: "Sample Project",
    description: "サンプルプロジェクトです。",
    term: "2023年3月〜2023年12月",
    url: "/sample",
  },
  {
    title: "Sample Hoge Project",
    description: "サンプルホゲプロジェクトです。",
    term: "2023年3月〜2023年12月",
    url: "/sample",
  }
];
