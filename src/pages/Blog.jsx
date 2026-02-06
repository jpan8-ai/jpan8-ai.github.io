import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Blog.css'
import axios from "axios";
import { useState, useEffect } from 'react';
import { Carousel, Stack } from "react-bootstrap";

export default function Blog() {
  const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL
    });
    const [news, setNews] = useState([]);
console.log(import.meta.env.REACT_APP_API_BASE_URL);
    useEffect(() => {
        axiosInstance.get("getnews?searchterms=ai+OR+artificial+intelligent")
          .then(response => {
            console.log(response);
            let news = [];
            for(var i = 0; i < response?.data?.length; i += 3)
            {
                let inner = [];
                for(var j = i; j < i + 3 && j < response?.data?.length; j ++)
                {
                    inner = [...inner, response?.data[j]];
                }
                news = [...news, inner];
            }
            setNews(news);
            console.log(news);
          })
          .catch(err => 
              console.log(err)
          );
    }, []);

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

      <Carousel variant="dark">
        {news.map((value, index) =>
          <Carousel.Item>
            1
            {/* <div className="posts-grid">
              {value.map((news, index) =>        
                  <article key={index} className="post-card card-hover">
                    <div className="post-meta">
                      <span className="post-date">{news.publish_date}</span>
                      <span className="post-read">{news.author}</span>
                    </div>
                    <h2 className="post-title">
                      {news.title}
                    </h2>
                    {/* <p className="post-excerpt">{news.text}</p>
                    <Link to={news.url} className="post-link">
                      Read More →
                    </Link>
                  </article>                     
              )} 
            </div>*/}
          </Carousel.Item>
        )}
      </Carousel>

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
