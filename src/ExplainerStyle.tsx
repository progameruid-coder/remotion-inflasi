import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

interface SubtitleItem {
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

const SCENE_DATA: SubtitleItem[] = [
  {
    id: 1,
    startFrame: 0,
    endFrame: 75,
    idText: 'Kalau uang dicetak makin banyak,',
    enText: 'If more and more money is printed,',
    activeWord: 'dicetak',
    topBadge: 'CETAK UANG',
    callout: { label: 'JUMLAH UANG', value: '+300%', type: 'arrow-up' },
  },
  {
    id: 2,
    startFrame: 75,
    endFrame: 150,
    idText: 'harga barang otomatis akan melonjak.',
    enText: 'commodity prices will automatically surge.',
    activeWord: 'melonjak.',
    topBadge: 'INFLASI TINGGI',
    callout: { label: 'HARGA PASAR', value: '+150%', type: 'arrow-up' },
  },
  {
    id: 3,
    startFrame: 150,
    endFrame: 225,
    idText: 'Akibatnya, daya beli kamu bakal tergerus,',
    enText: 'As a result, your purchasing power drops,',
    activeWord: 'tergerus,',
    topBadge: 'DAYA BELI',
    callout: { label: 'NILAI TABUNGAN', value: '-50%', type: 'arrow-down' },
  },
  {
    id: 4,
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

  const currentScene =
    SCENE_DATA.find((s) => frame >= s.startFrame && frame < s.endFrame) ||
    SCENE_DATA[0];

  const sceneProgress = frame - currentScene.startFrame;

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
  const calloutOpacity = interpolate(sceneProgress, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const rollerAngle = (frame * 12) % 360;
  const billOffset = (frame * 10) % 140;

  const priceBarHeight = interpolate(sceneProgress, [5, 60], [100, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const balanceAngle = interpolate(
    spring({ frame: sceneProgress, fps, config: { damping: 14 } }),
    [0, 1],
    [0, 22]
  );

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#11141c',
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
      {/* 1. TOP HEADER */}
      <div style={{ height: 110, display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            fontSize: 60,
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

      {/* 2. VISUAL TENGAH */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 650,
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 540,
            height: 540,
            borderRadius: 28,
            border: '2px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(255,255,255,0.02)',
          }}
        />

        {/* SCENE 1: CETAK UANG */}
        {currentScene.id === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 260,
                height: 70,
                backgroundColor: '#334155',
                borderRadius: 35,
                border: '4px solid #64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: 200,
                  height: 10,
                  backgroundColor: '#0ea5e9',
                  borderRadius: 5,
                  transform: `rotate(${rollerAngle}deg)`,
                }}
              />
            </div>
            <div
              style={{
                width: 190,
                height: 110,
                backgroundColor: '#15803d',
                borderRadius: 12,
                border: '3px solid #4ade80',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: 26,
                marginTop: -15,
                transform: `translateY(${billOffset}px)`,
                zIndex: 1,
              }}
            >
              <div>Rp 100.000</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>BANK INDONESIA</div>
            </div>
            <div
              style={{
                width: 280,
                height: 35,
                backgroundColor: '#166534',
                borderRadius: 8,
                marginTop: 130,
                border: '3px solid #22c55e',
                textAlign: 'center',
                lineHeight: '30px',
                fontWeight: 800,
                fontSize: 16,
              }}
            >
              PENCETAKAN MASAL
            </div>
          </div>
        )}

        {/* SCENE 2: LONJAKAN HARGA */}
        {currentScene.id === 2 && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 36, height: 420 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 18, color: '#94a3b8', marginBottom: 8 }}>Normal</div>
              <div
                style={{
                  width: 90,
                  height: 120,
                  backgroundColor: '#3b82f6',
                  borderRadius: 12,
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#ef4444', marginBottom: 8 }}>
                LONJAKAN
              </div>
              <div
                style={{
                  width: 110,
                  height: priceBarHeight,
                  background: 'linear-gradient(180deg, #ef4444 0%, #991b1b 100%)',
                  borderRadius: 14,
                  border: '3px solid #f87171',
                }}
              />
            </div>
          </div>
        )}

        {/* SCENE 3: DAYA BELI */}
        {currentScene.id === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 240,
                height: 170,
                border: '6px solid #f59e0b',
                borderRadius: '0 0 28px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
              }}
            >
              <div style={{ fontSize: 60 }}>🛒</div>
            </div>
            <div style={{ marginTop: 24, fontSize: 22, fontWeight: 800, color: '#f87171' }}>
              Kapasitas Barang Berkurang
            </div>
          </div>
        )}

        {/* SCENE 4: NERACA TIMBANGAN */}
        {currentScene.id === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 440, position: 'relative' }}>
            <div style={{ width: 14, height: 220, backgroundColor: '#cbd5e1', borderRadius: 7 }} />
            <div
              style={{
                position: 'absolute',
                top: 20,
                width: 380,
                height: 12,
                backgroundColor: '#f59e0b',
                borderRadius: 6,
                transform: `rotate(${balanceAngle}deg)`,
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 10px',
              }}
            >
              <div style={{ marginTop: 16, padding: '10px 14px', backgroundColor: '#ef4444', borderRadius: 10, fontSize: 16, fontWeight: 900 }}>
                UANG BANYAK
              </div>
              <div style={{ marginTop: -40, padding: '10px 14px', backgroundColor: '#3b82f6', borderRadius: 10, fontSize: 16, fontWeight: 900 }}>
                1 BARANG
              </div>
            </div>
            <div style={{ width: 160, height: 18, backgroundColor: '#64748b', borderRadius: 9, marginTop: -4 }} />
          </div>
        )}
        {/* CALLOUT PILL */}
        {currentScene.callout && (
          <div
            style={{
              position: 'absolute',
              top: 15,
              right: 20,
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
              zIndex: 10,
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 700, color: '#94a3b8' }}>
              {currentScene.callout.label}
            </span>
            <span
              style={{
                fontSize: 34,
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

      {/* 3. DUAL SUBTITLE */}
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
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            lineHeight: 1.3,
            textTransform: 'uppercase',
            maxWidth: 950,
            textShadow: '0 3px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, 0 6px 14px rgba(0,0,0,0.9)',
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

        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.7)',
            marginTop: 14,
            fontStyle: 'italic',
          }}
        >
          {currentScene.enText}
        </div>
      </div>
    </div>
  );
};
