import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, query, orderBy } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import '../styles/ViewFeedback.css';
import logo from '../assets/yellowcardv2logo.png';

const db = getFirestore(app);

interface Feedback {
  id: string;
  email: string;
  message: string;
  createdAt: any;
}

const ViewFeedback: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const q = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const feedbacks: Feedback[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Feedback[];

        setFeedbackList(feedbacks);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="page-container">
      <header className="header">
        <div className="logo-section">
         <img src={logo} alt="Yellow Card Logo" className="logo" />
          <div className="logo-text">
            <strong>Republic of the Philippines Lucena City, Quezon</strong><br />
            Yellow Card Information and Assistance System
          </div>
        </div>
        <nav className="nav-links">
          <a href="#">About</a>
          <a href="#">FAQs</a>
          <a href="#">Help</a>
          <div className="profile-circle">👤</div>
        </nav>
      </header>

      <div className="feedback-section">
        <button className="feedbacks-button">Feedbacks</button>

        <div className="feedback-grid">
          {feedbackList.length === 0 ? (
            <p className="no-feedback">No feedback submitted yet.</p>
          ) : (
            feedbackList.map((item) => (
              <div className="feedback-card" key={item.id}>
                <p>{item.message}</p>
                <div className="feedback-footer">
                  <span role="img" aria-label="smile">😊</span>
                  <a href={`mailto:${item.email}`} className="view-email">View Email</a>
                  <a href="#" className="delete">Delete</a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;
