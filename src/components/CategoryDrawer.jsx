import React from 'react';
import { X, Search, ChevronRight } from 'lucide-react';
import { CATEGORY_TREE } from '../config/constants.js';

export default function CategoryDrawer({
  isCategoryDrawerOpen,
  setIsCategoryDrawerOpen,
  categorySearchQuery,
  setCategorySearchQuery,
  expandedCategory,
  setExpandedCategory,
  selectedSubcategories,
  setSelectedSubcategories,
  handleUnifiedSearch,
  t
}) {
  return (
    <>
      {/* BACKDROP OVERLAY WHEN DRAWER IS OPEN */}
      <div
        className={`landing-drawer-backdrop ${isCategoryDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsCategoryDrawerOpen(false)}
      />

      {/* SVG CLIP PATH DEFINITION FOR CATEGORY DRAWER WITH REDUCED TOP AND BOTTOM NOTCH DEPTH */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <clipPath id="categoryDrawerTopBottomNotchClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.030 Q 0,0 0.04,0 L 0.28,0 Q 0.30,0 0.305,0.003 L 0.33,0.013 Q 0.34,0.015 0.35,0.015 L 0.65,0.015 Q 0.66,0.015 0.67,0.013 L 0.695,0.003 Q 0.70,0 0.72,0 L 0.96,0 Q 1,0 1,0.030 L 1,0.970 Q 1,1 0.96,1 L 0.72,1 Q 0.70,1 0.695,0.997 L 0.67,0.987 Q 0.66,0.985 0.65,0.985 L 0.35,0.985 Q 0.34,0.985 0.33,0.987 L 0.305,0.997 Q 0.30,1 0.28,1 L 0.04,1 Q 0,1 0,0.970 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* RIGHT SIDE CATEGORIES DRAWER */}
      <div className={`landing-categories-drawer ${isCategoryDrawerOpen ? 'open' : ''}`}>
        {/* DEDICATED PULSATING WHITE INNER GLOW OVERLAY */}
        <div className="category-drawer-inner-glow" />

        {/* Static White SVG Border Stroke Overlay matching bottom panel */}
        <div className="category-drawer-border-container">
          <svg viewBox="0 0 1 1" preserveAspectRatio="none">
            <path
              d="M 0,0.030 Q 0,0 0.04,0 L 0.28,0 Q 0.30,0 0.305,0.003 L 0.33,0.013 Q 0.34,0.015 0.35,0.015 L 0.65,0.015 Q 0.66,0.015 0.67,0.013 L 0.695,0.003 Q 0.70,0 0.72,0 L 0.96,0 Q 1,0 1,0.030 L 1,0.970 Q 1,1 0.96,1 L 0.72,1 Q 0.70,1 0.695,0.997 L 0.67,0.987 Q 0.66,0.985 0.65,0.985 L 0.35,0.985 Q 0.34,0.985 0.33,0.987 L 0.305,0.997 Q 0.30,1 0.28,1 L 0.04,1 Q 0,1 0,0.970 Z"
              className="map-ai-panel-border-stroke"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="drawer-header">
          <h3 className="drawer-title">{t.categories}</h3>
          <button className="drawer-close-btn" onClick={() => setIsCategoryDrawerOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="drawer-search-wrapper">
          <input
            type="text"
            className="drawer-search-input"
            placeholder={t.search}
            value={categorySearchQuery}
            onChange={(e) => setCategorySearchQuery(e.target.value)}
          />
          <Search size={14} className="drawer-search-icon" />
        </div>

        <div className="drawer-accordion-list">
          {CATEGORY_TREE
            .filter(cat =>
              !categorySearchQuery ||
              cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
              cat.subcategories.some(sub => sub.toLowerCase().includes(categorySearchQuery.toLowerCase()))
            )
            .map(cat => {
              const isExpanded = expandedCategory === cat.name;
              return (
                <div key={cat.id} className="drawer-accordion-item">
                  <div
                    className={`drawer-accordion-header ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => setExpandedCategory(isExpanded ? null : cat.name)}
                  >
                    <ChevronRight size={14} className={`accordion-arrow ${isExpanded ? 'rotated' : ''}`} />
                    <span>{t.getCatName(cat.name)}</span>
                  </div>

                  {isExpanded && (
                    <div className="drawer-subcategories-list">
                      {cat.subcategories.map(subcat => (
                        <label key={subcat} className="drawer-checkbox-item">
                          <input
                            type="checkbox"
                            checked={!!selectedSubcategories[subcat]}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setSelectedSubcategories(prev => ({
                                ...prev,
                                [subcat]: checked
                              }));
                              if (checked) {
                                handleUnifiedSearch({ category: subcat });
                                setIsCategoryDrawerOpen(false);
                              }
                            }}
                          />
                          <span>{t.getSubcatName(subcat)}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
