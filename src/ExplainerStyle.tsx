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

  // Animasi Pop Badge Langkah
  const badgeScale = spring({
    frame: sceneProgress,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 120 },
  });

  // --- Bab 2: Animasi Termometer Suhu (25°C -> 1700°C) ---
  const currentTemp = Math.round(
    interpolate(frame, [250, 480], [25, 1700], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // --- Bab 3: Animasi Aliran Kaca Apung ---
  const floatWidth = interpolate(frame, [620, 850], [80, 520], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Bab 4: Garis Potong Pisau Intan ---
  const cutLaserY = interpolate(frame, [1120, 1200], [0, 400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Bab 5: Pemasangan Kusen ---
  const frameOffset = interpolate(frame, [1270, 1340], [120, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
            'radial-gradient(circle at 50% 40%, rgba(30, 58, 138, 0.22) 0%, transparent 70%), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
          opacity: 0.8,
        }}
      />

      {/* HEADER: BADGE TAHAPAN & SUBTITLE */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: '#f59e0b',
            color: '#090d16',
            padding: '12px 32px',
            borderRadius: 50,
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: 1.5,
            transform: `scale(${badgeScale})`,
            boxShadow: '0 8px 24px rgba(245, 158, 11, 0.35)',
            textTransform: 'uppercase',
          }}
        >
          {currentScene.badge}
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#94a3b8',
            fontWeight: 600,
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
          width: 620,
          height: 620,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {/* Panggung Isometrik Lingkaran Luar */}
        <div
          style={{
            position: 'absolute',
            width: 580,
            height: 580,
            borderRadius: '50%',
            border: '2px dashed rgba(255, 255, 255, 0.12)',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)',
          }}
        />

        {/* ==================== BABAK 1: PASIR SILIKA ==================== */}
        {activeIndex === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Butiran Pasir & Gundukan */}
            <div
              style={{
                width: 320,
                height: 180,
                backgroundColor: '#d97706',
                borderRadius: '50% 50% 20% 20%',
                backgroundImage: 'radial-gradient(#fde68a 15%, transparent 16%)',
                backgroundSize: '16px 16px',
                boxShadow: '0 20px 40px rgba(217, 119, 6, 0.4)',
                position: 'relative',
              }}
            >
              {/* Partikel melayang */}
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: -20 - i * 15,
                    left: 100 + i * 25,
                    width: 14,
                    height: 14,
                    backgroundColor: '#fef08a',
                    borderRadius: '50%',
                    transform: `translateY(${Math.sin((frame + i * 20) / 10) * 8}px)`,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                marginTop: 30,
                padding: '8px 20px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: 8,
                fontSize: 20,
                color: '#cbd5e1',
                fontWeight: 600,
              }}
            >
              SiO₂ (Silikon Dioksida) 70%
            </div>
          </div>
        )}

        {/* ==================== BABAK 2: TUNGKU PELEBURAN ==================== */}
        {activeIndex === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Tungku Pijar */}
            <div
              style={{
                width: 340,
                height: 340,
                borderRadius: 40,
                background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                border: '3px solid #ef4444',
                boxShadow: `0 0 ${40 + Math.sin(frame / 4) * 15}px rgba(239, 68, 68, 0.6)`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              {/* Inti Lava Lelehan Kaca */}
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #fef08a 0%, #f97316 60%, #b91c1c 100%)',
                  boxShadow: '0 0 35px #f97316',
                }}
              />
            </div>
            {/* Indikator Suhu */}
            <div
              style={{
                marginTop: 25,
                fontSize: 38,
                fontWeight: 900,
                color: currentTemp > 1000 ? '#ef4444' : '#f59e0b',
                fontFamily: 'monospace',
                letterSpacing: 2,
              }}
            >
              SUHU: {currentTemp}°C
            </div>
          </div>
        )}

        {/* ==================== BABAK 3: PROSES KACA APUNG (FLOAT GLASS) ==================== */}
        {activeIndex === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 540,
                height: 260,
                backgroundColor: '#0f172a',
                borderRadius: 24,
                border: '2px solid rgba(255,255,255,0.15)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              {/* Lapisan Kaca Mengapung (Jingga ke Bening) */}
              <div
                style={{
                  width: `${floatWidth}px`,
                  height: 48,
                  background: 'linear-gradient(90deg, #f97316 0%, #38bdf8 80%)',
                  borderRadius: 12,
                  margin: '0 auto 20px auto',
                  boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#041e3d',
                }}
              >
                KACA MENGAPUNG (TEBAL 5mm)
              </div>
              {/* Kolam Lelehan Timah Cair */}
              <div
                style={{
                  height: 100,
                  background: 'linear-gradient(180deg, #94a3b8 0%, #475569 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  fontWeight: 800,
                  letterSpacing: 2,
                  color: '#0f172a',
                }}
              >
                KOLAM TIMAH CAIR (MOLTEN TIN)
              </div>
            </div>
            <div
              style={{
                marginTop: 20,
                fontSize: 18,
                color: '#38bdf8',
                fontWeight: 600,
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
                width: 440,
                height: 400,
                backgroundColor: 'rgba(56, 189, 248, 0.25)',
                border: '2px solid rgba(56, 189, 248, 0.8)',
                borderRadius: 16,
                backdropFilter: 'blur(8px)',
                position: 'relative',
                boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {/* Garis Pisau Intan Meluncur Vertikal */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  width: 3,
                  height: cutLaserY,
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 12px #38bdf8, 0 0 24px #38bdf8',
                }}
              />
              {/* Mata Pisau */}
              <div
                style={{
                  position: 'absolute',
                  top: cutLaserY - 10,
                  left: 'calc(50% - 12px)',
                  width: 24,
                  height: 24,
                  backgroundColor: '#f59e0b',
                  transform: 'rotate(45deg)',
                  boxShadow: '0 0 15px #f59e0b',
                }}
              />
            </div>
            <div
              style={{
                marginTop: 25,
                fontSize: 20,
                color: '#cbd5e1',
                fontWeight: 600,
              }}
            >
              PISAU INTAN MEMOTONG PRESISI
            </div>
          </div>
        )}

        {/* ==================== BABAK 5: PERAKITAN JENDELA UTUH ==================== */}
        {activeIndex === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Bingkai Kusen & Kaca */}
            <div
              style={{
                width: 380,
                height: 460,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: `${24 - frameOffset / 6}px solid #334155`,
                borderRadius: 20,
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Kaca Bening */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  position: 'relative',
                }}
              >
                {/* Kilatan Cahaya Refleksi */}
                <div
                  style={{
                    position: 'absolute',
                    top: -50,
                    left: -150 + ((frame - 1260) % 240) * 3,
                    width: 80,
                    height: 600,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    transform: 'rotate(35deg)',
                    filter: 'blur(10px)',
                  }}
                />
              </div>
            </div>
            <div
              style={{
                marginTop: 25,
                fontSize: 22,
                color: '#10b981',
                fontWeight: 800,
                letterSpacing: 1.5,
              }}
            >
              JENDELA SIAP TERPASANG DI RUMAH
            </div>
          </div>
        )}
      </div>

      {/* FOOTER: PROGRESS BAR DURASI */}
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
            height: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderRadius: 4,
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
            fontSize: 16,
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
