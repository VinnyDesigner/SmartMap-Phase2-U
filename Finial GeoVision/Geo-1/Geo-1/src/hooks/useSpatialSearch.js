import { useState } from 'react';
import { searchSpatialData } from '../services/spatialSearchService.js';

export const useSpatialSearch = () => {
  const [activeSearchResults, setActiveSearchResults] = useState([]);
  const [activeSearchFilterTag, setActiveSearchFilterTag] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchHistory, setSearchHistory] = useState([
    { id: 1, text: 'Schools within 2 km', timestamp: 'Just now' },
    { id: 2, text: 'Hospitals Near Me', timestamp: '10m ago' },
    { id: 3, text: 'Government Offices', timestamp: '1h ago' },
    { id: 4, text: 'Restaurants', timestamp: '2h ago' },
    { id: 5, text: 'Hospitals Near Me', timestamp: 'Yesterday' }
  ]);

  const executeSpatialSearch = (query, category) => {
    const results = searchSpatialData(query, category);
    setSelectedLocation(null);
    setActiveSearchResults(results);
    const tagLabel = category || query || 'All Locations';
    setActiveSearchFilterTag({ query, category, label: tagLabel });
    return results;
  };

  return {
    activeSearchResults,
    setActiveSearchResults,
    activeSearchFilterTag,
    setActiveSearchFilterTag,
    selectedLocation,
    setSelectedLocation,
    searchHistory,
    setSearchHistory,
    executeSpatialSearch
  };
};
