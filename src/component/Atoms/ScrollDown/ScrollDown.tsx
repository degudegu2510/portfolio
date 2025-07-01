export const ScrollDown = () => {
  return (
    <div className="flex gap-2">
      <svg width="17" height="100" viewBox="0 0 17 100" fill="var(--color-gray)">
        <rect x="8" y="0" width="1" height="100">
          <animate
            attributeName="height"
            values="0;100;0;"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            values="0;0;100;"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
      <p className="text-medium-emphasis">下にスクロール</p>
    </div>
  )
}
