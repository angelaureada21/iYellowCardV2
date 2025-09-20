import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import '../styles/profile.css';

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const snapshot = await getDoc(userRef);
          if (snapshot.exists()) {
            setUserData(snapshot.data());
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
        setLoading(false);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
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
            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <p className="no-data">No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
