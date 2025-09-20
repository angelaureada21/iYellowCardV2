import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { app } from "../firebaseConfig";
import { Link } from "react-router-dom";
import "../styles/ViewFeedback.css";
import logo from "../assets/yellowcardv2logo.png";

const db = getFirestore(app);

interface Feedback {
  id: string;
  name: string;
  message: string;
  createdAt: any;
}

const ViewFeedback: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [readStatus, setReadStatus] = useState<{ [key: string]: boolean }>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const feedbacks: Feedback[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Feedback[];

        setFeedbackList(feedbacks);

        // initialize all as unread
        const initialStatus: { [key: string]: boolean } = {};
        feedbacks.forEach((f) => {
          initialStatus[f.id] = false;
        });
        setReadStatus(initialStatus);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  const toggleRead = (id: string) => {
    setReadStatus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const confirmDelete = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteDoc(doc(db, "feedbacks", selectedId));
      setFeedbackList((prev) => prev.filter((f) => f.id !== selectedId));
    } catch (error) {
      console.error("Error deleting feedback:", error);
    } finally {
      setShowModal(false);
      setSelectedId(null);
    }
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
          <Link to="/create-post">Create Post</Link>
          <Link to="/feedbacks" className="active">Feedbacks</Link>
          <a href="/Annoucements">Announcements</a>
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </aside>

      {/* ✅ Main Content */}
      <main className="main-content">
        <h2 className="section-title">User Feedbacks</h2>

        <div className="feedback-grid">
          {feedbackList.length === 0 ? (
            <p className="no-feedback">No feedback submitted yet.</p>
          ) : (
            feedbackList.map((item) => (
              <div
                key={item.id}
                className={`feedback-card ${readStatus[item.id] ? "read" : "unread"}`}
                onClick={() => toggleRead(item.id)}
              >
                {/* Badge */}
                <span className={`status-badge ${readStatus[item.id] ? "read" : "unread"}`}>
                  {readStatus[item.id] ? "Read" : "Unread"}
                </span>
                <h4 className="feedback-name">{item.name || "Anonymous"}</h4>
                <p className="feedback-message">{item.message}</p>
                <div className="feedback-footer">
                  <button
                    className="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDelete(item.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* ✅ Delete Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Delete</h3>
            <p>Do you want to delete this feedback?</p>
            <div className="modal-actions">
              <button onClick={handleDelete} className="yes-btn">
                Yes
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

export default ViewFeedback;
