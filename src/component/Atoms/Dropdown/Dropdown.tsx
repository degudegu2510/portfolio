import React, { useRef, useEffect, useState } from "react"

interface Props {
  children: React.ReactNode
  className?: string
  buttonRef?: React.RefObject<HTMLButtonElement | null>
  closeHandler: () => void
  role?: string
  id: string
  ariaLabel: string
}

export const Dropdown = ({
  children,
  className,
  buttonRef,
  closeHandler,
  role = "listbox",
  id,
  ariaLabel
}: Props) => {
  const ulRef = useRef<HTMLUListElement>(null)
  const [focusIndex, setFocusIndex] = useState<number>(-1)

  // フォーカス可能な要素を取得
  const getFocusable = () => {
    if (!ulRef.current) return []
    const focusable = Array.from(
      ulRef.current.querySelectorAll<HTMLElement>(
        'button, [tabindex]:not([tabindex="-1"])'
      )
    )
    return focusable
  }

  // キーボード操作
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const focusable = getFocusable()
    if (focusable.length === 0) return
    if (
      e.key === "ArrowDown" ||
      (e.key === "Tab" && !e.shiftKey)
    ) {
      if (e.key === "Tab" && !e.shiftKey && focusIndex === focusable.length - 1) {
        e.preventDefault()
        buttonRef?.current?.focus()
        setFocusIndex(0)
        return
      }
      e.preventDefault()
      const next = (focusIndex + 1) % focusable.length
      setFocusIndex(next)
      focusable[next]?.focus()
    } else if (
      e.key === "ArrowUp" ||
      (e.key === "Tab" && e.shiftKey)
    ) {
      if (e.key === "Tab" && e.shiftKey && focusIndex === 0) {
        e.preventDefault()
        buttonRef?.current?.focus()
        setFocusIndex(focusable.length)
        return
      }
      e.preventDefault()
      const prev = (focusIndex - 1 + focusable.length) % focusable.length
      setFocusIndex(prev)
      focusable[prev]?.focus()
    } else if (e.key === "Home") {
      e.preventDefault()
      setFocusIndex(0)
      focusable[0]?.focus()
    } else if (e.key === "End") {
      e.preventDefault()
      setFocusIndex(focusable.length - 1)
      focusable[focusable.length - 1]?.focus()
    } else if (e.key === "Escape") {
      e.preventDefault()
      closeHandler()
      buttonRef?.current?.focus()
    }
  }

  // Dropdownが開いたとき最初の要素にフォーカス
  useEffect(() => {
    const focusable = getFocusable()
    if (focusable.length > 0) {
      setFocusIndex(0)
      focusable[0].focus()
    }
  }, [children])

  return (
    <ul
      id={id}
      ref={ulRef}
      className={className}
      onKeyDown={handleKeyDown}
      role={role}
      aria-label={ariaLabel}
      tabIndex={-1}
    >
      {children}
    </ul>
  )
}
