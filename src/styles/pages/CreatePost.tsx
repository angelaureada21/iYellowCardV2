import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CreatePost.css';
import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore';
import logo from '../assets/yellowcardv2logo.png';

interface PostData {
  title: string;
  content: string;
  category: string;
}

const CreatePost: React.FC = () => {
  const [post, setPost] = useState<PostData>({
    title: '',
    content: '',
    category: 'general',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmPost = async () => {
    setShowModal(false);
    setIsSubmitting(true);

    try {
      // 1. Save post to Firestore
      const postRef = collection(db, 'posts');
      await addDoc(postRef, {
        title: post.title,
        content: post.content,
        category: post.category,
        createdAt: serverTimestamp(),
      });

      // 2. Save to notifications
      await addDoc(collection(db, 'notifications'), {
        title: 'New Announcement',
        body: `📢 ${post.title} — Check the Announcement section for details.`,
        category: post.category,
        createdAt: serverTimestamp(),
        type: 'announcement',
      });

      // 3. Send push notifications
      const userSnap = await getDocs(collection(db, 'users'));
      userSnap.forEach(async docSnap => {
        const token = docSnap.data().pushToken;
        if (token) {
          await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: token,
              sound: 'default',
              title: post.title,
              body: post.content,
            }),
          });
        }
      });

      setSuccessMessage('✅ Post created and notification sent!');
      setPost({ title: '', content: '', category: 'general' });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('❌ Failed to create post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelPost = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* ✅ Header inside container */}
      <div className="header-container">
        <header className="header1">
          <div className="logo-section">
            <img src={logo} alt="Yellow Card Logo" className="logo" />
            <div className="logo-text">
              <strong>Republic of the Philippines</strong> <br />
              Lucena City, Quezon <br />
              <span>Yellow Card Information and Assistance System</span>
            </div>
          </div>

          <nav className="nav-links">
            <Link to="/dashboard">Home</Link>
            <Link to="/faq">FAQs</Link>
            <Link to="/help">Help</Link>
            <Link to="/profile" className="profile-link">
              <div className="profile-circle">👤</div>
            </Link>
          </nav>
        </header>
      </div>

      {/* ✅ Create Post Form */}
      <div className="create-post-container">
        <h2>Create New Post</h2>
        <form onSubmit={handleFormSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={post.category}
              onChange={handleInputChange}
            >
              <option value="general">General Announcement</option>
              <option value="benefits">Citizen Benefits</option>
              <option value="project">City Projects</option>
              <option value="event">Upcoming Events</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleInputChange}
              rows={6}
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </button>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </form>

        {/* ✅ Custom Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <p>Do you want to post this?</p>
              <div className="modal-buttons">
                <button onClick={confirmPost}>Yes</button>
                <button onClick={cancelPost}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreatePost;
