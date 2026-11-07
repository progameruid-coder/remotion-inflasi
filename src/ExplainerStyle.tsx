import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface SubtitleItem {
  startFrame: number;
  endFrame: number;
  idText: string;
  enText: string;
  activeWord: string;
  topBadge?: string;
  callout?: {
    label: string;
    value: string;
    type: 'arrow-up' | 'arrow-down' | 'bar';
  };
}

const SCENE_DATA: SubtitleItem[] = [
  {
    startFrame: 0,
    endFrame: 75,
    idText: 'Kalau uang dicetak makin banyak,',
    enText: 'If more and more money is printed,',
    activeWord: 'dicetak',
    topBadge: 'CETAK UANG',
    callout: { label: 'JUMLAH UANG', value: '+300%', type: 'arrow-up' },
  },
  {
    startFrame: 75,
    endFrame: 150,
    idText: 'harga barang otomatis akan melonjak.',
    enText: 'commodity prices will automatically surge.',
    activeWord: 'melonjak.',
    topBadge: 'INFLASI TINGGI',
    callout: { label: 'HARGA PASAR', value: '+150%', type: 'arrow-up' },
  },
  {
    startFrame: 150,
    endFrame: 225,
    idText: 'Akibatnya, daya beli kamu bakal tergerus,',
    enText: 'As a result, your purchasing power drops,',
    activeWord: 'tergerus,',
    topBadge: 'DAYA BELI',
    callout: { label: 'NILAI TABUNGAN', value: '-50%', type: 'arrow-down' },
  },
  {
    startFrame: 225,
    endFrame: 300,
    idText: 'inilah yang disebut dengan inflasi!',
    enText: 'this is what we call inflation!',
    activeWord: 'inflasi!',
    topBadge: 'INFLASI',
    callout: { label: 'KERUGIAN', value: 'DRASTIS', type: 'bar' },
  },
];

export const ExplainerStyle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambil data adegan berdasarkan frame berjalan
  const currentScene =
    SCENE_DATA.find((s) => frame >= s.startFrame && frame < s.endFrame) ||
    SCENE_DATA[0];

  const sceneProgress = frame - currentScene.startFrame;

  // Animasi pop-in untuk judul istilah di atas (Gold text)
  const badgeScale = spring({
    frame: sceneProgress,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 200 },
  });

  // Animasi naiknya nilai diagram/panah
  const calloutY = interpolate(
    spring({ frame: sceneProgress, fps, config: { damping: 15 } }),
    [0, 1],
    [30, 0]
  );
  const calloutOpacity = interpolate(sceneProgress, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#161922',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '90px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 1. TOP HEADER ISTILAH GAYA VIDEO YT (GOLD / BOLD OUTLINE) */}
      <div style={{ height: 100, display: 'flex', alignItems: 'center' }}>
        {currentScene.topBadge && (
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              letterSpacing: 2,
              color: '#ffd000',
              textTransform: 'uppercase',
              textShadow:
                '0 4px 0 #8c5a00, 0 8px 16px rgba(0,0,0,0.8), -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000',
              transform: `scale(${badgeScale})`,
              textAlign: 'center',
            }}
          >
            {currentScene.topBadge}
          </div>
        )}
      </div>

      {/* 2. VISUAL DIAGRAM TEKNIKAL / CALLOUT (GAYA PANAH & UKURAN) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 600,
          position: 'relative',
          width: '100%',
        }}
      >
        {/* Lingkaran Pusat Diagram */}
        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: '50%',
            border: '6px dashed rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Nilai / Ikon Tengah */}
          <div
            style={{
              fontSize: 90,
              fontWeight: 900,
              color: '#ffffff',
              textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            }}
          >
            Rp
          </div>

          {/* Callout Mengambang dengan Panah (Gaya Video Contoh) */}
          {currentScene.callout && (
            <div
              style={{
                position: 'absolute',
                top: -40,
                right: -30,
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '3px solid #38bdf8',
                borderRadius: 16,
                padding: '12px 22px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                opacity: calloutOpacity,
                transform: `translateY(${calloutY}px)`,
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#94a3b8',
                  letterSpacing: 1,
                }}
              >
                {currentScene.callout.label}
              </span>
              <span
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  color:
                    currentScene.callout.type === 'arrow-up'
                      ? '#ef4444'
                      : '#22c55e',
                  marginTop: 2,
                }}
              >
                {currentScene.callout.value}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 3. DUAL KINETIC SUBTITLE (INDO TEBAL + INGGRIS KECIL) */}
      <div
        style={{
          minHeight: 220,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        {/* Teks Bahasa Indonesia dengan Highlight Hijau Neon seperti di video */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1.3,
            textTransform: 'uppercase',
            maxWidth: 950,
            textShadow:
              '0 3px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, 0 6px 14px rgba(0,0,0,0.9)',
          }}
        >
          {currentScene.idText.split(' ').map((word, i) => {
            const isMatch = word
              .toLowerCase()
              .includes(currentScene.activeWord.toLowerCase());
            return (
              <span
                key={i}
                style={{
                  color: isMatch ? '#22c55e' : '#ffffff',
                  marginRight: 12,
                  display: 'inline-block',
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Teks Bahasa Inggris di bawahnya */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.7)',
            marginTop: 14,
            fontStyle: 'italic',
            letterSpacing: 0.5,
            textShadow: '0 2px 6px rgba(0,0,0,0.8)',
          }}
        >
          {currentScene.enText}
        </div>
      </div>
    </div>
  );
};
