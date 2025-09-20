import { Link } from "react-router-dom";
import "../styles/About.css";
import logo from "../assets/yellowcardv2logo.png";

const About: React.FC = () => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
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
          <Link to="/about" className="active">About</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content about-content">
        <h1 className="page-title">About the System</h1>

        <section className="card">
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

        <section className="card">
          <h2 className="section-title">Key Features</h2>
          <ul>
            <li><strong>Post Management:</strong> Publish announcements for Yellow Card members.</li>
            <li><strong>AI Chatbot Support:</strong> Respond to FAQs and assistance queries automatically.</li>
            <li><strong>Feedback Collection:</strong> Gather user feedback to improve services.</li>
            <li><strong>Real-time Updates:</strong> Instant notifications for new posts and assistance.</li>
            <li><strong>Secure Authentication:</strong> Role-based access for admins and leaders.</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="section-title">Who Uses This System?</h2>
          <ul>
            <li><strong>LGUs:</strong> Administer and oversee Yellow Card operations.</li>
            <li><strong>Citizens:</strong> Access information about benefits and government assistance.</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="section-title">Powered By</h2>
          <ul>
            <li><strong>React + Vite:</strong> Admin Panel</li>
            <li><strong>React Native + Expo:</strong> Mobile App</li>
            <li><strong>Firebase:</strong> Authentication, Firestore, Cloud Messaging</li>
            <li><strong>AI Integration:</strong> Chatbot for Smart Member Support</li>
          </ul>
        </section>

        <section className="card">
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
