import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import subtitles from './subtitles.json';

export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Mencari subtitle aktif berdasarkan waktu audio/video
  const currentSub = subtitles.find(
    (s) => currentTime >= s.start && currentTime <= s.end
  );

  if (!currentSub) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 140,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '0 40px',
        boxSizing: 'border-box',
        zIndex: 100,
      }}
    >
      <span
        style={{
          backgroundColor: '#0f172a',
          color: '#facc15', // Kuning kartun terang
          fontSize: 44,
          fontWeight: 900,
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '18px 30px',
          borderRadius: 24,
          border: '4px solid #000000',
          boxShadow: '0 8px 0px #000000', // Efek bayangan tegas kartun pop-art
          maxWidth: '90%',
          lineHeight: 1.35,
        }}
      >
        {currentSub.text}
      </span>
    </div>
  );
};
