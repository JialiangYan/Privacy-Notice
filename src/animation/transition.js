// page transition animation
import { motion } from 'framer-motion'

const transition = (Comp) => {
  return () => (
    <>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Comp />
      </motion.div>
    </>
  )
}

export default transition
