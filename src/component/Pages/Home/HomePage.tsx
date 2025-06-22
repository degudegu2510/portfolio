import { useState } from "react"

export const HomePage = () => {
  const [count, setCount] = useState(0)
  return (
    <>
      <button
        className='bg-blue p-2 hover:bg-blue-dim heading-1 text-on-container elevation-8 rounded-[8px]'
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button>
    </>
  )
}
