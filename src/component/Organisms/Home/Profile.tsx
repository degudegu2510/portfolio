import { useEffect, useRef, useState } from "react"
import { MaterialSymbols } from "../../Atoms/MaterialSymbols/MaterialSymbols"
import { SkillList } from "../../Molecules/SkillList/SkillList"
import { profileVideo } from "./img"

export const Profile = () => {
  const [isPause, setIsPause] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isPause) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }, [isPause])

  return (
    <section className="mt-16 py-16">
      <h2 className="heading-1">プロフィール</h2>
      <div className="grid grid-cols-[auto_minmax(0,_1fr)] gap-8 mt-6 items-start max-tablet:grid-cols-1">
        <div className="grid grid-cols-[minmax(0,_1fr)] gap-2 justify-items-center w-fit">
          <video
            ref={videoRef}
            loop
            autoPlay
            muted
            playsInline
            width={352}
            height={352}
            className="rounded-lg bg-gray-variant w-full max-w-[352px] h-auto aspect-[1/1] max-mobile:max-w-full"
          >
            <source src={profileVideo} type="video/mp4"/>
          </video>
          <button
            className="flex items-center hover:bg-surface p-2 rounded w-fit"
            onClick={() => { setIsPause(!isPause) }}
          >
            {isPause ? (
              <>
                再生する
                <MaterialSymbols>play_circle</MaterialSymbols>
              </>
            ) : (
              <>
                停止する
                <MaterialSymbols>pause_circle</MaterialSymbols>
              </>
            )}
          </button>
        </div>
        <div>
          <p className="body-2-bold text-green">Deguchi Hiroki</p>
          <h3 className="heading-1 mt-1">出口 裕貴</h3>
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