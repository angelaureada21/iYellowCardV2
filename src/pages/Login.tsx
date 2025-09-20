import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "../styles/login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Sign in user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Get user role from Firestore
      const userDoc = await getDoc(doc(db, "users", uid));

      if (!userDoc.exists()) {
        setError("No role assigned to this account. Contact admin.");
        await auth.signOut();
        return;
      }

      const role = userDoc.data().role;

      if (role !== "admin") {
        setError("Access denied. Admins only.");
        await auth.signOut();
        return;
      }

      // ✅ If role is admin → go to dashboard
      navigate("/dashboard");

    } catch (err) {
      setError("Invalid email or password. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Login as an Admin</h2>
        <form onSubmit={handleLogin}>
          <label>
            <span>Enter your email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Enter your password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* ✅ Optional tagline/message */}
        <div className="login-message">
          <p>
            Smart Access • Real Benefits <br />
            iYellow Card for every Lucenahin
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
