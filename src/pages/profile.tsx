import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  onAuthStateChanged,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import logo from "../assets/yellowcardv2logo.png";
import "../styles/Profile.css";

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  // ✅ States to toggle visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const snapshot = await getDoc(userRef);
          if (snapshot.exists()) {
            setUserData(snapshot.data());
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
        setLoading(false);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleChangePassword = async () => {
    if (!auth.currentUser) return;

    if (newPassword !== confirmPassword) {
      setMessage("❌ New password and confirm password do not match.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email!,
        currentPassword
      );

      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);

      setMessage("✅ Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        setShowModal(false);
        setMessage("");
      }, 1500);
    } catch (error: any) {
      console.error("Error updating password:", error);
      setMessage("❌ Failed to update password. Please check your input.");
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
          <Link to="/feedbacks">Feedbacks</Link>
          <Link to="/Annoucements">Announcements</Link>
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/profile" className="active">Profile</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </aside>

      {/* ✅ Main Content */}
      <main className="main-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="profile-container">
            <div className="profile-card">
              <h1 className="profile-title">Admin Profile</h1>
              {userData ? (
                <>
                  <div className="profile-info">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Role:</strong> {userData.role}</p>
                  </div>

                  <button
                    className="change-password-btn"
                    onClick={() => setShowModal(true)}
                  >
                    Change Password
                  </button>

                  <button className="logout-button" onClick={handleLogout}>
                    Log Out
                  </button>
                </>
              ) : (
                <p className="no-data">No user data found.</p>
              )}
            </div>
          </div>
        )}

        <footer className="dashboard-footer">
          <p>© {new Date().getFullYear()} Lucena City Government - Yellow Card Assistance System</p>
        </footer>
      </main>

      {/* ✅ Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Change Password</h2>

            {/* Current Password */}
            <div className="password-field">
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <span onClick={() => setShowCurrent(!showCurrent)} className="toggle-password">
                {showCurrent ? "" : ""}
              </span>
            </div>

            {/* New Password */}
            <div className="password-field">
              <input
                type={showNew ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span onClick={() => setShowNew(!showNew)} className="toggle-password">
                {showNew ? "" : ""}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="password-field">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span onClick={() => setShowConfirm(!showConfirm)} className="toggle-password">
                {showConfirm ? "" : ""}
              </span>
            </div>

            {message && <p className="message">{message}</p>}

            <div className="modal-actions">
              <button onClick={handleChangePassword}>Update</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
