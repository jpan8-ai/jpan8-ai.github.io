import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Carousel.css'

export default function Carousel({ items, autoPlay = true, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, interval)
    return () => clearInterval(timer)
  }, [autoPlay, interval, items.length])

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  return (
    <div className="carousel">
      <div className="carousel-container">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="carousel-slide"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>

        <button className="carousel-btn prev" onClick={handlePrev} aria-label="Previous">
          ←
        </button>
        <button className="carousel-btn next" onClick={handleNext} aria-label="Next">
          →
        </button>
      </div>

      <div className="carousel-dots">
        {items.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
