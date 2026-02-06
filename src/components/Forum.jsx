import { motion } from 'framer-motion'
import { useState } from 'react'
import './Forum.css'

export default function Forum({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('idle') // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Call the onSubmit callback if provided
    if (onSubmit) {
      onSubmit(formData)
    }

    setStatus('success')
    setFormData({ name: '', email: '', subject: '', message: '' })

    // Reset status after 3 seconds
    setTimeout(() => setStatus('idle'), 3000)
  }

  const inputVariants = {
    focus: { scale: 1.02, borderColor: 'var(--accent)' },
    blur: { scale: 1, borderColor: 'var(--border)' }
  }

  return (
    <motion.div 
      className="forum"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="forum-title">Join the Discussion</h2>
      <p className="forum-subtitle">Share your thoughts, ask questions, or start a conversation.</p>

      {status === 'success' ? (
        <motion.div 
          className="forum-success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <span className="success-icon">✓</span>
          <h3>Thank you!</h3>
          <p>Your message has been submitted successfully.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="forum-form">
          <div className="form-row">
            <motion.div 
              className="form-group"
              whileFocus="focus"
              animate="blur"
              variants={inputVariants}
            >
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileFocus="focus"
              animate="blur"
              variants={inputVariants}
            >
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </motion.div>
          </div>

          <motion.div 
            className="form-group"
            whileFocus="focus"
            animate="blur"
            variants={inputVariants}
          >
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What would you like to discuss?"
              required
            />
          </motion.div>

          <motion.div 
            className="form-group"
            whileFocus="focus"
            animate="blur"
            variants={inputVariants}
          >
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your thoughts..."
              rows="5"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className={`btn btn-primary forum-submit ${status === 'submitting' ? 'submitting' : ''}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              <span className="loading-spinner"></span>
            ) : (
              'Submit'
            )}
          </motion.button>
        </form>
      )}
    </motion.div>
  )
}
