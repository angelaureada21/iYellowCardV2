import "../styles/Dashboard.css";

// ✅ Import images from src/assets
import mayor from "../assets/images/mayormark.jpg";
import governor from "../assets/images/governor.jpg";
import vicemayor from "../assets/images/vicemayor.jpg";
import faller from "../assets/images/faller.jpg";
import lacerna from "../assets/images/lacerna.jpg";
import noche from "../assets/images/noche.png";
import nadera from "../assets/images/nadera.png";
import brizuela from "../assets/images/brizuela.jpg";
import ona from "../assets/images/ona.jpg";
import sio from "../assets/images/sio.jpg";
import ryan from "../assets/images/ryan.jpg";
import abcede from "../assets/images/abcede.jpg";
import pureza from "../assets/images/pureza.png";

// Sceneries 
import lucenaBoulevard from "../assets/images/lucena_boulevard.jpg";
import perezPark from "../assets/images/perez_park.jpg";
import publicMarket from "../assets/images/lucena_public_market.webp";
import dalahicanSeawall from "../assets/images/dalahican_seawall.webp";
import capitolGrounds from "../assets/images/capitol_grounds.webp";
import conventionCenter from "../assets/images/convention_center.jpg";

// Logo
import yellowcardLogo from "../assets/images/yellowcardv2logo.png";

function Dashboard() {
  const officials = [
    { name: "Hon. Mark Don Victor B. Alcala", position: "City Mayor", image: mayor },
    { name: "Hon. Helen D. Tan, M.D.", position: "Governor", image: governor },
    { name: "Hon. Roderick A. Alcala", position: "Vice Mayor", image: vicemayor },
    { name: "Hon. Danilo B. Faller", position: "Councilor", image: faller },
    { name: "Hon. Americo Q. Lacerna", position: "Councilor", image: lacerna },
    { name: "Hon. Wilbert Mckinly L. Noche", position: "Councilor", image: noche },
    { name: "Hon. Patrick Norman E. Nadera", position: "Councilor", image: nadera },
    { name: "Hon. Benito G. Brizuela, Jr.", position: "Councilor", image: brizuela },
    { name: "Hon. Jose Christian O. Ona", position: "Councilor", image: ona },
    { name: "Hon. Elizabeth U. Sio", position: "Councilor", image: sio },
    { name: "Hon. Ryan Caezar E. Alcala", position: "Councilor", image: ryan },
    { name: "Hon. Sunshine C. Abcede", position: "Councilor", image: abcede },
    { name: "Hon. Edwin J. Pureza, M.D.", position: "Councilor", image: pureza },
  ];

  const sceneries = [
    { title: "Lucena Boulevard", description: "A peaceful place to walk and relax.", image: lucenaBoulevard },
    { title: "Perez Park", description: "Great for family bonding and jogging.", image: perezPark },
    { title: "Lucena Public Market", description: "Bustling hub for local produce & delicacies.", image: publicMarket },
    { title: "Barangay Dalahican Seawall", description: "Relaxing sunset and sea breeze spot.", image: dalahicanSeawall },
    { title: "Quezon Provincial Capitol Grounds", description: "Perfect for walks and community events.", image: capitolGrounds },
    { title: "Lucena City Convention Center", description: "Venue for expos, gatherings, and events.", image: conventionCenter },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
       <div className="sidebar-logo">
  <a href="/profile">
    <img src={yellowcardLogo} alt="Yellow Card Logo" />
  </a>
  <h2>Admin Panel</h2>
</div>
        <nav className="sidebar-menu">
          <a href="/dashboard" className="active">Dashboard</a>
          <a href="/create-post">Create Post</a>
          <a href="/feedbacks">Feedbacks</a>
          <a href="/Annoucements">Announcements</a>
          <a href="/about">About</a>
          <a href="/faq">FAQ</a>
          <a href="/profile">Profile</a>
          <a href="/logout">Logout</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="head-section"style={{ "--bg-image": `url(${capitolGrounds})` } as React.CSSProperties}>
          <h2>Lucena City iYellowCard </h2>
          <p> Smart Acess <br /> Real Benefits <br /> iYellow Card for every Lucenahin
          </p>
        </div>

        {/* City Officials */}
        <h2 className="sub-section-title">Elected Officials of Lucena City and the Province of Quezon</h2>
        <div className="scroll-container">
          <div className="scroll-row">
            {officials.map((official, index) => (
              <div key={index} className="leader-card">
                <img src={official.image} alt={official.name} />
                <div className="leader-info">
                  <h3>{official.name}</h3>
                  <p>{official.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sceneries */}
        <h2 className="sub-section-title">The Beauty of Lucena</h2>
        <div className="scroll-container">
          <div className="scroll-row">
            {sceneries.map((scene, index) => (
              <div key={index} className="scenery-card">
                <img src={scene.image} alt={scene.title} />
                <div className="scenery-info">
                  <h3>{scene.title}</h3>
                  <p>{scene.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Lucena */}
        <div className="about-section">
          <h2>About Lucena City</h2>
          <p>
            Lucena City, the capital of Quezon Province, is known as the
            "Cocopalm City of the South" for its thriving coconut industry.
            It serves as a major commercial hub in Southern Luzon and is home
            to the annual <strong>Pasayahan sa Lucena</strong> festival.
          </p>
        </div>

{/* Lucena Public Market */}
<div className="about-section">
  <h2>Lucena Public Market</h2>
  <p>
    A bustling hub for fresh produce, seafood, meats, and local delicacies. 
    The public market reflects the city’s vibrant trade and everyday life.
  </p>
</div>

{/* Perez Park */}
<div className="about-section">
  <h2>Perez Park</h2>
  <p>
    A historical park at the heart of Lucena City, offering open green 
    spaces, a playground, and a monument dedicated to Governor Filemon Perez.
  </p>
</div>

{/* St. Ferdinand Cathedral */}
<div className="about-section">
  <h2>St. Ferdinand Cathedral</h2>
  <p>
    One of the oldest and most prominent churches in Quezon Province, 
    known for its Spanish-era architecture and deep Catholic heritage.
  </p>
</div>

{/* Quezon Convention Center */}
<div className="about-section">
  <h2>Quezon Convention Center</h2>
  <p>
    A premier venue in Lucena City that hosts concerts, government events, 
    and cultural showcases, highlighting Quezon Province’s talents and culture.
  </p>
</div>

{/* SM City Lucena */}
<div className="about-section">
  <h2>SM City Lucena</h2>
  <p>
    The city’s largest shopping mall, offering retail shops, restaurants, 
    cinemas, and leisure spaces that serve as a modern lifestyle hub.
  </p>
</div>


        {/* Footer */}
        <footer className="dashboard-footer">
          © 2025 Yellow Card Admin Panel. All Rights Reserved.
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
