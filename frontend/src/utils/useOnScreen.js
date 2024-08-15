import { useEffect, useState, useRef } from 'react'

export default function useOnScreen(ref) {
  const [isOnScreen, setIsOnScreen] = useState(false)
  const observerRef = useRef(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    )
  }, [])

  useEffect(() => {
    observerRef.current.observe(ref.current)

    return () => {
      observerRef.current.disconnect()
    }
  }, [ref])

  return isOnScreen
}

// export function DummyComponent() {
//   const ref = useRef(null)
//   const isVisible = useOnScreen(ref)

//   return (
//     <div ref={ref}>
//       <h1>HEEEE</h1> {isVisible && <h2>Seen!</h2>}
//     </div>
//   )
// }
