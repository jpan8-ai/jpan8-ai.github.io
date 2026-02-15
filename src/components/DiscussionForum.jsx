import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './DiscussionForum.css'
import axios from "axios";

export default function DiscussionForum() {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL
  });

  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [newTopic, setNewTopic] = useState({ author: '', subject: '', message: '' });
  const [newMessage, setNewMessage] = useState({author: '', message: ''});

  useEffect(() => {
    axiosInstance.get("getBlogEntries")
      .then(response => {
        let topics = [];
        response.data.forEach((value, index) => 
        {
            topics = [...topics, {id: value.id, date: value.entrydate, author: value.author, subject: value.title, 
              text: value.content}];
        });
        setTopics(topics);
      })
      .catch(err => 
        console.log(err)
      );
    }, []);

  useEffect(() => {
    if (selectedTopic) {
      axiosInstance.get(`getBlogEntryMessages?id=${selectedTopic.id}`)
        .then(response => {
          console.log(response.data);
          var messages = [];
          response.data.forEach((value, index) => {
            messages = [...messages, {id: value.id, blogId: value.blogId, text: value.content, 
              date: value.entrydate, author: value.author}];
            setSelectedMessages(messages);
          });
        })
        .catch(err => 
          console.log(err)
        );
    }
  }, [selectedTopic]);
  

  const carouselItems = topics.map(topic => (
    <div className="topic-slide" key={topic.id}>
      <div className="topic-header">
        <span className="topic-author">{topic.author}</span>
        <span className="topic-date">{topic.date}</span>
      </div>
      <h3 className="topic-subject">{topic.subject}</h3>
      <p className="topic-preview">{topic.text}</p>
      <button 
        className="btn btn-primary topic-btn"
        onClick={() => setSelectedTopic(topic)}
      >
        Join Discussion
      </button>
    </div>
  ))

  const insertBlogMessage = (blogId, author, message) => {
    axiosInstance.post("insertBlogMessage",
      {
        id: blogId,
        author: author,
        message: message
      }
    )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => 
      console.log(error)
    )
  };

  const handleCreateTopic = (e) => {
    e.preventDefault();
    axiosInstance.post("insertBlog",
      {
        subject: newTopic.subject,
        author: newTopic.author,
        message: ""
      })
      .then(response => {
        console.log(response.data);
        const newTopicData = {
          id: response.data,
          author: newTopic.author,
          subject: newTopic.subject,
          text: ""
        }
        setTopics([newTopicData, ...topics]);
        setNewTopic({ author: '', subject: '', message: '' });
        insertBlogMessage(response.data, newTopic.author, newTopic.message);
        setShowNewTopicForm(false);
      })
      .catch(error => {
        console.log(error);
        setNewTopic({ author: '', subject: '', message: '' });
        setShowNewTopicForm(false);
      });
  }

  const handleAddMessage = (e) => {
    e.preventDefault()
    if (!newMessage?.message || !selectedTopic?.subject) return;

    insertBlogMessage(selectedTopic.id, newMessage.author, newMessage.message);
    setSelectedMessages([...selectedMessages, {id: "", blogId: selectedTopic.id, text: newMessage.message, 
      date: "", author: newMessage.author}])
    setNewMessage({author: '', message: ''})
  }

  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="discussion-forum">
      {/* Topic Carousel */}
      <div className="topics-carousel">
        <h2 className="section-title">Active Discussions</h2>
        <p className="section-subtitle">Click on a topic to join the conversation</p>
        
        <div className="carousel-wrapper">
          <button 
            className="carousel-nav prev"
            onClick={() => setCurrentIndex(i => (i - 1 + topics.length) % topics.length)}
          >
            ←
          </button>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="topic-slide-wrapper"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {carouselItems[currentIndex]}
            </motion.div>
          </AnimatePresence>

          <button 
            className="carousel-nav next"
            onClick={() => setCurrentIndex(i => (i + 1) % topics.length)}
          >
            →
          </button>
        </div>

        <div className="carousel-dots">
          {topics.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>

        <button 
          className="btn new-topic-btn"
          onClick={() => setShowNewTopicForm(true)}
        >
          + Start New Discussion
        </button>
      </div>

      {/* Topic Detail Modal */}
      <AnimatePresence>
        {selectedTopic && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTopic(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedTopic(null)}>×</button>
              
              <div className="topic-detail-header">
                <h3>{selectedTopic.subject}</h3>
                <span className="topic-author-badge">Started by {selectedTopic.author}</span>
              </div>

              <div className="messages-list">
                {selectedMessages.map(msg => (
                  <div key={msg.id} className="message">
                    <div className="message-header">
                      <span className="message-author">{msg.author}</span>
                      <span className="message-date">{msg.date}</span>
                    </div>
                    <p className="message-text">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form className="message" onSubmit={handleAddMessage}>
                <div>
                  <label style={{marginRight: "10px"}}>Name:</label>
                  <input style={{backgroundColor: "black"}}
                    type='text'
                    value={newMessage.author}
                    onChange={e => {setNewMessage({...newMessage, author: e.target.value})}}
                  />
                </div>
                <div className='message-text'>
                  <textarea className='message-text' style={{width: "100%", backgroundColor: "black"}}
                    value={newMessage.message}
                    onChange={e => setNewMessage({...newMessage, message: e.target.value})}
                    placeholder="Add your thoughts..."
                    rows="3"
                  />
                </div>
                <div style={{textAlign: "end"}}>
                  <button type="submit" className="btn btn-primary">Post Reply</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Topic Form Modal */}
      <AnimatePresence>
        {showNewTopicForm && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNewTopicForm(false)}
          >
            <motion.div 
              className="modal-content new-topic-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setShowNewTopicForm(false)}>×</button>
              
              <h3>Start New Discussion</h3>
              
              <form onSubmit={handleCreateTopic}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    value={newTopic.author}
                    onChange={e => setNewTopic({...newTopic, author: e.target.value})}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    value={newTopic.subject}
                    onChange={e => setNewTopic({...newTopic, subject: e.target.value})}
                    placeholder="What would you like to discuss?"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Your Message</label>
                  <textarea
                    value={newTopic.message}
                    onChange={e => setNewTopic({...newTopic, message: e.target.value})}
                    placeholder="Share your thoughts..."
                    rows="4"
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary">Create Topic</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
