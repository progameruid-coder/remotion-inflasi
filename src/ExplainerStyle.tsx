import React from 'react';
import {
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const ExplainerStyle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Konfigurasi 2 Babak Awal (Frame 0 - 600)
  const scenes = [
    {
      start: 0,
      duration: 240,
      badge: '1 • GETAH POHON KARET',
      subtitle: 'PENYADAPAN LATEKS ALAMI',
      scriptPrefix: 'Getah pohon karet aslinya lembek, tapi bisa menahan beban ',
      highlight: 'MOBIL BERTON-TON!',
    },
    {
      start: 240,
      duration: 360,
      badge: '2 • VULKANISASI BELERANG',
      subtitle: 'CAMPURAN CARBON & SULFUR',
      scriptPrefix: 'Karet dicampur belerang & carbon black agar mengikat molekul jadi ',
      highlight: '10X LEBIH KUAT!',
    },
  ];

  const currentSceneIndex = scenes.findIndex(
    (s) => frame >= s.start && frame < s.start + s.duration
  );
  const activeIndex = currentSceneIndex === -1 ? scenes.length - 1 : currentSceneIndex;
  const currentScene = scenes[activeIndex];
  const sceneProgress = frame - currentScene.start;

  const badgeScale = spring({
    frame: sceneProgress,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 120 },
  });

  const subtitlePop = spring({
    frame: sceneProgress,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 140 },
  });

  // Animasi Babak 1: Tetesan Getah
  const dropCycle = frame % 30;
  const dropY = interpolate(dropCycle, [0, 24], [0, 110], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dropOpacity = interpolate(dropCycle, [0, 5, 22, 25], [0, 1, 1, 0]);
  const latexLevel = interpolate(frame, [0, 240], [14, 38], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Animasi Babak 2: Perubahan Warna & Peningkatan Kekuatan
  const rubberColorProgress = interpolate(frame, [270, 480], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const tensileStrength = Math.round(
    interpolate(frame, [280, 520], [100, 1000], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#070a10',
        color: '#ffffff',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '80px 40px 140px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Sequence from={0} durationInFrames={1500}>
        <Audio src={staticFile('bgm.mp3')} volume={0.12} />
      </Sequence>
      <Sequence from={235} durationInFrames={35}>
        <Audio src={staticFile('whoosh.mp3')} volume={0.3} />
      </Sequence>

      {/* BACKGROUND GRID */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 50% 45%, rgba(13, 148, 136, 0.22) 0%, transparent 75%), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
          opacity: 0.9,
        }}
      />

      {/* HEADER */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, zIndex: 10 }}>
        <div
          style={{
            backgroundColor: activeIndex === 0 ? '#0d9488' : '#eab308',
            color: activeIndex === 0 ? '#f0fdfa' : '#422006',
            padding: '14px 40px',
            borderRadius: 50,
            fontSize: 36,
            fontWeight: 900,
            letterSpacing: 1.5,
            transform: `scale(${badgeScale})`,
            boxShadow: activeIndex === 0 ? '0 10px 30px rgba(13, 148, 136, 0.45)' : '0 10px 30px rgba(234, 179, 8, 0.45)',
            textTransform: 'uppercase',
          }}
        >
          {currentScene.badge}
        </div>
        <div style={{ fontSize: 22, color: '#94a3b8', fontWeight: 700, letterSpacing: 2 }}>
          {currentScene.subtitle}
        </div>
      </div>

      {/* PANGGUNG PUSAT */}
      <div
        style={{
          position: 'relative',
          width: 720,
          height: 640,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 680,
            height: 680,
            borderRadius: '50%',
            border: '2px dashed rgba(255, 255, 255, 0.12)',
            boxShadow: 'inset 0 0 60px rgba(0,0,0,0.85)',
          }}
        />

        {/* BABAK 1: POHON KARET */}
        {activeIndex === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            <div
              style={{
                width: 260,
                height: 480,
                background: 'linear-gradient(90deg, #2b1d16 0%, #4a3528 25%, #6a4e3b 50%, #4a3528 75%, #231610 100%)',
                borderRadius: '28px',
                border: '3px solid #1a100b',
                position: 'relative',
                boxShadow: '0 30px 70px rgba(0,0,0,0.9), inset 0 0 25px rgba(0,0,0,0.6)',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 30, left: 24, width: 6, height: 70, backgroundColor: '#1a100b', opacity: 0.6, borderRadius: 3 }} />
              <div style={{ position: 'absolute', top: 120, right: 35, width: 8, height: 90, backgroundColor: '#1a100b', opacity: 0.6, borderRadius: 4 }} />
              <div style={{ position: 'absolute', top: 260, left: 45, width: 6, height: 80, backgroundColor: '#1a100b', opacity: 0.6, borderRadius: 3 }} />
              <div style={{ position: 'absolute', top: 380, right: 50, width: 7, height: 60, backgroundColor: '#1a100b', opacity: 0.6, borderRadius: 3 }} />

              <div
                style={{
                  position: 'absolute',
                  top: 130,
                  left: -25,
                  width: 310,
                  height: 22,
                  backgroundColor: '#f1f5f9',
                  transform: 'rotate(-26deg)',
                  borderBottom: '4px solid #1a100b',
                  boxShadow: '0 0 12px rgba(255,255,255,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 40,
                }}
              >
                <div style={{ width: '80%', height: 6, backgroundColor: '#ffffff', borderRadius: 3, boxShadow: '0 0 6px #ffffff' }} />
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: 215,
                  left: 116,
                  width: 26,
                  height: 12,
                  backgroundColor: '#94a3b8',
                  borderRadius: '2px 2px 6px 6px',
                  border: '1px solid #cbd5e1',
                  transform: 'rotate(15deg)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: 228 + dropY,
                  left: 124,
                  width: 10,
                  height: 16,
                  backgroundColor: '#ffffff',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  boxShadow: '0 0 10px #ffffff',
                  opacity: dropOpacity,
                }}
              />

              <div style={{ position: 'absolute', top: 355, left: 20, width: 220, height: 4, backgroundColor: '#475569', borderRadius: 2 }} />

              <div
                style={{
                  position: 'absolute',
                  top: 340,
                  left: 85,
                  width: 90,
                  height: 65,
                  backgroundColor: '#573318',
                  border: '4px solid #3d210d',
                  borderRadius: '0 0 45px 45px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.8), inset 0 -6px 12px rgba(0,0,0,0.5)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ width: '100%', height: latexLevel, backgroundColor: '#ffffff', borderRadius: '0 0 35px 35px', boxShadow: '0 0 8px #ffffff', marginTop: 'auto' }} />
              </div>
            </div>

            <div
              style={{
                marginTop: 25,
                padding: '10px 28px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 12,
                fontSize: 22,
                color: '#e2e8f0',
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              Getah Alami Disadap • Kadar Karet ~30%
            </div>
          </div>
        )}
        {/* BABAK 2: MESIN PENGADUK KOMPON (BANBURY MIXER) */}
        {activeIndex === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 460,
                height: 480,
                backgroundColor: '#111827',
                borderRadius: 28,
                border: '4px solid #374151',
                boxShadow: '0 25px 60px rgba(0,0,0,0.9)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 20px',
                overflow: 'hidden',
              }}
            >
              {/* Dua Corong Input Bahan di Atas */}
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0 30px',
                  zIndex: 10,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 110,
                      height: 40,
                      backgroundColor: '#eab308',
                      clipPath: 'polygon(0 0, 100% 0, 75% 100%, 25% 100%)',
                      boxShadow: '0 4px 12px rgba(234, 179, 8, 0.4)',
                    }}
                  />
                  <span style={{ fontSize: 13, fontWeight: 900, color: '#facc15', marginTop: 4 }}>
                    SULFUR
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 110,
                      height: 40,
                      backgroundColor: '#1f2937',
                      border: '2px solid #4b5563',
                      clipPath: 'polygon(0 0, 100% 0, 75% 100%, 25% 100%)',
                    }}
                  />
                  <span style={{ fontSize: 13, fontWeight: 900, color: '#9ca3af', marginTop: 4 }}>
                    CARBON
                  </span>
                </div>
              </div>

              {/* Partikel Bahan Jatuh Masuk ke Mesin */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={`sulfur-drop-${i}`}
                  style={{
                    position: 'absolute',
                    top: 70 + ((frame * 5 + i * 40) % 90),
                    left: 75 + i * 8,
                    width: 10,
                    height: 10,
                    backgroundColor: '#facc15',
                    borderRadius: '50%',
                    boxShadow: '0 0 8px #facc15',
                  }}
                />
              ))}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={`carbon-drop-${i}`}
                  style={{
                    position: 'absolute',
                    top: 70 + ((frame * 5 + i * 40) % 90),
                    right: 75 + i * 8,
                    width: 10,
                    height: 10,
                    backgroundColor: '#030712',
                    border: '1.5px solid #6b7280',
                    borderRadius: 3,
                  }}
                />
              ))}

              {/* Ruang Penggilingan (Chamber) */}
              <div
                style={{
                  width: 380,
                  height: 310,
                  backgroundColor: '#030712',
                  borderRadius: 24,
                  border: '3px solid #1f2937',
                  marginTop: 15,
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, transparent 70%)',
                  }}
                />

                {/* Rol Penggiling Kiri */}
                <div
                  style={{
                    position: 'absolute',
                    left: 55,
                    width: 105,
                    height: 105,
                    borderRadius: '50%',
                    border: '8px dashed #4b5563',
                    backgroundColor: '#1f2937',
                    transform: `rotate(${frame * 4}deg)`,
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8)',
                  }}
                />

                {/* Rol Penggiling Kanan */}
                <div
                  style={{
                    position: 'absolute',
                    right: 55,
                    width: 105,
                    height: 105,
                    borderRadius: '50%',
                    border: '8px dashed #4b5563',
                    backgroundColor: '#1f2937',
                    transform: `rotate(${-frame * 4}deg)`,
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8)',
                  }}
                />

                {/* Gumpalan Adonan Karet di Tengah Rol */}
                <div
                  style={{
                    width: 210,
                    height: 140,
                    borderRadius: '45% 55% 50% 50% / 50% 50% 60% 40%',
                    backgroundColor: `rgb(${Math.round(235 - rubberColorProgress * 215)}, ${Math.round(235 - rubberColorProgress * 215)}, ${Math.round(230 - rubberColorProgress * 210)})`,
                    border: '3px solid rgba(250, 204, 21, 0.4)',
                    boxShadow: `0 0 25px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,${0.3 + rubberColorProgress * 0.5})`,
                    transform: `scale(${1 + Math.sin(frame / 4) * 0.05})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 900,
                      color: rubberColorProgress > 0.5 ? '#facc15' : '#030712',
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                    }}
                  >
                    {rubberColorProgress > 0.7 ? 'KOMPON KARET' : 'PENGADUKAN'}
                  </span>
                </div>
              </div>
            </div>

            {/* Indikator Kekuatan Tarik HUD */}
            <div
              style={{
                marginTop: 22,
                fontSize: 32,
                fontWeight: 900,
                color: '#facc15',
                fontFamily: 'monospace',
                letterSpacing: 2,
                textShadow: '0 0 16px rgba(250, 204, 21, 0.5)',
              }}
            >
              KEKUATAN TARIK: {tensileStrength}%
            </div>
          </div>
        )}
      </div>

      {/* SUBTITLE GAYA KONTEN INFLASI (KINETIC BOLD TANPA BOKS KAKU) */}
      <div
        style={{
          width: '90%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          transform: `scale(${subtitlePop})`,
          zIndex: 20,
          padding: '10px 20px',
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 900,
            lineHeight: 1.35,
            color: '#ffffff',
            textShadow: '0 4px 16px rgba(0,0,0,1), 0 2px 4px rgba(0,0,0,0.9)',
            letterSpacing: 0.5,
          }}
        >
          {currentScene.scriptPrefix}
          <span
            style={{
              color: '#facc15',
              backgroundColor: 'rgba(234, 179, 8, 0.15)',
              padding: '2px 8px',
              borderRadius: 8,
              border: '1px solid rgba(250, 204, 21, 0.4)',
              boxShadow: '0 0 18px rgba(250, 204, 21, 0.35)',
              display: 'inline-block',
              marginLeft: 6,
            }}
          >
            {currentScene.highlight}
          </span>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: '85%',
            height: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderRadius: 6,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${(frame / 1500) * 100}%`,
              height: '100%',
              backgroundColor: activeIndex === 0 ? '#0d9488' : '#eab308',
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
          PROSES PEMBUATAN BAN MOBIL • {Math.floor(frame / fps)}s / 50s
        </div>
      </div>
    </div>
  );
};
