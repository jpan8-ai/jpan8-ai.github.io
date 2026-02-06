import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './DiscussionForum.css'

// Sample data - in production, this would come from an API
const sampleTopics = [
  {
    id: 1,
    author: 'John',
    subject: 'Best practices for React hooks',
    messages: [
      { id: 1, author: 'John', text: 'What are your favorite custom hooks?', date: '2026-02-01' },
      { id: 2, author: 'Alice', text: 'I love useLocalStorage!', date: '2026-02-02' },
    ]
  },
  {
    id: 2,
    author: 'Sarah',
    subject: 'AI in software development',
    messages: [
      { id: 1, author: 'Sarah', text: 'How is AI changing your workflow?', date: '2026-02-03' },
    ]
  },
  {
    id: 3,
    author: 'Mike',
    subject: 'Career advice for juniors',
    messages: [
      { id: 1, author: 'Mike', text: 'Tips for landing your first dev job?', date: '2026-02-04' },
      { id: 2, author: 'Emma', text: 'Build projects and contribute to open source!', date: '2026-02-05' },
    ]
  }
]

export default function DiscussionForum() {
  const [topics, setTopics] = useState(sampleTopics)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [showNewTopicForm, setShowNewTopicForm] = useState(false)
  const [newTopic, setNewTopic] = useState({ author: '', subject: '', message: '' })
  const [newMessage, setNewMessage] = useState('')

  const carouselItems = topics.map(topic => (
    <div className="topic-slide" key={topic.id}>
      <div className="topic-header">
        <span className="topic-author">{topic.author}</span>
        <span className="topic-date">{topic.messages[0]?.date}</span>
      </div>
      <h3 className="topic-subject">{topic.subject}</h3>
      <p className="topic-preview">{topic.messages.length} message{topic.messages.length !== 1 ? 's' : ''}</p>
      <button 
        className="btn btn-primary topic-btn"
        onClick={() => setSelectedTopic(topic)}
      >
        Join Discussion
      </button>
    </div>
  ))

  const handleCreateTopic = (e) => {
    e.preventDefault()
    const newTopicData = {
      id: Date.now(),
      author: newTopic.author,
      subject: newTopic.subject,
      messages: [
        { id: 1, author: newTopic.author, text: newTopic.message, date: new Date().toISOString().split('T')[0] }
      ]
    }
    setTopics([newTopicData, ...topics])
    setNewTopic({ author: '', subject: '', message: '' })
    setShowNewTopicForm(false)
  }

  const handleAddMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedTopic) return

    const updatedTopics = topics.map(topic => {
      if (topic.id === selectedTopic.id) {
        const updated = {
          ...topic,
          messages: [...topic.messages, {
            id: Date.now(),
            author: 'You',
            text: newMessage,
            date: new Date().toISOString().split('T')[0]
          }]
        }
        setSelectedTopic(updated)
        return updated
      }
      return topic
    })
    setTopics(updatedTopics)
    setNewMessage('')
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
                {selectedTopic.messages.map(msg => (
                  <div key={msg.id} className="message">
                    <div className="message-header">
                      <span className="message-author">{msg.author}</span>
                      <span className="message-date">{msg.date}</span>
                    </div>
                    <p className="message-text">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form className="message-form" onSubmit={handleAddMessage}>
                <textarea
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Add your thoughts..."
                  rows="3"
                />
                <button type="submit" className="btn btn-primary">Post Reply</button>
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
