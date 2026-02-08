import { motion } from 'framer-motion'
import './Projects.css'
import Carousel from '../components/Carousel'

export default function Projects() {
  const projects = [
    {
      title: 'Clawdbot & MiniMax API Explorer',
      description: 'An intelligent AI assistant platform exploring Clawdbot automation and MiniMax large language models. Built interactive tools for API integration, natural language processing, and automated workflows.',
      tech: ['React', 'MiniMax API', 'Node.js', 'AI/ML', 'REST APIs'],
      link: '#',
      github: 'https://github.com/jpan8-ai/jpan8-ai.github.io',
    },
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory management, Stripe payment integration, and user authentication.',
      tech: ['Next.js', 'Stripe', 'PostgreSQL', 'TypeScript'],
      link: '#',
      github: '#',
    },
    {
      title: 'Real-time Collaboration Tool',
      description: 'Video chat and document sharing platform for remote teams with WebRTC and Socket.io.',
      tech: ['React', 'WebRTC', 'Socket.io', 'Node.js'],
      link: '#',
      github: '#',
    },
  ]

  const carouselItems = projects.map((project, index) => (
    <div key={index} className="slide-content">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="project-tech">
        {project.tech.map((tech) => (
          <span key={tech} className="tech-tag">{tech}</span>
        ))}
      </div>
    </div>
  ))

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

      <section className="projects-carousel">
        <Carousel items={carouselItems} autoPlay={true} interval={6000} />
      </section>

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
        <h2 className="subsection-title">Other Experiments</h2>
        <ul className="other-list">
          <li>
            <a href="#" className="other-link">
              <span className="other-name">AI Chat Interface</span>
              <span className="other-arrow">→</span>
            </a>
          </li>
          <li>
            <a href="#" className="other-link">
              <span className="other-name">Automation Scripts</span>
              <span className="other-arrow">→</span>
            </a>
          </li>
          <li>
            <a href="/game" className="other-link">
              <span className="other-name">RPG Puzzle Game</span>
              <span className="other-arrow">→</span>
            </a>
          </li>
        </ul>
      </section>
    </motion.main>
  )
}
