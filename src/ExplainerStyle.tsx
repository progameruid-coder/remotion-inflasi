import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

interface SceneItem {
  id: number;
  startFrame: number;
  endFrame: number;
  idText: string;
  enText: string;
  activeWord: string;
  topBadge: string;
  callout: {
    label: string;
    value: string;
    type: 'arrow-up' | 'arrow-down' | 'bar';
  };
}

const SCENE_DATA: SceneItem[] = [
  {
    id: 1,
    startFrame: 0,
    endFrame: 225,
    idText: 'Pernah sadar nggak, kenapa harga semangkok bakso tiap tahun selalu naik?',
    enText: 'Ever wondered why a bowl of meatballs keeps getting pricier every year?',
    activeWord: 'selalu naik?',
    topBadge: 'HARGA MAKANAN',
    callout: { label: 'HARGA AWAL', value: 'Rp 20.000', type: 'bar' },
  },
  {
    id: 2,
    startFrame: 225,
    endFrame: 480,
    idText: 'Bukan pedagangnya yang pelit, tapi mesin cetak uang jalan terus dan uang beredar terlalu cepat!',
    enText: 'It is not the seller being stingy, but continuous money printing increases supply too fast!',
    activeWord: 'cetak uang',
    topBadge: 'PASOKAN UANG',
    callout: { label: 'UANG BEREDAR', value: '+350%', type: 'arrow-up' },
  },
  {
    id: 3,
    startFrame: 480,
    endFrame: 720,
    idText: 'Uang Rp 20.000 kamu yang dulu dapat porsi penuh, sekarang porsinya dipangkas separuh.',
    enText: 'Your 20k that once bought a full bowl now only gets you half a portion.',
    activeWord: 'dipangkas separuh.',
    topBadge: 'DAYA BELI',
    callout: { label: 'PORSI MAKAN', value: '-50%', type: 'arrow-down' },
  },
  {
    id: 4,
    startFrame: 720,
    endFrame: 900,
    idText: 'Nominal uang di dompetmu sama, tapi nilai aslinya menguap. Itulah inflasi!',
    enText: 'The nominal cash in your wallet stays identical, but purchasing power evaporates. That is inflation!',
    activeWord: 'menguap.',
    topBadge: 'INFLASI NYATA',
    callout: { label: 'NILAI ASLI', value: 'MENYUSUT', type: 'arrow-down' },
  },
];
export const ExplainerStyle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentScene =
    SCENE_DATA.find((s) => frame >= s.startFrame && frame < s.endFrame) ||
    SCENE_DATA[0];

  const sceneProgress = frame - currentScene.startFrame;

  // Spring animations
  const badgeScale = spring({
    frame: sceneProgress,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 200 },
  });

  const calloutY = interpolate(
    spring({ frame: sceneProgress, fps, config: { damping: 15 } }),
    [0, 1],
    [30, 0]
  );
  const calloutOpacity = interpolate(sceneProgress, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Scene 1: Mangkok membal & uap naik
  const bowlPop = spring({
    frame: sceneProgress,
    fps,
    config: { damping: 12, mass: 0.8 },
  });
  const steamY = (frame * 3) % 40;

  // Scene 2: Rol mesin cetak & lembaran uang berjatuhan bertumpuk
  const rollerAngle = (frame * 14) % 360;
  const billDropY = (frame * 12) % 180;
  const stackGrowth = interpolate(sceneProgress, [0, 240], [20, 100], {
    extrapolateRight: 'clamp',
  });

  // Scene 3: Porsi menyusut & garis ukur turun
  const meatballScale = interpolate(sceneProgress, [20, 180], [1, 0.45], {
    extrapolateRight: 'clamp',
  });

  // Scene 4: Uang menguap / memudar
  const cashOpacity = interpolate(sceneProgress, [30, 140], [1, 0.2], {
    extrapolateRight: 'clamp',
  });
  const cashFloatUp = interpolate(sceneProgress, [0, 160], [0, -80], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#0f1219',
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
      {/* 1. TOP HEADER EMAS */}
      <div style={{ height: 110, display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            fontSize: 62,
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
      </div>

      {/* 2. VISUAL TENGAH TEKNIKAL LEBIH BESAR */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 720,
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 620,
            height: 620,
            borderRadius: 36,
            border: '2px dashed rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(255,255,255,0.02)',
          }}
        />

        {/* SCENE 1: MANGKOK BAKSO UTUH + HARGA 20RB */}
        {currentScene.id === 1 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${bowlPop})`,
            }}
          >
            {/* Uap Panas Makanan */}
            <div style={{ display: 'flex', gap: 20, marginBottom: -10, transform: `translateY(-${steamY}px)` }}>
              <span style={{ fontSize: 32, opacity: 0.6 }}>♨️</span>
              <span style={{ fontSize: 32, opacity: 0.8 }}>♨️</span>
            </div>

            {/* Mangkok Besar */}
            <div
              style={{
                width: 320,
                height: 170,
                backgroundColor: '#f8fafc',
                borderRadius: '0 0 160px 160px',
                border: '6px solid #cbd5e1',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
              }}
            >
              <div style={{ width: 65, height: 65, borderRadius: '50%', backgroundColor: '#78350f', border: '3px solid #b45309' }} />
              <div style={{ width: 75, height: 75, borderRadius: '50%', backgroundColor: '#78350f', border: '3px solid #b45309' }} />
              <div style={{ width: 65, height: 65, borderRadius: '50%', backgroundColor: '#78350f', border: '3px solid #b45309' }} />
            </div>

            <div
              style={{
                marginTop: 30,
                backgroundColor: '#16a34a',
                padding: '10px 28px',
                borderRadius: 20,
                fontWeight: 900,
                fontSize: 28,
                letterSpacing: 1,
                boxShadow: '0 4px 15px rgba(22,163,74,0.4)',
              }}
            >
              PORSI KOMPLIT 100%
            </div>
          </div>
        )}

        {/* SCENE 2: MESIN CETAK UANG MASAL BERPUTAR */}
        {currentScene.id === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 340,
                height: 80,
                backgroundColor: '#334155',
                borderRadius: 40,
                border: '5px solid #64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: 260,
                  height: 12,
                  backgroundColor: '#38bdf8',
                  borderRadius: 6,
                  transform: `rotate(${rollerAngle}deg)`,
                }}
              />
            </div>

            {/* Lembaran Uang Meluncur Turun */}
            <div
              style={{
                width: 240,
                height: 130,
                backgroundColor: '#15803d',
                borderRadius: 14,
                border: '4px solid #4ade80',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 900,
                fontSize: 30,
                marginTop: -20,
                transform: `translateY(${billDropY}px)`,
                zIndex: 1,
              }}
            >
              <div>Rp 100.000</div>
              <div style={{ fontSize: 14, opacity: 0.8 }}>CETAK MASAL</div>
            </div>

            {/* Tumpukan Uang Membesar di Bawah */}
            <div
              style={{
                width: 360,
                height: stackGrowth,
                backgroundColor: '#166534',
                borderRadius: 14,
                marginTop: 140,
                border: '4px solid #22c55e',
                boxShadow: '0 10px 25px rgba(22,101,52,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: 22,
                letterSpacing: 2,
              }}
            >
              BANJIR PASOKAN UANG
            </div>
          </div>
        )}

        {/* SCENE 3: PORSI MENYUSUT & TERSISA SEDIKIT */}
        {currentScene.id === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 320,
                height: 170,
                backgroundColor: '#f8fafc',
                borderRadius: '0 0 160px 160px',
                border: '6px solid #cbd5e1',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* Bakso Mengecil di Pojok */}
              <div
                style={{
                  transform: `scale(${meatballScale})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: 65, height: 65, borderRadius: '50%', backgroundColor: '#78350f', border: '3px solid #b45309' }} />
              </div>

              {/* Tanda Silang Porsi Hilang */}
              <div style={{ position: 'absolute', right: 60, fontSize: 38, opacity: 0.35 }}>
                ❌
              </div>
            </div>

            <div
              style={{
                marginTop: 30,
                backgroundColor: '#ef4444',
                padding: '10px 28px',
                borderRadius: 20,
                fontWeight: 900,
                fontSize: 26,
                letterSpacing: 1,
              }}
            >
              PORSI TERGERUS -50%
            </div>
          </div>
        )}

        {/* SCENE 4: NOMINAL SAMA TAPI MENGUAP */}
        {currentScene.id === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 280,
                height: 150,
                backgroundColor: '#1e3a8a',
                borderRadius: 18,
                border: '4px solid #60a5fa',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 900,
                fontSize: 36,
                opacity: cashOpacity,
                transform: `translateY(${cashFloatUp}px)`,
                boxShadow: '0 15px 35px rgba(30,58,138,0.5)',
              }}
            >
              <div>Rp 20.000</div>
              <div style={{ fontSize: 16, color: '#93c5fd', marginTop: 6 }}>NILAI MELEMAH</div>
            </div>

            <div style={{ marginTop: 40, fontSize: 24, fontWeight: 800, color: '#f87171' }}>
              💨 Daya Beli Menguap
            </div>
          </div>
        )}
        {/* CALLOUT PILL GAYA YOUTUBE */}
        {currentScene.callout && (
          <div
            style={{
              position: 'absolute',
              top: 15,
              right: 20,
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              border: '3px solid #38bdf8',
              borderRadius: 18,
              padding: '14px 26px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
              opacity: calloutOpacity,
              transform: `translateY(${calloutY}px)`,
              zIndex: 10,
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 700, color: '#94a3b8', letterSpacing: 1 }}>
              {currentScene.callout.label}
            </span>
            <span
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: currentScene.callout.type === 'arrow-up' ? '#ef4444' : '#22c55e',
                marginTop: 2,
              }}
            >
              {currentScene.callout.value}
            </span>
          </div>
        )}
      </div>

      {/* 3. DUAL SUBTITLE DI BAWAH (INDO BESAR + INGGRIS KECIL) */}
      <div
        style={{
          minHeight: 240,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 900,
            lineHeight: 1.3,
            textTransform: 'uppercase',
            maxWidth: 960,
            textShadow: '0 3px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, 0 6px 14px rgba(0,0,0,0.9)',
          }}
        >
          {currentScene.idText.split(' ').map((word, i) => {
            const isMatch = currentScene.activeWord && word.toLowerCase().includes(currentScene.activeWord.toLowerCase());
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

        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.7)',
            marginTop: 16,
            fontStyle: 'italic',
            letterSpacing: 0.5,
          }}
        >
          {currentScene.enText}
        </div>
      </div>
    </div>
  );
};
