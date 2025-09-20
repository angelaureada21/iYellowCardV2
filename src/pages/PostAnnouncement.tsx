import { useState } from "react";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../firebaseConfig";
import { Link } from "react-router-dom";
import "../styles/PostAnnoucement.css";
import logo from "../assets/yellowcardv2logo.png";

const db = getFirestore(app);

const PostAnnouncement: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // ✅ for confirmation modal

  const handlePost = async () => {
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "announcements"), {
        title,
        category: "Announcements",
        content,
        attachment: attachment || null,
        timestamp: serverTimestamp(),
      });

      await addDoc(collection(db, "notifications"), {
        title: "📢 New Announcement",
        body: `${title} — Check the announcements section for details.`,
        createdAt: serverTimestamp(),
        type: "announcement",
      });

      setSuccessMessage("✅ Announcement posted!");
      setTitle("");
      setContent("");
      setAttachment("");
    } catch (error) {
      console.error("Error posting announcement!", error);
    } finally {
      setIsSubmitting(false);
      setShowModal(false); // close modal after posting
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true); 
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <a href="/profile">
           <img src={logo} alt="Yellow Card Logo" />
           </a>
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-menu">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/create-post">Create Post</Link>
          <Link to="/feedbacks">Feedbacks</Link>
          <Link to="/Annoucements" className="active">Announcements</Link>
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="announcement-container">
          <h2>Post a New Announcement</h2>

          <form onSubmit={handleSubmit} className="announcement-form">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter announcement title"
            />

            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Write your announcement here..."
            />

            <label htmlFor="attachment">Attachment URL (optional)</label>
            <input
              id="attachment"
              type="text"
              value={attachment}
              onChange={(e) => setAttachment(e.target.value)}
              placeholder="Paste a link if needed"
            />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish Announcement"}
            </button>

            {successMessage && <div className="success-message">{successMessage}</div>}
          </form>
        </div>
      </main>

      {/* ✅ Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Post</h3>
            <p>Do you want to post this announcement?</p>
            <div className="modal-actions">
              <button
                onClick={handlePost}
                disabled={isSubmitting}
                className="yes-btn"
              >
                {isSubmitting ? "Posting..." : "Yes"}
              </button>
              <button onClick={() => setShowModal(false)} className="no-btn">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostAnnouncement;
