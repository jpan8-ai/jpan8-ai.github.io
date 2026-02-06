import { motion } from 'framer-motion'
import './Blog.css'
import DiscussionForum from "../components/DiscussionForum";

export default function Blog() {
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
        AI and Software Development News; thoughts on AI and Software Development, and everything in between.
      </p>

      <DiscussionForum />
    </motion.main>
  )
}
