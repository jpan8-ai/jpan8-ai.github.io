import { motion } from 'framer-motion'
import './About.css'

export default function About() {
  return (
    <motion.main 
      className="about page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <section className="about-intro">
        <h1 className="section-title">About Me</h1>
        <div className="about-content">
          <div className="about-text">
            <p className="lead">
              I'm a Full Stack Software Engineer with 15+ years of experience specializing in .NET technologies and a diverse skill set across multiple programming languages.
            </p>
            <p>
              Currently leveraging AWS technologies and Docker containers to design and deploy innovative, scalable solutions. I'm a strong advocate for high-quality code, passionate about crafting software that drives business success.
            </p>
            <p>
              A proactive team player who thrives in collaborative, team-oriented environments and excels as a self-starter with excellent self-motivation. Focused on continuous learning, growth, and process improvement.
            </p>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <span>📷</span>
              <p>Your photo here</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <h2 className="section-title">What I Do</h2>
        <div className="values-grid">
          <div className="value-card">
            <h4>Web Development</h4>
            <p>Building modern web applications with ReactJS, ASP.NET, and cloud technologies.</p>
          </div>
          <div className="value-card">
            <h4>Desktop & Mobile</h4>
            <p>Developing cross-platform applications using .NET, Java, and mobile frameworks.</p>
          </div>
          <div className="value-card">
            <h4>Cloud & DevOps</h4>
            <p>Deploying scalable solutions on AWS with Docker containers and CI/CD pipelines.</p>
          </div>
        </div>
      </section>

      <section className="about Interests">
        <h2 className="section-title">Background</h2>
        <div className="interests-list">
          <span className="interest-tag">🎓 Johns Hopkins MS</span>
          <span className="interest-tag">🎓 UVM BS CS</span>
          <span className="interest-tag">✈️ Aerospace</span>
          <span className="interest-tag">☁️ AWS</span>
          <span className="interest-tag">🐳 Docker</span>
        </div>
      </section>
    </motion.main>
  )
}
