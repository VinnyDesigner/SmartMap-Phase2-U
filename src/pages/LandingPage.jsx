import React, { useState } from 'react';
import { ArrowUp, GraduationCap, Heart, Car, Trees, LayoutGrid, Plus, Map, Info, Brain, Send, ChevronLeft, ChevronRight, Zap, Compass, Trophy, Leaf, HardHat, Home, ShieldCheck, Sun, Hammer, Flame, Sprout, Briefcase } from 'lucide-react';
import FourPointStar from '../components/FourPointStar.jsx';
import CommonHeader from '../components/CommonHeader.jsx';
import CategoryDrawer from '../components/CategoryDrawer.jsx';
import FoldText from '../components/FoldText.jsx';

export default function LandingPage({
  activeBasemap,
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
  handleUnifiedSearch,
  searchQuery,
  setSearchQuery,
  categorySearchQuery,
  setCategorySearchQuery,
  expandedCategory,
  setExpandedCategory,
  selectedSubcategories,
  setSelectedSubcategories,
  showToast,
  toastMessage,
  setIsSidebarOpen,
  setActiveTab
}) {
  const [chipPage, setChipPage] = useState(0);
  const [isMobileDragActive, setIsMobileDragActive] = useState(false);

  return (
    <div className="hero-landing">

      <div className="hero-overlay" />

      {/* TOP FLOATING PORTAL HEADER */}
      <CommonHeader
        activeBasemap={activeBasemap}
        showMap={showMap}
        setShowMap={setShowMap}
        isCategoryDrawerOpen={isCategoryDrawerOpen}
        setIsCategoryDrawerOpen={setIsCategoryDrawerOpen}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        profileMenuRef={profileMenuRef}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        t={t}
        handleSearchSubmit={handleSearchSubmit}
        showToast={showToast}
        setIsSidebarOpen={setIsSidebarOpen}
        setActiveTab={setActiveTab}
      />

      {/* HERO SECTION */}
      <div className="landing-hero">
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <h1 className="landing-main-title">Geo Vision</h1>
          <FourPointStar className="sparkle-decor-1" size={26} />
          <FourPointStar className="sparkle-decor-2" size={16} />
        </div>

        <h2 className="landing-sub-title">{t.subTitle}</h2>
        <p className="landing-description">{t.description}</p>

        {/* ── HIGH FIDELITY GLASSMORPHIC SEARCH CARD ── */}
        <div className="landing-search-card-wrapper">
          <div className="landing-search-card">
            {/* Tech SVG Border Overlay */}
            <div className="tech-card-border-container">
              <svg width="100%" height="100%" viewBox="0 0 800 170" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                {/* Outer Glow & Border */}
                <path
                  d="M 35 6 
                   L 240 6 
                   L 255 14 
                   L 545 14 
                   L 560 6 
                   L 765 6 
                   L 794 35 
                   L 794 135 
                   L 765 164 
                   L 560 164 
                   L 545 156 
                   L 255 156 
                   L 240 164 
                   L 35 164 
                   L 6 135 
                   L 6 35 Z"
                  stroke="rgba(59, 130, 246, 0.4)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Animated stroke running from the left edge (top/bottom) */}
                <path
                  d="M 6 85 L 6 35 L 35 6 L 240 6 L 255 14 L 545 14 L 560 6 L 765 6 L 794 35 L 794 85"
                  className="tech-border-flow flow-from-left"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 6 85 L 6 135 L 35 164 L 240 164 L 255 156 L 545 156 L 560 164 L 765 164 L 794 135 L 794 85"
                  className="tech-border-flow flow-from-left"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Animated stroke running from the right edge (top/bottom) */}
                <path
                  d="M 794 85 L 794 35 L 765 6 L 560 6 L 545 14 L 255 14 L 240 6 L 35 6 L 6 35 L 6 85"
                  className="tech-border-flow flow-from-right"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 794 85 L 794 135 L 765 164 L 560 164 L 545 156 L 255 156 L 240 164 L 35 164 L 6 135 L 6 85"
                  className="tech-border-flow flow-from-right"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Inner Accent Line */}
                <path
                  d="M 40 10 
                   L 236 10 
                   L 251 18 
                   L 549 18 
                   L 564 10 
                   L 760 10 
                   L 790 40 
                   L 790 130 
                   L 760 160 
                   L 564 160 
                   L 549 152 
                   L 251 152 
                   L 236 160 
                   L 40 160 
                   L 10 130 
                   L 10 40 Z"
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Neon Cyan Highlights */}
                <path
                  d="M 25 6 L 6 25 L 6 60"
                  stroke="#06B6D4"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 775 164 L 794 145 L 794 110"
                  stroke="#06B6D4"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 60 164 L 35 164 L 6 135 L 6 100"
                  stroke="#06B6D4"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 740 6 L 765 6 L 794 35 L 794 70"
                  stroke="#06B6D4"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            {/* Search Row Layout: Input Container */}
            <div className="landing-search-row">
              {/* Input Form Box */}
              <form
                className="landing-search-container"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearchSubmit();
                }}
              >
                {/* Sparkle Icon with spinning loader effect */}
                <div className="search-star-loader-wrapper">
                  <div className="search-star-loader"></div>
                  <FourPointStar className="landing-search-sparkle" size={16} />
                </div>

                {/* Vertical Separator */}
                <div className="landing-search-separator" />

                <input
                  type="text"
                  className="landing-search-input"
                  placeholder={t.searchPlaceholder || 'Ask Smart Map Anything...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Pill-shaped Search Button */}
                <div className="landing-search-btn-wrapper">
                  <button
                    type="submit"
                    className="landing-search-btn-pill"
                    disabled={!searchQuery.trim()}
                  >
                    <span className="search-btn-text">Search</span>
                    <Send size={15} className="search-btn-icon" />
                  </button>
                </div>
              </form>
            </div>

            {/* Category chips */}
            <div className="landing-chips-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '4px', width: '100%' }}>
              {isMobileDragActive ? (
                <div className="landing-chips-wrapper mobile-drag-active">
                  <button className="landing-chip-btn landing-chip-toggle-btn" onClick={() => setIsMobileDragActive(false)} title="Collapse">
                    <ChevronLeft size={16} /> <span>Back</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Education' })}>
                    <GraduationCap size={15} /> <span>{t.education}</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Healthcare' })}>
                    <Heart size={15} /> <span>{t.healthcare}</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Transport' })}>
                    <Car size={15} /> <span>{t.transportation}</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Environment' })}>
                    <Leaf size={15} /> <span>{t.environment}</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Government Services' })}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 22V11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11" />
                      <path d="M12 2v4" />
                      <path d="M8 6h8" />
                      <path d="M10 18h4" />
                      <path d="M10 14h4" />
                    </svg>
                    <span>{t.government}</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Tourism' })}>
                    <Compass size={15} /> <span>{t.tourism}</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Infrastructure' })}>
                    <HardHat size={15} /> <span>{t.infrastructure}</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Housing' })}>
                    <Home size={15} /> <span>{t.housing}</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Public Safety' })}>
                    <ShieldCheck size={15} /> <span>{t.publicSafety}</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Utilities' })}>
                    <Zap size={15} /> <span>{t.utilities}</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Climate' })}>
                    <Sun size={15} /> <span>{t.climate}</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Construction' })}>
                    <Hammer size={15} /> <span>{t.construction}</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Energy' })}>
                    <Flame size={15} /> <span>{t.energy}</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Parks' })}>
                    <Trees size={15} /> <span>{t.parks}</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Agriculture' })}>
                    <Sprout size={15} /> <span>{t.agriculture}</span>
                  </button>
                  <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Employment' })}>
                    <Briefcase size={15} /> <span>{t.employment}</span>
                  </button>
                </div>
              ) : (
                <div className="landing-chips-wrapper">
                  {chipPage === 0 && (
                    <>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Education' })}>
                        <GraduationCap size={15} /> <span>{t.education}</span>
                      </button>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Healthcare' })}>
                        <Heart size={15} /> <span>{t.healthcare}</span>
                      </button>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Transport' })}>
                        <Car size={15} /> <span>{t.transportation}</span>
                      </button>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Environment' })}>
                        <Leaf size={15} /> <span>{t.environment}</span>
                      </button>
                      <button className="landing-chip-btn landing-chip-more-btn" onClick={() => {
                        if (window.innerWidth <= 767) {
                          setIsMobileDragActive(true);
                          if (setIsCategoryDrawerOpen) setIsCategoryDrawerOpen(true);
                        } else {
                          setChipPage(1);
                        }
                      }}>
                        <span>{t.moreChips || '12 More'}</span> <LayoutGrid size={15} />
                      </button>
                    </>
                  )}

                  {chipPage === 1 && (
                    <>
                      <button className="landing-chip-btn landing-chip-toggle-btn" onClick={() => setChipPage(0)} title="Previous Page">
                        <ChevronLeft size={16} />
                      </button>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Government Services' })}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 22V11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11" />
                          <path d="M12 2v4" />
                          <path d="M8 6h8" />
                          <path d="M10 18h4" />
                          <path d="M10 14h4" />
                        </svg>
                        <span>{t.government}</span>
                      </button>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Tourism' })}>
                        <Compass size={15} /> <span>{t.tourism}</span>
                      </button>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Infrastructure' })}>
                        <HardHat size={15} /> <span>{t.infrastructure}</span>
                      </button>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Housing' })}>
                        <Home size={15} /> <span>{t.housing}</span>
                      </button>
                      <button className="landing-chip-btn landing-chip-toggle-btn" onClick={() => setChipPage(2)} title="Next Page">
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}

                  {chipPage === 2 && (
                    <>
                      <button className="landing-chip-btn landing-chip-toggle-btn" onClick={() => setChipPage(1)} title="Previous Page">
                        <ChevronLeft size={16} />
                      </button>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Public Safety' })}>
                        <ShieldCheck size={15} /> <span>{t.publicSafety}</span>
                      </button>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Utilities' })}>
                        <Zap size={15} /> <span>{t.utilities}</span>
                      </button>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Climate' })}>
                        <Sun size={15} /> <span>{t.climate}</span>
                      </button>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Construction' })}>
                        <Hammer size={15} /> <span>{t.construction}</span>
                      </button>
                      <button className="landing-chip-btn landing-chip-toggle-btn" onClick={() => setChipPage(3)} title="Next Page">
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}

                  {chipPage === 3 && (
                    <>
                      <button className="landing-chip-btn landing-chip-toggle-btn" onClick={() => setChipPage(2)} title="Previous Page">
                        <ChevronLeft size={16} />
                      </button>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Energy' })}>
                        <Flame size={15} /> <span>{t.energy}</span>
                      </button>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Parks' })}>
                        <Trees size={15} /> <span>{t.parks}</span>
                      </button>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Agriculture' })}>
                        <Sprout size={15} /> <span>{t.agriculture}</span>
                      </button>
                      <button className="landing-chip-btn" onClick={() => handleUnifiedSearch({ category: 'Employment' })}>
                        <Briefcase size={15} /> <span>{t.employment}</span>
                      </button>
                      <button className="landing-chip-btn landing-chip-toggle-btn" onClick={() => setChipPage(0)} title="Next Page">
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Stepper Dots */}
              <div className="landing-chips-stepper">
                <button
                  className={`stepper-dot ${chipPage === 0 ? 'active' : ''}`}
                  onClick={() => setChipPage(0)}
                  title="Page 1"
                />
                <button
                  className={`stepper-dot ${chipPage === 1 ? 'active' : ''}`}
                  onClick={() => setChipPage(1)}
                  title="Page 2"
                />
                <button
                  className={`stepper-dot ${chipPage === 2 ? 'active' : ''}`}
                  onClick={() => setChipPage(2)}
                  title="Page 3"
                />
                <button
                  className={`stepper-dot ${chipPage === 3 ? 'active' : ''}`}
                  onClick={() => setChipPage(3)}
                  title="Page 4"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Explore Map Button */}
        <div className="landing-explore-btn-wrapper">
          <button className="landing-explore-btn" onClick={() => handleSearchSubmit('')}>
            {t.exploreMap} <Map size={18} />
          </button>
        </div>
      </div>

      {/* RIGHT SIDE CATEGORIES DRAWER */}
      <CategoryDrawer
        isCategoryDrawerOpen={isCategoryDrawerOpen}
        setIsCategoryDrawerOpen={setIsCategoryDrawerOpen}
        categorySearchQuery={categorySearchQuery}
        setCategorySearchQuery={setCategorySearchQuery}
        expandedCategory={expandedCategory}
        setExpandedCategory={setExpandedCategory}
        selectedSubcategories={selectedSubcategories}
        setSelectedSubcategories={setSelectedSubcategories}
        handleUnifiedSearch={handleUnifiedSearch}
        t={t}
      />

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="toast-notification">
          <Info size={16} style={{ color: 'var(--accent-cyan)' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
