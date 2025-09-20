import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import ViewFeedbacks from "./pages/ViewFeedbacks";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Profile from "./pages/profile"; // ✅ fixed import
import PostAnnouncement from "./pages/PostAnnouncement"; // ✅ make sure this file exists\
import Logout from "./pages/Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/feedbacks" element={<ViewFeedbacks />} />
        <Route path="/Annoucements" element={<PostAnnouncement />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
