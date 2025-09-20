import React from 'react';
import '../styles/Dashboard.css';
import { Link } from 'react-router-dom';
import logo from '../assets/yellowcardv2logo.png';

// leader images
import mayorImage from '../assets/mayormark.jpg';
import governorImage from '../assets/governor.jpg';
import viceMayorImage from '../assets/vicemayor.jpg';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
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
          <Link to="/about">About</Link>
          <Link to="/faq">FAQs</Link>
          <Link to="/help">Help</Link>
          <Link to="/profile" className="profile-link">
            <div className="profile-circle">👤</div>
          </Link>
        </nav>
      </header>

      {/* Leaders Section */}
      <main className="dashboard-content">
        <section className="leaders-section">
          <h2 className="section-title">Lucena City Government Officials</h2>
          <div className="leaders-grid">
            <div className="leader-card">
              <img src={mayorImage} alt="Mayor Mark Alcala" />
              <div className="leader-info">
                <h3>Hon. Mark Don Victor D. Alcala</h3>
                <p className="position">City Mayor</p>
                <p className="description">Chief Executive of Lucena City</p>
                <a
                  href="https://simple.wikipedia.org/wiki/Mark_Alcala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-btn"
                >
                  View Profile
                </a>
              </div>
            </div>

            <div className="leader-card">
              <img src={governorImage} alt="Governor Helen Tan" />
              <div className="leader-info">
                <h3>Hon. Helen D. Tan, M.D.</h3>
                <p className="position">Provincial Governor</p>
                <p className="description">Governor of Quezon Province</p>
                <a
                  href="https://en.wikipedia.org/wiki/Angelina_Tan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-btn"
                >
                  View Profile
                </a>
              </div>
            </div>

            <div className="leader-card">
              <img src={viceMayorImage} alt="Vice Mayor Roderick Alcala" />
              <div className="leader-info">
                <h3>Hon. Roderick A. Alcala</h3>
                <p className="position">City Vice Mayor</p>
                <p className="description">
                  Presiding Officer of the Sangguniang Panlungsod
                </p>
                <a
                  href="https://peoplaid.com/2019/12/29/roderick-alcala/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-btn"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="actions-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="actions-grid">
            <div className="action-card">
              <div className="action-icon">📝</div>
              <h3>Upload a Post</h3>
              <p>Upload Citizen Benefits information</p>
              <Link to="/create-post">
                <button className="action-btn">Go to Upload</button>
              </Link>
            </div>

            <div className="action-card">
              <div className="action-icon">💬</div>
              <h3>View Feedbacks</h3>
              <p>Review citizen feedback and concerns</p>
              <Link to="/feedbacks">
                <button className="action-btn">View Feedbacks</button>
              </Link>
            </div>

            <div className="action-card">
              <div className="action-icon">🎁</div>
              <h3>Post a Benefit</h3>
              <p>Publish a new citizen benefit post</p>
              <Link to="/benefits">
                <button className="action-btn">Post a Benefit</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Government Sections */}
        <section className="government-sections">
          <div className="government-card">
            <h3>City Government Structure</h3>
            <ul>
              <li>City Mayor's Office</li>
              <li>Sangguniang Panlungsod</li>
              <li>City Departments</li>
              <li>Organizational Chart</li>
            </ul>
          </div>

          <div className="government-card">
            <h3>Sangguniang Panlungsod</h3>
            <ul>
              <li>City Council Members</li>
              <li>Standing Committees</li>
              <li>City Ordinances</li>
              <li>Session Calendar</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>
          © {new Date().getFullYear()} Lucena City Government - Yellow Card
          Assistance System
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
