import { SkillList } from "../../Molecules/SkillList/SkillList"
import { profileImage } from "./img"

export const Profile = () => {
  return (
    <section className="mt-16 py-16">
      <h2 className="heading-1">プロフィール</h2>
      <div className="grid grid-cols-[auto_minmax(0,_1fr)] gap-8 mt-6 max-tablet:grid-cols-1">
        <img
          width={352}
          height={352}
          src={profileImage}
          className="rounded-lg bg-gray-variant w-full max-w-[352px] h-auto aspect-[1/1]"
        />
        <div>
          <p className="body-1-bold text-medium-emphasis">Deguchi Hiroki</p>
          <p className="heading-1 mt-1">出口 裕貴</p>
          <p className="mt-6">デザインとテクノロジーの架け橋を担うデザインテクノロジスト。</p>
          <p>デザインとテクノロジーの両面から誰にとっても心地よく使えるプロダクトづくりを大切にします。</p>
          <p className="mt-4">現在は、Qiita 株式会社プロダクト開発部 デザインG マネージャーとして、</p>
          <p>Qiitaのプロダクトマネジメントとデザイナーの4名のマネジメントを行っています。</p>
          <p className="mt-6 body-2-bold">できること</p>
          <SkillList className="mt-2" />
        </div>
      </div>
    </section>
  )

}