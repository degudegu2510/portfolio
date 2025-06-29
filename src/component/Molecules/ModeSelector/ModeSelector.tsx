import { useEffect, useId, useRef, useState } from "react"
import { Dropdown, DropdownButton, DropdownList } from "../../Atoms/Dropdown"
import { MaterialSymbols } from "../../Atoms/MaterialSymbols/MaterialSymbols"

const MODES = [
  { key: "auto", label: "OS Default", icon: "contrast" },
  { key: "light", label: "Light Mode", icon: "light_mode" },
  { key: "dark", label: "Dark Mode", icon: "dark_mode" },
] as const

type Mode = typeof MODES[number]["key"]

const STORAGE_KEY = "theme-mode"

export const ModeSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === "light" || saved === "dark" || saved === "auto") return saved
    return "auto"
  })
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const id = useId()

  const setColorScheme = (mode: Mode) => {
    const root = document.documentElement
    if (mode === "auto") {
      root.style.colorScheme = "light dark"
    } else {
      root.style.colorScheme = mode
    }
  }

  useEffect(() => {
    setColorScheme(mode)
    localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  // 外クリックで閉じる
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: MouseEvent) => {
      if (!buttonRef.current?.parentElement?.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [isOpen])

  const current = MODES.find((m) => m.key === mode)!

  return (
    <div className="relative flex" onKeyDown={(e) => {
      if (e.key === "Escape") setIsOpen(false)
    }}>
      <DropdownButton
        ref={buttonRef}
        className="flex items-center gap-2 px-4 py-2 rounded-sm hover:bg-surface-variant transition cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <MaterialSymbols>{current.icon}</MaterialSymbols>
        {current.label}
      </DropdownButton>
      {isOpen && (
        <Dropdown
          id={id}
          className="absolute right-0 top-full mt-1 p-1 rounded-lg bg-surface elevation-1 w-[max-content] z-10"
          buttonRef={buttonRef}
          closeHandler={()=>{setIsOpen(false)}}
          aria-label="外観設定"
        >
          {MODES.map((m) => (
            <DropdownList key={m.key} role="option">
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-left rounded-sm hover:bg-surface-variant"
                onClick={() => {
                  setMode(m.key)
                  setIsOpen(false)
                  buttonRef.current?.focus()
                }}
                aria-selected={mode === m.key}
                tabIndex={0}
              >
                <MaterialSymbols>{m.icon}</MaterialSymbols>
                {m.label}
              </button>
            </DropdownList>
          ))}
        </Dropdown>
      )}
    </div>
  )
}
