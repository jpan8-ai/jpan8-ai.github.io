import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/jie-pan-0045198' },
    { name: 'Email', url: 'mailto:panj2001@gmail.com' },
  ]

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <Link to="/" className="footer-logo">JP</Link>
          <p>Full Stack Software Engineer | .NET & React Specialist</p>
        </div>

        <div className="footer-center">
          <nav className="footer-nav">
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/resume">Resume</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

        <div className="footer-right">
          <div className="social-links">
            {socialLinks.map(({ name, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer">
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Jie Pan. All rights reserved.</p>
        <p className="footer-credit">
          Made with <span className="accent">♥</span> using React
        </p>
      </div>
    </footer>
  )
}
