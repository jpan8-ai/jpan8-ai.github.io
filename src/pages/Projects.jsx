import { motion } from 'framer-motion'
import './Projects.css'

export default function Projects() {
  const projects = [
    {
      title: 'Project One',
      description: 'A web application that helps users organize their tasks efficiently. Built with React and Node.js.',
      tech: ['React', 'Node.js', 'MongoDB'],
      link: '#',
      github: '#',
    },
    {
      title: 'Project Two',
      description: 'E-commerce platform with real-time inventory management and payment integration.',
      tech: ['Next.js', 'Stripe', 'PostgreSQL'],
      link: '#',
      github: '#',
    },
    {
      title: 'Project Three',
      description: 'Real-time collaboration tool for remote teams with video chat and document sharing.',
      tech: ['React', 'WebRTC', 'Socket.io'],
      link: '#',
      github: '#',
    },
  ]

  return (
    <motion.main 
      className="projects page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="section-title">Projects</h1>
      
      <p className="projects-intro">
        Here are some of the things I've built. Each project taught me something new.
      </p>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article key={index} className="project-card card-hover">
            <div className="project-image">
              <div className="project-placeholder">
                <span>🖼️</span>
                <p>Project screenshot</p>
              </div>
            </div>
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                  View Project →
                </a>
                <a href={project.github} className="project-github" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="other-projects">
        <h2 className="subsection-title">Other Things</h2>
        <ul className="other-list">
          <li>
            <a href="#" className="other-link">
              <span className="other-name">Side Project One</span>
              <span className="other-arrow">→</span>
            </a>
          </li>
          <li>
            <a href="#" className="other-link">
              <span className="other-name">Side Project Two</span>
              <span className="other-arrow">→</span>
            </a>
          </li>
          <li>
            <a href="#" className="other-link">
              <span className="other-name">Experiment Three</span>
              <span className="other-arrow">→</span>
            </a>
          </li>
        </ul>
      </section>
    </motion.main>
  )
}
