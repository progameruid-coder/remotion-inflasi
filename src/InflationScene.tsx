import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Subtitles } from './Subtitles';

export const InflationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animasi pop-up karakter di awal
  const popSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // Animasi naiknya angka harga (mulai frame 250 hingga 550)
  const priceCount = Math.round(
    interpolate(frame, [250, 550], [50000, 185000], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // Animasi ikon berganti sesuai fase penjelasan 60 detik
  // Detik 0-14: Keranjang belanja | Detik 14-35: Burger membesar | Detik 35-48: Mesin uang | Detik 48-60: Investasi emas
  const currentIcon =
    frame < 420
      ? '🛒'
      : frame < 1050
      ? '🍔'
      : frame < 1440
      ? '🖨️ 💸'
      : '📈 🪙';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#38bdf8', // Biru kartun cerah
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* File Audio Voiceover di folder public */}
      <Audio src={staticFile('voiceover.mp3')} />

      {/* Label Badge Tema Kartun */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          backgroundColor: '#ef4444',
          color: '#ffffff',
          padding: '14px 32px',
          borderRadius: 24,
          fontWeight: 900,
          fontSize: 32,
          border: '4px solid #000000',
          boxShadow: '0 8px 0px #000000',
          letterSpacing: 2,
        }}
      >
        EKONOMI SERU 💡
      </div>

      {/* Area Visual Ilustrasi Kartun */}
      <div
        style={{
          transform: `scale(${popSpring})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* Ikon Karakter / Objek Kartun */}
        <div
          style={{
            fontSize: 170,
            filter: 'drop-shadow(0 16px 12px rgba(0,0,0,0.25))',
            userSelect: 'none',
          }}
        >
          {currentIcon}
        </div>

        {/* Kartu Display Nilai / Harga Bergaya Komik */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '24px 44px',
            borderRadius: 30,
            border: '5px solid #000000',
            boxShadow: '0 10px 0px #000000',
            textAlign: 'center',
            minWidth: 420,
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: '#64748b',
              marginBottom: 6,
            }}
          >
            Indeks Harga Belanja:
          </div>
          <div
            style={{
              fontSize: 62,
              fontWeight: 900,
              color: '#0f172a',
            }}
          >
            Rp {priceCount.toLocaleString('id-ID')}
          </div>
        </div>
      </div>

      {/* Subtitle Teks Berjalan */}
      <Subtitles />
    </AbsoluteFill>
  );
};
