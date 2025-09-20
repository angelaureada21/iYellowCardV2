import React from "react";
import { Link } from "react-router-dom";
import "../styles/About.css";
import logo from "../assets/yellowcardv2logo.png";

const About: React.FC = () => {
  return (
    <div className="about-container">
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
          <Link to="/faq">FAQs</Link>
          <Link to="/help">Help</Link>
          <Link to="/profile" className="profile-link">
            <div className="profile-circle">👤</div>
          </Link>
        </nav>
      </header>

      {/* Main */}
      <main className="about-content">
        <section className="intro card">
          <p>
            The <strong>Yellow Card Information and Assistance System</strong> is a
            digital platform developed to help the local government and Suby1 Leaders
            manage, track, and support Yellow Card holders in Lucena City.
          </p>
          <p>
            This system improves the distribution of benefits, ensures transparency,
            and empowers leaders and citizens through accessible technology.
          </p>
        </section>

        <section className="features card">
          <h2 className="section-title">Key Features</h2>
          <ul>
            <li>
              <strong>Post Management:</strong> Create and publish announcements for
              Yellow Card members.
            </li>
            <li>
              <strong>AI Chatbot Support:</strong> Automatically respond to FAQs and
              assistance queries.
            </li>
            <li>
              <strong>Leader Coordination:</strong> View and manage Suby1 Leaders and
              their assigned members.
            </li>
            <li>
              <strong>Assistance Tracking:</strong> Monitor distributed benefits and
              financial aid history.
            </li>
            <li>
              <strong>Data Insights:</strong> Use analytics to support smart
              decision-making and reporting.
            </li>
          </ul>
        </section>

        <section className="stakeholders card">
          <h2 className="section-title">Who Uses This System?</h2>
          <ul>
            <li>
              <strong>Local Government Units (LGUs):</strong> Administer and oversee
              Yellow Card operations.
            </li>
            <li>
              <strong>Suby1 Leaders:</strong> Connect with members and report updates
              to LGUs.
            </li>
            <li>
              <strong>Citizens:</strong> Access information about their benefits and
              government assistance.
            </li>
          </ul>
        </section>

        <section className="tech card">
          <h2 className="section-title">Powered By</h2>
          <ul>
            <li>
              <strong>React + Vite:</strong> Frontend for Admin Panel
            </li>
            <li>
              <strong>React Native + Expo:</strong> Mobile App for Members
            </li>
            <li>
              <strong>Firebase:</strong> Authentication, Firestore DB, Cloud Messaging
            </li>
            <li>
              <strong>AI Integration:</strong> Chatbot for Smart Member Support
            </li>
          </ul>
        </section>

        <section className="mission card">
          <h2 className="section-title">Our Mission</h2>
          <p>
            To promote inclusive governance and digital innovation by ensuring every
            Yellow Card holder receives fair, fast, and effective government
            assistance.
          </p>
        </section>

       <footer className="dashboard-footer">
        <p>
          © {new Date().getFullYear()} Lucena City Government - Yellow Card
          Assistance System
        </p>
      </footer>
      </main>
    </div>
  );
};

export default About;
