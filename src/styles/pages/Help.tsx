import React from "react";
import "../styles/Help.css";
import { Link } from "react-router-dom";
import logo from "../assets/yellowcardv2logo.png";

const Help: React.FC = () => {
  return (
    <div className="help-container">
      {/* Header */}
      <header className="help-header">
        <div className="logo-section">
          <img src={logo} alt="Yellow Card Logo" className="logo" />
          <div className="logo-text">
            <strong>Republic of the Philippines</strong> <br />
            Lucena City, Quezon <br />
            <span>Yellow Card Information and Assistance System</span>
          </div>
        </div>

        <nav className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/faq">FAQs</Link>
          <Link to="/help">Help</Link>
          <Link to="/profile" className="profile-link">
            <div className="profile-circle">👤</div>
          </Link>
        </nav>
      </header>

      {/* Main Help Content */}
      <main className="help-content">
        <h1 className="section-title">Need Help?</h1>
        <p className="help-description">
          If you are experiencing any issues with the Yellow Card Information and Assistance System, 
          please try the following steps:
        </p>

        <div className="help-cards">
          <div className="help-card">
            <h3>📖 Check the FAQs</h3>
            <p>
              Visit the <Link to="/faq">FAQ page</Link> to see if your concern has already been answered.
            </p>
          </div>

          <div className="help-card">
            <h3>📧 Contact Support</h3>
            <p>
              You can reach the system administrator at{" "}
              <a href="mailto:support@yellowcard.gov.ph">support@yellowcard.gov.ph</a>.
            </p>
          </div>

          <div className="help-card">
            <h3>📞 Hotline</h3>
            <p>
              Call our hotline at <strong>(042) 710-1234</strong> during office hours (Mon–Fri, 8am–5pm).
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="help-footer">
        <p>
          © {new Date().getFullYear()} Lucena City Government - Yellow Card Assistance System
        </p>
      </footer>
    </div>
  );
};

export default Help;
