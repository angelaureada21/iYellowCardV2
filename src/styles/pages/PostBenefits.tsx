import React, { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import '../styles/PostBenefits.css';

const db = getFirestore(app);

const PostBenefits: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attachment, setAttachment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // 1. Add benefit post
      await addDoc(collection(db, 'benefits'), {
        title,
        category: 'Benefits',
        content,
        attachment: attachment || null,
        timestamp: serverTimestamp(),
      });

      // 2. Add notification entry for the app
      await addDoc(collection(db, 'notifications'), {
        title: 'New Benefit Available',
        body: `📢 ${title} — Check the benefits section for details.`,
        createdAt: serverTimestamp(),
        type: 'benefit', // optional for filtering later
      });

      setSuccessMessage('✅ Benefit post submitted & notification sent!');
      setTitle('');
      setContent('');
      setAttachment('');
    } catch (error) {
      console.error('Error posting benefit or notification:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-benefits-container">
      <h2>Post a New Benefit</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <label htmlFor="attachment">Attachment URL (optional):</label>
        <input
          id="attachment"
          type="text"
          value={attachment}
          onChange={(e) => setAttachment(e.target.value)}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Publishing...' : 'Publish Benefit'}
        </button>

        {successMessage && <div className="success-message">{successMessage}</div>}
      </form>
    </div>
  );
};

export default PostBenefits;
