import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const ExplainerStyle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Konfigurasi 5 Babak (Total 1500 frame = 50 detik)
  const scenes = [
    { start: 0, duration: 240, badge: '1 • PASIR SILIKA', subtitle: 'BAHAN BAKU ALAMI' },
    { start: 240, duration: 360, badge: '2 • LELEHAN 1.700°C', subtitle: 'PELEBURAN TUNGKU EKSTREM' },
    { start: 600, duration: 420, badge: '3 • MENGAPUNG DI TIMAH', subtitle: 'METODE KACA APUNG (FLOAT GLASS)' },
    { start: 1020, duration: 240, badge: '4 • POTONG PRESISI', subtitle: 'PENDINGINAN & PISAU INTAN' },
    { start: 1260, duration: 240, badge: '5 • JENDELA RUMAH', subtitle: 'PERAKITAN RANGKA KUSEN' },
  ];

  const currentSceneIndex = scenes.findIndex(
    (s) => frame >= s.start && frame < s.start + s.duration
  );
  const activeIndex = currentSceneIndex === -1 ? scenes.length - 1 : currentSceneIndex;
  const currentScene = scenes[activeIndex];
  const sceneProgress = frame - currentScene.start;

  // Animasi Pop Badge
  const badgeScale = spring({
    frame: sceneProgress,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 120 },
  });

  // --- Bab 2: Termometer Suhu (25°C -> 1700°C) ---
  const currentTemp = Math.round(
    interpolate(frame, [250, 460], [25, 1700], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // --- Bab 3: Aliran Kaca Apung ---
  const floatWidth = interpolate(frame, [620, 800], [100, 680], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textFadeIn = interpolate(frame, [720, 760], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Bab 4: Garis Potong Pisau Intan ---
  const cutLaserY = interpolate(frame, [1100, 1190], [0, 520], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Bab 5: Pemasangan Kusen Menjepit ---
  const frameSnap = spring({
    frame: frame - 1270,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 140 },
  });
  const frameThickness = interpolate(frameSnap, [0, 1], [0, 24]);

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#0a0d14',
        color: '#ffffff',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '90px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* HUD & GRID BACKGROUND */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 50% 45%, rgba(30, 58, 138, 0.28) 0%, transparent 75%), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
          opacity: 0.85,
        }}
      />

      {/* HEADER: BADGE TAHAPAN & SUBTITLE */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: '#f59e0b',
            color: '#090d16',
            padding: '14px 38px',
            borderRadius: 50,
            fontSize: 36,
            fontWeight: 900,
            letterSpacing: 1.5,
            transform: `scale(${badgeScale})`,
            boxShadow: '0 10px 28px rgba(245, 158, 11, 0.4)',
            textTransform: 'uppercase',
          }}
        >
          {currentScene.badge}
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#94a3b8',
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          {currentScene.subtitle}
        </div>
      </div>

      {/* PANGGUNG PUSAT / MINIATUR MEKANIK */}
      <div
        style={{
          position: 'relative',
          width: 760,
          height: 760,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {/* Lingkaran Panggung Luar dengan Bayangan Dalam */}
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 720,
            borderRadius: '50%',
            border: '2px dashed rgba(255, 255, 255, 0.14)',
            boxShadow: 'inset 0 0 60px rgba(0,0,0,0.8)',
          }}
        />

        {/* ==================== BABAK 1: PASIR SILIKA ==================== */}
        {activeIndex === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Gundukan Pasir Besar */}
            <div
              style={{
                width: 440,
                height: 240,
                backgroundColor: '#d97706',
                borderRadius: '50% 50% 25% 25%',
                backgroundImage: 'radial-gradient(#fde68a 18%, transparent 19%)',
                backgroundSize: '20px 20px',
                boxShadow: '0 25px 50px rgba(217, 119, 6, 0.45)',
                position: 'relative',
              }}
            >
              {/* Partikel melayang halus */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: -25 - i * 18,
                    left: 120 + i * 35,
                    width: 16,
                    height: 16,
                    backgroundColor: '#fef08a',
                    borderRadius: '50%',
                    transform: `translateY(${Math.sin((frame + i * 20) / 10) * 10}px)`,
                    boxShadow: '0 0 10px #fde68a',
                  }}
                />
              ))}
            </div>
            <div
              style={{
                marginTop: 40,
                padding: '12px 28px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 12,
                fontSize: 24,
                color: '#e2e8f0',
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              SiO₂ (Silikon Dioksida) 70%
            </div>
          </div>
        )}

        {/* ==================== BABAK 2: TUNGKU PELEBURAN ==================== */}
        {activeIndex === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 440,
                height: 440,
                borderRadius: 50,
                background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                border: '4px solid #ef4444',
                boxShadow: `0 0 ${50 + Math.sin(frame / 4) * 20}px rgba(239, 68, 68, 0.65)`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              {/* Inti Lava Kaca Bersinar */}
              <div
                style={{
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #fef08a 0%, #f97316 55%, #b91c1c 100%)',
                  boxShadow: '0 0 45px #f97316',
                }}
              />
            </div>
            {/* Monitor Suhu */}
            <div
              style={{
                marginTop: 35,
                fontSize: 44,
                fontWeight: 900,
                color: currentTemp > 1000 ? '#ef4444' : '#f59e0b',
                fontFamily: 'monospace',
                letterSpacing: 3,
                textShadow: '0 0 15px rgba(239, 68, 68, 0.5)',
              }}
            >
              SUHU: {currentTemp}°C
            </div>
          </div>
        )}

        {/* ==================== BABAK 3: KACA APUNG (FLOAT GLASS) ==================== */}
        {activeIndex === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div
              style={{
                width: 700,
                height: 320,
                backgroundColor: '#0f172a',
                borderRadius: 28,
                border: '2px solid rgba(255,255,255,0.18)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              }}
            >
              {/* Lapisan Kaca Mengapung */}
              <div
                style={{
                  width: `${floatWidth}px`,
                  height: 60,
                  background: 'linear-gradient(90deg, #f97316 0%, #38bdf8 70%)',
                  borderRadius: 14,
                  margin: '0 auto 24px auto',
                  boxShadow: '0 0 25px rgba(56, 189, 248, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  fontWeight: 900,
                  color: '#041e3d',
                  opacity: textFadeIn,
                  whiteSpace: 'nowrap',
                }}
              >
                KACA MENGAPUNG (TEBAL 5mm)
              </div>
              {/* Kolam Timah Cair */}
              <div
                style={{
                  height: 120,
                  background: 'linear-gradient(180deg, #94a3b8 0%, #475569 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  fontWeight: 900,
                  letterSpacing: 2,
                  color: '#0f172a',
                }}
              >
                KOLAM TIMAH CAIR (MOLTEN TIN)
              </div>
            </div>
            <div
              style={{
                marginTop: 25,
                fontSize: 22,
                color: '#38bdf8',
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              PERMUKAAN RATA ALAMI TANPA GELEMBUNG
            </div>
          </div>
        )}

        {/* ==================== BABAK 4: PENDINGINAN & PEMOTONGAN ==================== */}
        {activeIndex === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 520,
                height: 520,
                backgroundColor: 'rgba(56, 189, 248, 0.22)',
                border: '3px solid rgba(56, 189, 248, 0.85)',
                borderRadius: 20,
                backdropFilter: 'blur(10px)',
                position: 'relative',
                boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {/* Garis Potong Intan Meluncur Vertikal */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  width: 4,
                  height: cutLaserY,
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 16px #38bdf8, 0 0 30px #38bdf8',
                }}
              />
              {/* Mata Pisau Intan */}
              <div
                style={{
                  position: 'absolute',
                  top: cutLaserY - 14,
                  left: 'calc(50% - 15px)',
                  width: 30,
                  height: 30,
                  backgroundColor: '#f59e0b',
                  transform: 'rotate(45deg)',
                  boxShadow: '0 0 20px #f59e0b',
                }}
              />
            </div>
            <div
              style={{
                marginTop: 30,
                fontSize: 24,
                color: '#e2e8f0',
                fontWeight: 700,
              }}
            >
              PISAU INTAN MEMOTONG PRESISI
            </div>
          </div>
        )}

        {/* ==================== BABAK 5: JENDELA RUMAH UTUH ==================== */}
        {activeIndex === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Rangka Kusen Jendela Berpalang */}
            <div
              style={{
                width: 460,
                height: 560,
                backgroundColor: '#1e293b',
                padding: `${frameThickness}px`,
                borderRadius: 24,
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.8)',
                display: 'flex',
                position: 'relative',
                boxSizing: 'border-box',
                transition: 'all 0.1s ease-out',
              }}
            >
              {/* Grid 4 Kaca Jendela (2x2 Panel) */}
              <div
                style={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: '1fr 1fr',
                  gap: `${frameThickness / 2}px`,
                  backgroundColor: '#334155',
                  borderRadius: 14,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {[0, 1, 2, 3].map((panel) => (
                  <div
                    key={panel}
                    style={{
                      backgroundColor: 'rgba(56, 189, 248, 0.22)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      position: 'relative',
                    }}
                  />
                ))}

                {/* Kilatan Refleksi Cahaya Diagonal */}
                <div
                  style={{
                    position: 'absolute',
                    top: -100,
                    left: -200 + ((frame - 1260) % 240) * 4,
                    width: 100,
                    height: 800,
                    backgroundColor: 'rgba(255, 255, 255, 0.35)',
                    transform: 'rotate(35deg)',
                    filter: 'blur(12px)',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Handle / Gagang Jendela */}
              <div
                style={{
                  position: 'absolute',
                  right: 18,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 12,
                  height: 60,
                  backgroundColor: '#cbd5e1',
                  borderRadius: 6,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                }}
              />
            </div>
            <div
              style={{
                marginTop: 30,
                fontSize: 24,
                color: '#10b981',
                fontWeight: 900,
                letterSpacing: 1.5,
              }}
            >
              JENDELA RUMAH SIAP DIPASANG
            </div>
          </div>
        )}
      </div>

      {/* FOOTER: PROGRESS BAR */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: '85%',
            height: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderRadius: 6,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${(frame / 1500) * 100}%`,
              height: '100%',
              backgroundColor: '#f59e0b',
            }}
          />
        </div>
        <div
          style={{
            fontSize: 18,
            color: '#64748b',
            fontFamily: 'monospace',
            letterSpacing: 2,
          }}
        >
          PROSES PEMBUATAN KACA JENDELA • {Math.floor(frame / fps)}s / 50s
        </div>
      </div>
    </div>
  );
};
