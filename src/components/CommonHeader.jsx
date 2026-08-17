import React from 'react';
import { Home, Info, Sun, Moon, User, Bookmark } from 'lucide-react';
import leftLogo from '../assets/left.png';
import rightLogo from '../assets/right.png';
import lagIcon from '../assets/lag.svg';
import historyIcon from '../assets/History.svg';
import feedbackIcon from '../assets/share feedback.svg';
import helpIcon from '../assets/help.svg';
import signInIcon from '../assets/sign in.svg';

export default function CommonHeader({
  showMap,
  setShowMap,
  isCategoryDrawerOpen,
  setIsCategoryDrawerOpen,
  lang,
  setLang,
  theme,
  setTheme,
  isProfileOpen,
  setIsProfileOpen,
  profileMenuRef,
  isLoggedIn,
  setIsLoggedIn,
  t,
  handleSearchSubmit,
  showToast,
  setIsSidebarOpen,
  setActiveTab
}) {
  return (
    <header className="landing-header">
      {/* Left logo */}
      <a href="#" className="landing-logo-left" onClick={(e) => { e.preventDefault(); setShowMap(false); }}>
        <img src={leftLogo} alt="Department of Government Enablement" style={{ height: '38px', objectFit: 'contain' }} />
      </a>

      {/* Center Navigation */}
      <nav className="landing-nav-center">
        <button 
          className={`landing-nav-item ${!showMap ? 'active' : ''}`} 
          onClick={() => setShowMap(false)}
        >
          <Home size={14} /> {t.home}
        </button>
        <button className="landing-nav-item" onClick={() => handleSearchSubmit('')}>
          <Info size={14} /> {t.aboutUs}
        </button>
      </nav>

      {/* Right Controls */}
      <div className="landing-controls-right">
        <button className="landing-lang-btn" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}>
          {lang === 'en' ? (
            <img src={lagIcon} alt="Arabic" style={{ width: '18px', height: '18px', filter: theme === 'dark' ? 'invert(1)' : 'none' }} />
          ) : (
            <span style={{ color: '#022E5B', fontWeight: 600 }}>En</span>
          )}
        </button>
        
        <button className="landing-icon-control" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        <div className="profile-menu-wrapper" ref={profileMenuRef}>
          <button 
            className={`landing-icon-control ${isProfileOpen ? 'landing-icon-control--active' : ''}`} 
            onClick={() => setIsProfileOpen(prev => !prev)}
            title="Profile"
          >
            <User size={18} />
          </button>

          {isProfileOpen && (
            <div className="profile-dropdown">
              <button 
                className="profile-item" 
                onClick={() => { 
                  setIsProfileOpen(false); 
                  setShowMap(true);
                  if (setIsSidebarOpen) setIsSidebarOpen(true);
                  if (setActiveTab) setActiveTab('history');
                  showToast("Search History Opened"); 
                }}
              >
                <img src={historyIcon} alt="History" className="profile-item-icon" />
                <span>History</span>
              </button>
              {isLoggedIn && (
                <button 
                  className="profile-item" 
                  onClick={() => { 
                    setIsProfileOpen(false); 
                    setShowMap(true);
                    if (setIsSidebarOpen) setIsSidebarOpen(true);
                    if (setActiveTab) setActiveTab('collections');
                    showToast("My Collections Opened"); 
                  }}
                >
                  <Bookmark size={16} style={{ color: '#022E5B', marginRight: '8px', flexShrink: 0 }} />
                  <span>My Collections</span>
                </button>
              )}
              <button className="profile-item" onClick={() => { setIsProfileOpen(false); showToast("Share Feedback modal opened"); }}>
                <img src={feedbackIcon} alt="Feedback" className="profile-item-icon" />
                <span>Share Feedback</span>
              </button>
              <button className="profile-item" onClick={() => { setIsProfileOpen(false); showToast("Help & Support documentation"); }}>
                <img src={helpIcon} alt="Help" className="profile-item-icon" />
                <span>Help</span>
              </button>
              <button 
                className="profile-item profile-item--signin" 
                onClick={() => { 
                  setIsProfileOpen(false); 
                  setIsLoggedIn(prev => !prev);
                  showToast(!isLoggedIn ? "Signed In Successfully" : "Signed Out"); 
                }}
              >
                <img src={signInIcon} alt="Sign In" className="profile-item-icon" />
                <span>{isLoggedIn ? 'Sign Out' : 'Sign In'}</span>
              </button>
            </div>
          )}
        </div>

        <div className="landing-spatial-logo">
          <img src={rightLogo} alt="Abu Dhabi Spatial Data" style={{ height: '42px', objectFit: 'contain' }} />
        </div>
      </div>

      {/* Custom Bottom Tech Border */}
      <div className="header-bottom-border-container">
        <svg width="100%" height="64" viewBox="0 0 1000 64" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path 
            d="M 0 48 L 20 64 L 300 64 L 315 54 L 685 54 L 700 64 L 980 64 L 1000 48" 
            stroke="rgba(59, 130, 246, 0.4)" 
            strokeWidth="1.5" 
            vectorEffect="non-scaling-stroke"
            fill="none"
          />
        </svg>
      </div>
    </header>
  );
}
