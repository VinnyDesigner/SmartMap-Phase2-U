import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ABU_DHABI_SPATIAL_DATASET } from '../services/spatialSearchService.js';
import { GIS_CATEGORY_COLORS, getGisCategorySymbolSvg } from '../utils/gisSymbols.js';

export default function LeafletMap({
  activeProject,
  layers,
  selectedLevel,
  selectedBuilding,
  setSelectedBuilding,
  volumeToolActive,
  clickPoints,
  setClickPoints,
  theme,
  activeBasemap = 'light',
  setHoveredCoords,
  setIsHovered,
  setMapZoom,
  addLog,
  showToast,
  mapInstanceRef,
  activeSearchResults = [],
  selectedLocation,
  setSelectedLocation
}) {
  const mapRef = useRef(null);
  const leafletInstance = useRef(null);
  const markersGroupRef = useRef(null);
  const boundaryGroupRef = useRef(null);
  const volumeGroupRef = useRef(null);
  const searchMarkersGroupRef = useRef(null);
  const selectedGraphicsLayerRef = useRef(null);
  const markersMapRef = useRef({});

  // Initialize Leaflet map centered on Abu Dhabi
  useEffect(() => {
    if (!mapRef.current || leafletInstance.current) return;

    // Define bounds for Abu Dhabi (city and immediate surroundings)
    const southWest = L.latLng(24.1, 54.1);
    const northEast = L.latLng(24.7, 54.8);
    const bounds = L.latLngBounds(southWest, northEast);

    const map = L.map(mapRef.current, {
      center: [24.4539, 54.3773],
      zoom: 12,
      zoomControl: false,
      attributionControl: false,
      maxBounds: bounds,
      maxBoundsViscosity: 0.8
    });

    leafletInstance.current = map;
    if (mapInstanceRef) mapInstanceRef.current = map;

    if (setMapZoom) setMapZoom(map.getZoom());

    map.on('zoomend', () => {
      if (setMapZoom) setMapZoom(map.getZoom());
    });

    markersGroupRef.current = L.layerGroup().addTo(map);
    boundaryGroupRef.current = L.layerGroup().addTo(map);
    volumeGroupRef.current = L.layerGroup().addTo(map);

    map.on('mousemove', (e) => {
      setHoveredCoords({
        lat: Number(e.latlng.lat.toFixed(5)),
        lon: Number(e.latlng.lng.toFixed(5)),
        elevation: (Math.sin(e.latlng.lat * 80) * 15 + 42).toFixed(1)
      });
      setIsHovered(true);
    });

    map.on('mouseout', () => {
      setIsHovered(false);
    });

    map.on('click', (e) => {
      if (volumeToolActive) {
        setClickPoints(prev => {
          if (prev.length >= 2) {
            return [{ lat: e.latlng.lat, lon: e.latlng.lng, elevation: 42.5 }];
          }
          const next = [...prev, { lat: e.latlng.lat, lon: e.latlng.lng, elevation: 42.5 }];
          if (next.length === 2) {
            const dLat = (next[1].lat - next[0].lat) * 111000;
            const dLon = (next[1].lon - next[0].lon) * 111000 * Math.cos(next[0].lat * Math.PI / 180);
            const dist = Math.sqrt(dLat * dLat + dLon * dLon).toFixed(1);
            showToast(`Volumetric Cut/Fill Computed: ${dist} m span`);
            addLog('Volume Analysis', `Measured distance between anchor points: ${dist} meters`, 'success');
          }
          return next;
        });
      }
    });

    return () => {
      map.remove();
      leafletInstance.current = null;
      if (mapInstanceRef) mapInstanceRef.current = null;
    };
  }, []);

  // Update base tile layer on theme or activeBasemap change
  useEffect(() => {
    const map = leafletInstance.current;
    if (!map) return;

    if (map._tileLayer) {
      map.removeLayer(map._tileLayer);
    }

    let tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
    let attribution = '&copy; Esri &mdash; World Street Map';

    if (activeBasemap === 'satellite') {
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = '&copy; Esri &mdash; World Imagery';
    } else if (activeBasemap === 'topo') {
      tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap contributors, SRTM &copy; OpenTopoMap';
    } else if (activeBasemap === 'light') {
      tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    } else if (activeBasemap === 'dark') {
      tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    } else if (activeBasemap === 'osm') {
      tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap contributors';
    }

    const tileLayer = L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution: attribution
    }).addTo(map);

    map._tileLayer = tileLayer;
  }, [theme, activeBasemap]);

  // Fly to active project location in Abu Dhabi
  useEffect(() => {
    const map = leafletInstance.current;
    if (!map || !activeProject) return;

    map.flyTo([activeProject.lat, activeProject.lon], 15, {
      duration: 1.5,
      easeLinearity: 0.25
    });
  }, [activeProject]);

  // Render project layers (Buildings, Boundaries, Markers)
  useEffect(() => {
    const map = leafletInstance.current;
    if (!map || !activeProject) return;

    const markersGroup = markersGroupRef.current;
    const boundaryGroup = boundaryGroupRef.current;
    if (!markersGroup || !boundaryGroup) return;

    // 1. Clean initial Abu Dhabi red pin marker (when no operational layers active)
    if (!layers.buildings3D && !layers.projectBoundary && !layers.heatmapOverlay) {
      const redPinHtml = `
        <div style="
          position: relative;
          width: 28px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translate(-50%, -100%);
        ">
          <div style="
            width: 26px;
            height: 26px;
            background: #ef4444;
            border: 2px solid #ffffff;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 4px 14px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="width: 8px; height: 8px; background: #ffffff; border-radius: 50%; transform: rotate(45deg);"></div>
          </div>
        </div>
      `;
      const redPinIcon = L.divIcon({
        html: redPinHtml,
        className: '',
        iconSize: [0, 0]
      });
      L.marker([24.4539, 54.3773], { icon: redPinIcon })
        .bindPopup("<b>Abu Dhabi, UAE</b><br>Capital Region")
        .addTo(markersGroup);
    }

    // 2. Boundary geofence
    if (layers.projectBoundary && activeProject.boundaryCoords) {
      const polygon = L.polygon(activeProject.boundaryCoords, {
        color: '#ef4444',
        weight: 2,
        dashArray: '6, 6',
        fillColor: '#ef4444',
        fillOpacity: 0.12
      }).addTo(boundaryGroup);
      polygon.bindTooltip(`${activeProject.name} Boundary Geofence`, { permanent: false });
    }

    // 2. Slope Heatmap
    if (layers.heatmapOverlay && activeProject.boundaryCoords) {
      L.polygon(activeProject.boundaryCoords, {
        color: '#f97316',
        weight: 1,
        fillColor: '#f97316',
        fillOpacity: 0.35
      }).addTo(boundaryGroup);
    }

    // 3. 3D Buildings
    if (layers.buildings3D && activeProject.buildings) {
      activeProject.buildings.forEach(b => {
        const isSelected = selectedBuilding && selectedBuilding.id === b.id;

        const iconHtml = `
          <div style="
            background: ${isSelected ? '#10b981' : '#00f2fe'};
            color: #040d1a;
            border: 2px solid #ffffff;
            border-radius: 8px;
            padding: 4px 8px;
            font-family: Inter, sans-serif;
            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            transform: translate(-50%, -100%);
          ">
            <span>🏢 ${b.name}</span>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: '',
          iconSize: [0, 0]
        });

        const marker = L.marker([b.lat, b.lon], { icon: customIcon }).addTo(markersGroup);

        marker.on('click', () => {
          setSelectedBuilding(b);
          addLog('BIM View', `Selected structure '${b.name}' (Floors: ${b.floors}, Height: ${b.heightM}m)`, 'info');
          showToast(`Building Selected: ${b.name}`);
        });

        if (b.footprint) {
          const poly = L.polygon(b.footprint, {
            color: isSelected ? '#10b981' : '#00f2fe',
            weight: isSelected ? 3 : 2,
            fillColor: isSelected ? '#10b981' : '#00f2fe',
            fillOpacity: isSelected ? 0.45 : 0.25
          }).addTo(markersGroup);

          poly.on('click', () => {
            setSelectedBuilding(b);
            showToast(`Building Selected: ${b.name}`);
          });
        }
      });
    }
  }, [activeProject, layers, selectedBuilding]);

  // Render Volumetric Tool Anchors & Line
  useEffect(() => {
    const volumeGroup = volumeGroupRef.current;
    if (!volumeGroup) return;

    volumeGroup.clearLayers();

    if (clickPoints.length > 0) {
      clickPoints.forEach((pt, idx) => {
        L.circleMarker([pt.lat, pt.lon], {
          radius: 8,
          color: idx === 0 ? '#00f2fe' : '#f97316',
          fillColor: idx === 0 ? '#00f2fe' : '#f97316',
          fillOpacity: 0.95
        }).addTo(volumeGroup);
      });

      if (clickPoints.length === 2) {
        L.polyline([
          [clickPoints[0].lat, clickPoints[0].lon],
          [clickPoints[1].lat, clickPoints[1].lon]
        ], {
          color: '#f97316',
          weight: 3,
          dashArray: '8, 8'
        }).addTo(volumeGroup);
      }
    }
  }, [clickPoints]);

  // Render Spatial Search Markers
  useEffect(() => {
    const map = leafletInstance.current;
    if (!map) return;

    if (!searchMarkersGroupRef.current) {
      searchMarkersGroupRef.current = L.layerGroup().addTo(map);
    }
    const searchGroup = searchMarkersGroupRef.current;
    searchGroup.clearLayers();
    markersMapRef.current = {};

    const displayResults = (activeSearchResults && activeSearchResults.length > 0)
      ? activeSearchResults
      : [];

    displayResults.forEach(item => {
      const lat = parseFloat(item.lat);
      const lon = parseFloat(item.lon);
      if (isNaN(lat) || isNaN(lon)) return;

      const pinColor = GIS_CATEGORY_COLORS[item.category] || '#1d68f2';
      const iconSvg = getGisCategorySymbolSvg(item.category);
      const isSelected = selectedLocation && selectedLocation.id === item.id;

      const pinHtml = `
        <div id="spatial-pin-${item.id}" class="spatial-marker-pin-wrapper ${isSelected ? 'active-pin' : ''}">
          <div class="spatial-teardrop-pin" style="background: ${pinColor};">
            <div class="spatial-pin-icon-circle">
              ${iconSvg}
            </div>
          </div>
          <div class="spatial-marker-label">${item.title}</div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: pinHtml,
        className: 'spatial-marker-div-icon',
        iconSize: [120, 50],
        iconAnchor: [60, 42]
      });

      const marker = L.marker([lat, lon], { icon: customIcon })
        .addTo(searchGroup);

      markersMapRef.current[item.id] = marker;

      marker.on('click', () => {
        setSelectedLocation({ ...item, locateTrigger: Date.now() });
      });
    });
  }, [activeSearchResults]);

  // Handle Selected Location Focusing & Dedicated GraphicsLayer Symbology Highlight
  useEffect(() => {
    const map = leafletInstance.current;
    if (!map) return;

    // Parse and log selected feature coordinates
    const lat = parseFloat(selectedLocation?.lat);
    const lon = parseFloat(selectedLocation?.lon);

    if (isNaN(lat) || isNaN(lon)) return;

    // Verify AI Search Graphics/Marker Layer exists and clear previous markers
    if (!selectedGraphicsLayerRef.current) {
      selectedGraphicsLayerRef.current = L.layerGroup().addTo(map);
    }
    const highlightGroup = selectedGraphicsLayerRef.current;
    highlightGroup.clearLayers();

    // Smooth pan to location without upward flyTo jump
    const currentZoom = Math.max(map.getZoom(), 13.5);
    map.setView([lat, lon], currentZoom, { animate: true, duration: 0.6 });

    const pinColor = GIS_CATEGORY_COLORS[selectedLocation.category] || '#1d68f2';

    // Category Symbology Marker with Validated SVG Vector Icon
    const iconSvg = getGisCategorySymbolSvg(selectedLocation.category);
    const graphicHtml = `
      <div class="spatial-marker-pin-wrapper active-pin selected-graphic-marker">
        <div class="selected-graphic-pulse"></div>
        <div class="spatial-teardrop-pin selected-pin-body" style="background: ${pinColor};">
          <div class="spatial-pin-icon-circle" style="background: #ffffff; color: ${pinColor};">
            ${iconSvg}
          </div>
        </div>
        <div class="spatial-marker-label active-selected-label">${selectedLocation.title || 'Selected Location'}</div>
      </div>
    `;

    const customGraphicIcon = L.divIcon({
      html: graphicHtml,
      className: 'spatial-marker-div-icon selected-feature-div-icon',
      iconSize: [140, 60],
      iconAnchor: [70, 52]
    });

    L.marker([lat, lon], {
      icon: customGraphicIcon,
      zIndexOffset: 2000
    }).addTo(highlightGroup);

    // Toggle active pin DOM class highlight for background pins
    document.querySelectorAll('.spatial-marker-pin-wrapper').forEach(el => el.classList.remove('active-pin'));
    const activeEl = document.getElementById(`spatial-pin-${selectedLocation.id}`);
    if (activeEl) {
      activeEl.classList.add('active-pin');
    }
  }, [selectedLocation]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', minHeight: '100%', zIndex: 1 }} />;
}
