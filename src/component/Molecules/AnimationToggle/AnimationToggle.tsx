import { MaterialSymbols } from "../../Atoms/MaterialSymbols/MaterialSymbols"

interface Props {
  isAnimating: boolean
  onToggle: () => void
}

export const AnimationToggle = ({ isAnimating, onToggle }: Props) => {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 rounded-sm hover:bg-surface-variant transition cursor-pointer"
      onClick={onToggle}
      aria-pressed={!isAnimating}
      aria-label={isAnimating ? "アニメーションを一時停止" : "アニメーションを再開"}
    >
      <MaterialSymbols>{isAnimating ? "pause" : "play_arrow"}</MaterialSymbols>
      {isAnimating ? "停止" : "再生"}
    </button>
  )
}
