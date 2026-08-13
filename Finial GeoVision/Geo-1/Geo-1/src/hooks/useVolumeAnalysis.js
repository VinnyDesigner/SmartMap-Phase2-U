import { useState } from 'react';

export const useVolumeAnalysis = () => {
  const [clickPoints, setClickPoints] = useState([]);
  const [volumeToolActive, setVolumeToolActive] = useState(false);
  const [volumeResult, setVolumeResult] = useState(null);

  const resetVolumeTool = () => {
    setClickPoints([]);
    setVolumeResult(null);
  };

  return {
    clickPoints,
    setClickPoints,
    volumeToolActive,
    setVolumeToolActive,
    volumeResult,
    setVolumeResult,
    resetVolumeTool
  };
};
