import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/CreatePost.css";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import logo from "../assets/yellowcardv2logo.png";

interface PostData {
  title: string;
  content: string;
  category: string;
}

const CreatePost: React.FC = () => {
  const [post, setPost] = useState<PostData>({
    title: "",
    content: "",
    category: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmPost = async () => {
    setShowModal(false);
    setIsSubmitting(true);

    try {
      // Save post to Firestore
      const postRef = collection(db, "posts");
      await addDoc(postRef, {
        title: post.title,
        content: post.content,
        category: post.category,
        createdAt: serverTimestamp(),
      });

      // Save to notifications
      await addDoc(collection(db, "notifications"), {
        title: "New Announcement",
        body: `📢 ${post.title} — Check the Announcement section for details.`,
        category: post.category,
        createdAt: serverTimestamp(),
        type: "announcement",
      });

      // Send push notifications
      const userSnap = await getDocs(collection(db, "users"));
      userSnap.forEach(async (docSnap) => {
        const token = docSnap.data().pushToken;
        if (token) {
          await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: token,
              sound: "default",
              title: post.title,
              body: post.content,
            }),
          });
        }
      });

      setSuccessMessage("✅ Post created and notification sent!");
      setPost({ title: "", content: "", category: "general" });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("❌ Failed to create post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelPost = () => {
    setShowModal(false);
  };

  return (
    <div className="dashboard-layout">
      {/* ✅ Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <a href="/profile">
           <img src={logo} alt="Yellow Card Logo" />
           </a>
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-menu">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/create-post" className="active">
            Create Post
          </Link>
          <Link to="/feedbacks">Feedbacks</Link>
          <Link to="/Annoucements">Announcements</Link>
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </aside>

      {/* ✅ Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="create-post-container">
            <h2 className="section-title">Create New Post</h2>

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
                {isSubmitting ? "Publishing..." : "Publish"}
              </button>

              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}
            </form>
          </div>
        </div>
      </main>

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
  );
};

export default CreatePost;
