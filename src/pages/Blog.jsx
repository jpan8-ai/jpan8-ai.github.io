import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Blog.css'

export default function Blog() {
  const posts = [
    {
      title: 'Getting Started with React Hooks',
      excerpt: 'A deep dive into useState, useEffect, and building your first custom hook.',
      date: '2024-01-15',
      readTime: '5 min read',
      slug: 'getting-started-react-hooks',
    },
    {
      title: 'Building Performant Web Apps',
      excerpt: 'Tips and techniques for optimizing your React applications.',
      date: '2024-01-08',
      readTime: '7 min read',
      slug: 'building-performant-web-apps',
    },
    {
      title: 'Why I Switched to TypeScript',
      excerpt: 'My journey from JavaScript to TypeScript and why you should too.',
      date: '2023-12-20',
      readTime: '6 min read',
      slug: 'why-i-switched-to-typescript',
    },
  ]

  return (
    <motion.main 
      className="blog page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="section-title">Blog</h1>
      
      <p className="blog-intro">
        Thoughts on development, design, and everything in between.
      </p>

      <div className="posts-grid">
        {posts.map((post, index) => (
          <article key={index} className="post-card card-hover">
            <div className="post-meta">
              <span className="post-date">{post.date}</span>
              <span className="post-read">{post.readTime}</span>
            </div>
            <h2 className="post-title">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="post-excerpt">{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`} className="post-link">
              Read More →
            </Link>
          </article>
        ))}
      </div>

      <div className="newsletter">
        <h3>Stay Updated</h3>
        <p>Get new posts delivered to your inbox.</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="newsletter-input"
          />
          <button type="submit" className="btn btn-primary">Subscribe</button>
        </form>
      </div>
    </motion.main>
  )
}
