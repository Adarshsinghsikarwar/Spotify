import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="nav-arrows">
        <button className="arrow-btn">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button className="arrow-btn">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      
      <div className="user-actions">
        <button className="upgrade-btn">Upgrade</button>
        <button className="profile-btn">
          <div className="profile-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zM12 6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"/>
            </svg>
          </div>
          <span>Account</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
