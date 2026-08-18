import React from 'react';

export default function GeoLoader() {
  return (
    <div className="search-star-loader-wrapper">
      <div className="loader">
        <div className="box"></div>
        <svg viewBox="0 0 100 100" width="30" height="30" style={{ position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <mask id="clipping">
              <polygon points="50,10 90,90 10,90" />
              <polygon points="50,10 90,90 10,90" />
              <polygon points="50,10 90,90 10,90" />
              <polygon points="50,10 90,90 10,90" />
              <polygon points="50,10 90,90 10,90" />
              <polygon points="50,10 90,90 10,90" />
              <polygon points="50,10 90,90 10,90" />
            </mask>
          </defs>
        </svg>
      </div>
    </div>
  );
}
