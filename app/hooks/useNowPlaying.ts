import { useState, useEffect } from 'react';

export interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
  progressMs?: number;
  durationMs?: number;
}

export function useNowPlaying(intervalMs: number = 10000) {
  const [data, setData] = useState<SpotifyData>({ isPlaying: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/now-playing');
        if (!response.ok) {
          throw new Error('Failed to fetch now playing');
        }
        const result: SpotifyData = await response.json();
        
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setData({ isPlaying: false });
          setLoading(false);
        }
      }
    };

    fetchNowPlaying();
    
    const intervalId = setInterval(fetchNowPlaying, intervalMs);
    
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [intervalMs]);

  return { data, loading };
}
