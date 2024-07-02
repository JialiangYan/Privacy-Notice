// page transition animation
import { motion } from 'framer-motion'

const transition = (Comp) => {
  return () => (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Comp />
      </motion.div>
    </div>
  )
}

export default transition
