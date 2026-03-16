import { Link } from "react-router";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="custom-navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
           <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" color="#1db954">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.303c-.218.358-.684.471-1.042.253-2.822-1.724-6.375-2.114-10.559-1.157-.409.094-.82-.16-.914-.569-.094-.409.16-.82.569-.914 4.582-1.048 8.513-.598 11.693 1.346.358.219.471.684.253 1.041zm1.468-3.26c-.274.446-.856.59-1.302.316-3.229-1.984-8.151-2.56-11.968-1.402-.501.152-1.028-.13-1.18-.631-.152-.501.13-1.028.631-1.18 4.381-1.328 9.805-.675 13.503 1.597.446.274.59.856.316 1.302zm.128-3.414c-3.874-2.3-10.264-2.513-13.992-1.383-.594.18-1.224-.161-1.404-.755-.18-.595.161-1.224.755-1.404 4.29-1.302 11.353-1.055 15.82 1.597.534.317.708 1.004.391 1.538-.317.534-1.004.708-1.538.391z"/>
          </svg>
          <span className="brand-name">Spotify</span>
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/upload">Upload</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/library">Library</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <button className="auth-btn login-btn">Log in</button>
        <button className="auth-btn signup-btn">Sign up</button>
      </div>
    </nav>
  );
};

export default Navbar;
