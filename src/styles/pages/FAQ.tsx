import React, { useState } from "react";
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
      a: "Click the profile icon in the top right corner, then select 'Logout'.",
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
      q: "📂 How can I track financial assistance history?",
      a: "Go to the 'Assistance' section to view records of support provided to members under each Suby1 Leader.",
    },
    {
      q: "⚙️ Can I edit or delete a post?",
      a: "Yes. Go to the 'Manage Posts' page, find the post you want to modify, and choose to edit or delete it from the actions menu.",
    },
  ];

  return (
    <div className="faq-wrapper">
      {/* Header */}
      <header className="header">
        <div className="logo-section">
          <img src={logo} alt="Yellow Card Logo" className="logo" />
          <div className="logo-text">
            <strong>Republic of the Philippines</strong> <br />
            Lucena City, Quezon <br />
            <span>Yellow Card Information and Assistance System</span>
          </div>
        </div>

        <nav className="nav-links">
          <Link to="/dashboard">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>
          <Link to="/profile" className="profile-link">
            <div className="profile-circle">👤</div>
          </Link>
        </nav>
      </header> 

      {/* FAQ Section */}
      <div className="faq-container">
        <h2 className="faq-title">💡 Frequently Asked Questions</h2>
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
      </div>
    </div>
  );
};

export default FAQ;
