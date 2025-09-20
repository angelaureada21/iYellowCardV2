import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/FAQ.css";
import logo from "../assets/yellowcardv2logo.png";

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "📌 How do I create a post?",
      a: "Go to the Dashboard, then click on the 'Create Post' button. Fill in the announcement details and select a category before publishing.",
    },
    {
      q: "📝 Where can I see user feedback?",
      a: "Click the 'Feedbacks' section from the sidebar. You’ll be able to review all submissions from Yellow Card members.",
    },
    {
      q: "🔒 How do I log out of the admin panel?",
      a: "Click the profile icon in the sidebar, then select 'Logout'.",
    },
    {
      q: "📢 Who can see the announcements I publish?",
      a: "All Yellow Card members using the mobile app will receive a push notification and can view it in their announcements tab.",
    },
    {
      q: "🤖 How does the AI chatbot work?",
      a: "The AI chatbot automatically responds to FAQs from users, helping reduce manual inquiries. You can update its responses in the chatbot settings panel.",
    },
    {
      q: "⚙️ Can I edit or delete a post?",
      a: "Yes. Go to the 'Manage Posts' page, find the post you want to modify, and choose to edit or delete it from the actions menu.",
    },
  ];

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
          <Link to="/faq" className="active">FAQ</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </aside>

      {/* ✅ Main Content */}
      <main className="main-content">
        <h1 className="section-title">💡 Frequently Asked Questions</h1>

        <ul className="faq-list">
          {faqs.map((faq, i) => (
            <li
              key={i}
              className={`faq-item ${activeIndex === i ? "active" : ""}`}
              onClick={() => toggleFAQ(i)}
            >
              <strong>{faq.q}</strong>
              {activeIndex === i && <p>{faq.a}</p>}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default FAQ;
