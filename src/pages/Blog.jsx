import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Blog.css'
import axios from "axios";
import { useState, useEffect } from 'react';
import Carousel from "../components/Carousel";
import Forum from "../components/Forum";

export default function Blog() {
  const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL
  });
  const [news, setNews] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    axiosInstance.get("getnews?searchterms=ai+OR+artificial+intelligent")
      .then(response => {
        console.log(response);
        let news = [];
        for(var i = 0; i < response?.data?.length; i += 2)
        {
            let inner = [];
            for(var j = i; j < i + 2 && j < response?.data?.length; j ++)
            {
                inner = [...inner, response?.data[j]];
            }
            news = [...news, inner];
        }
        setNews(news);
      })
      .catch(err => 
          console.log(err)
      );
  }, []);

  useEffect(() => {
    var tempCarItems = []
    news.forEach((value, index) => {
      tempCarItems = [...tempCarItems, 
        (
          <div className="posts-grid">
            {value.map((newsItem, index) =>        
                <article key={index} className="post-card card-hover">
                  <div className="post-meta">
                    <span className="post-date">{newsItem.publish_date}</span>
                    <span className="post-read">{newsItem.author}</span>
                  </div>
                  <h2 className="post-title">
                    {newsItem.title}
                  </h2>
                  <Link to={newsItem.url} className="post-link" target='_blank'>
                    Read More →
                  </Link>
                </article>                     
            )} 
          </div>       
        )
      ]
    });
    setCarouselItems(tempCarItems);
    console.log(tempCarItems);
  }, [news])

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

      <Carousel items={carouselItems}/>
      <div style={{height: "100px"}}></div>

      <Forum />

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
