import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <motion.main 
      className="home page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <section className="hero">
        <div className="hero-content">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-title">
            Jie <span className="accent">Pan</span>
          </h1>
          <h2 className="hero-subtitle">Full Stack Software Engineer</h2>
          <p className="hero-description">
            A results-driven developer with 15+ years of experience specializing in .NET technologies, ReactJS, cloud platforms, and scalable solution design.
          </p>
          <div className="hero-cta">
            <Link to="/projects" className="btn btn-primary">View Work</Link>
            <Link to="/contact" className="btn">Get in Touch</Link>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="hero-card">
            <div className="card-lines">
              <span></span><span></span><span></span>
            </div>
            <div className="card-code">
              {`const dev = {
  experience: '15+ years',
  focus: '.NET, ReactJS, AWS',
  passion: 'Building scalable solutions',
  teamPlayer: true
};`}
            </div>
          </div>
        </div>
      </section>

      <section className="featured">
        <h3 className="section-title">Expertise</h3>
        <div className="skills-grid">
          <div className="skill-card card-hover">
            <div className="skill-icon">🌐</div>
            <h4>Web Development</h4>
            <p>ReactJS, ASP.NET, HTML/CSS, JavaScript, Node.js, and modern web frameworks.</p>
          </div>
          <div className="skill-card card-hover">
            <div className="skill-icon">💻</div>
            <h4>Desktop & Mobile</h4>
            <p>C#, C++, Java, WPF, UWP, Android - building cross-platform applications.</p>
          </div>
          <div className="skill-card card-hover">
            <div className="skill-icon">☁️</div>
            <h4>Cloud & DevOps</h4>
            <p>AWS, Docker, Jenkins, CI/CD pipelines - deploying scalable solutions.</p>
          </div>
        </div>
      </section>
    </motion.main>
  )
}
