import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await signOut(auth);
        navigate("/"); // redirect to login after logout
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
    doLogout();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
