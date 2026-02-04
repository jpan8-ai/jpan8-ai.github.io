import { motion } from 'framer-motion'
import './Contact.css'

export default function Contact() {
  return (
    <motion.main 
      className="contact page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="section-title">Get in Touch</h1>
      
      <div className="contact-content">
        <div className="contact-info">
          <p className="contact-intro">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
          
          <div className="contact-links">
            <a href="mailto:panj2001@gmail.com" className="contact-link card-hover">
              <span className="contact-icon">✉️</span>
              <div className="contact-details">
                <span className="contact-label">Email</span>
                <span className="contact-value">panj2001@gmail.com</span>
              </div>
            </a>
            
            <a href="https://linkedin.com/in/jie-pan-0045198" target="_blank" rel="noopener noreferrer" className="contact-link card-hover">
              <span className="contact-icon">💼</span>
              <div className="contact-details">
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">/in/jie-pan-0045198</span>
              </div>
            </a>
            
            <a href="tel:8025983304" className="contact-link card-hover">
              <span className="contact-icon">📱</span>
              <div className="contact-details">
                <span className="contact-label">Phone</span>
                <span className="contact-value">802-598-3304</span>
              </div>
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="your@email.com" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="What's this about?" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Tell me about your project..." required></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary btn-full">Send Message</button>
        </form>
      </div>
    </motion.main>
  )
}
