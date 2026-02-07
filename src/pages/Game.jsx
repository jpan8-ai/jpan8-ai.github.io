import { motion } from 'framer-motion'
import RPGGame from '../components/RPGGame'

export default function Game() {
  return (
    <motion.div 
      style={{ minHeight: '100vh', paddingTop: '120px' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <RPGGame />
    </motion.div>
  )
}
