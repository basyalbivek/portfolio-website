import { motion } from 'framer-motion'

const VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0 }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0 }
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 }
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -6, y: 8 },
    visible: { opacity: 1, rotate: 0, y: 0 }
  },
  slideDown: {
    hidden: { opacity: 0, y: -18 },
    visible: { opacity: 1, y: 0 }
  }
}

export default function AnimatedSection({children, className='', variant='fadeUp', duration=0.6}){
  const variants = VARIANTS[variant] || VARIANTS.fadeUp
  return (
    <motion.section className={className}
      initial="hidden" whileInView="visible" viewport={{once:true, amount:0.2}}
      transition={{duration}}
      variants={variants}
    >
      {children}
    </motion.section>
  )
}
