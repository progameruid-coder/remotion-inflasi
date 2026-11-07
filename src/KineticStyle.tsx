import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface SubtitleItem {
  startFrame: number;
  endFrame: number;
  textId: string;
  highlightWord?: string;
  textEn: string;
}

const SUBTITLES: SubtitleItem[] = [
  {
    startFrame: 0,
    endFrame: 60,
    textId: 'Kalau kamu lihat mesin jahit,',
    highlightWord: 'lihat',
    textEn: 'When you look at a sewing machine,',
  },
  {
    startFrame: 60,
    endFrame: 120,
    textId: 'kamu pasti ngira jarumnya kerja',
    highlightWord: 'jarumnya',
    textEn: 'you probably think the needle works',
  },
  {
    startFrame: 120,
    endFrame: 180,
    textId: 'kayak jarum tangan:',
    highlightWord: 'jarum tangan:',
    textEn: 'like a hand needle:',
  },
  {
    startFrame: 180,
    endFrame: 240,
    textId: 'nusuk, tembus, tarik benang.',
    highlightWord: 'nusuk,',
    textEn: 'piercing, going through, pulling the thread.',
  },
  {
    startFrame: 240,
    endFrame: 300,
    textId: 'Tapi, jarum mesin nggak pernah tembus!',
    highlightWord: 'nggak pernah',
    textEn: 'But the machine needle never goes through!',
  },
];

export const KineticStyle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeSub = SUBTITLES.find(
    (s) => frame >= s.startFrame && frame < s.endFrame
  );

  const subFrame = activeSub ? frame - activeSub.startFrame : 0;
  const popScale = spring({
    frame: subFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 220 },
  });

  const needleY = interpolate(
    Math.sin((frame / 12) * Math.PI),
    [-1, 1],
    [-80, 80]
  );

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#111317',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '80px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          backgroundColor: '#ff3b30',
          padding: '8px 24px',
          borderRadius: 24,
          fontWeight: 800,
          fontSize: 22,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          boxShadow: '0 4px 15px rgba(255, 59, 48, 0.4)',
        }}
      >
        Mekanisme 3D
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 500,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 14,
            height: 280,
            backgroundColor: '#d1d5db',
            borderRadius: '6px 6px 0 0',
            transform: `translateY(${needleY}px)`,
            boxShadow: '0 0 20px rgba(255,255,255,0.2)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: -24,
              left: 0,
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '24px solid #d1d5db',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -10,
              left: '50%',
              width: 6,
              height: 120,
              backgroundColor: '#ff2a2a',
              borderRadius: 3,
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 60,
            width: 600,
            height: 16,
            backgroundColor: '#2563eb',
            borderRadius: 8,
            boxShadow: '0 8px 20px rgba(37, 99, 235, 0.5)',
          }}
        />
      </div>

      <div
        style={{
          minHeight: 180,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          transform: `scale(${popScale})`,
          padding: '0 20px',
        }}
      >
        {activeSub && (
          <>
            <div
              style={{
                fontSize: 46,
                fontWeight: 900,
                lineHeight: 1.25,
                textShadow: '0 4px 18px rgba(0,0,0,0.9)',
                color: '#ffffff',
                maxWidth: 900,
              }}
            >
              {activeSub.textId.split(' ').map((word, i) => {
                const isHighlight =
                  activeSub.highlightWord &&
                  word.toLowerCase().includes(activeSub.highlightWord.toLowerCase());
                return (
                  <span
                    key={i}
                    style={{
                      color: isHighlight ? '#ffcc00' : '#ffffff',
                      marginRight: 10,
                      
