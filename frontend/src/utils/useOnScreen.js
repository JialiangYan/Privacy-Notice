import { useState, useMemo, useEffect, useRef } from 'react'

export default function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false)

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    [ref]
  )

  useEffect(() => {
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return isIntersecting
}

// function DummyComponent() {
//   const ref = useRef(null)
//   const isVisible = useOnScreen(ref)

//   return (
//     <div ref={ref}>
//       <h1>HEEEE</h1> {isVisible && <h2>Seen!</h2>}
//     </div>
//   )
// }

const time = new Date()
