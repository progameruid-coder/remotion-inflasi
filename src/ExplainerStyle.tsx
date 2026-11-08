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
    {
      start: 600,
      duration: 420,
      badge: '3 • RANGKA KAWAT BAJA',
      subtitle: 'STEEL BELT INNER CORE',
      scriptPrefix: 'Rahasia kekuatannya: anyaman kawat baja dipasang menyilang agar ',
      highlight: 'BAN TIDAK PECAH!',
    },
    {
      start: 1020,
      duration: 240,
      badge: '4 • CETAKAN HIDROLIK',
      subtitle: 'CURING & TREAD MOLDING',
      scriptPrefix: 'Ban mentah dipanaskan mesin pres hidrolik untuk mencetak ',
      highlight: 'ALUR TAPAK ANTI-SLIP!',
    },
    {
      start: 1260,
      duration: 240,
      badge: '5 • TAHAN BEBAN BERTON-TON',
      subtitle: 'RODA MOBIL SIAP MELAJU',
      scriptPrefix: 'Hasilnya, roda karet elastis ini siap menopang mobilmu ',
      highlight: 'MELAJU DENGAN AMAN!',
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

  // Animasi Babak 1
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

  // Animasi Babak 2
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

  // Animasi Babak 4
  const moldPressY = interpolate(frame, [1030, 1130], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const moldGlow = interpolate(frame, [1080, 1150], [0.3, 0.85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Animasi Babak 5 (Truk & Close-up Zoom Terpusat)
  const b5Progress = Math.max(0, frame - 1260);
  const cameraZoom = interpolate(b5Progress, [0, 70, 140], [1, 1, 3.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraPanX = interpolate(b5Progress, [0, 70, 140], [0, 0, 105], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraPanY = interpolate(b5Progress, [0, 70, 140], [0, 0, -135], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const truckWeight = Math.round(
    interpolate(b5Progress, [10, 140], [4500, 32000], {
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
      {/* 1. BGM UTAMA */}
      <Sequence from={0} durationInFrames={1500}>
        <Audio src={staticFile('bgm.mp3')} volume={0.12} />
      </Sequence>

      {/* 2. SFX TRANSISI WHOOSH PER BABAK */}
      <Sequence from={235} durationInFrames={35}>
        <Audio src={staticFile('whoosh.mp3')} volume={0.25} />
      </Sequence>
      <Sequence from={595} durationInFrames={35}>
        <Audio src={staticFile('whoosh.mp3')} volume={0.25} />
      </Sequence>
      <Sequence from={1015} durationInFrames={35}>
        <Audio src={staticFile('whoosh.mp3')} volume={0.25} />
      </Sequence>
      <Sequence from={1255} durationInFrames={35}>
        <Audio src={staticFile('whoosh.mp3')} volume={0.25} />
      </Sequence>

      {/* 3. SFX AKSI MEKANIS PER BABAK */}
      <Sequence from={24} durationInFrames={20}>
        <Audio src={staticFile('water_drop.mp3')} volume={0.25} />
      </Sequence>
      <Sequence from={54} durationInFrames={20}>
        <Audio src={staticFile('water_drop.mp3')} volume={0.25} />
      </Sequence>
      <Sequence from={84} durationInFrames={20}>
        <Audio src={staticFile('water_drop.mp3')} volume={0.25} />
      </Sequence>
      <Sequence from={114} durationInFrames={20}>
        <Audio src={staticFile('water_drop.mp3')} volume={0.25} />
      </Sequence>

      <Sequence from={250} durationInFrames={70}>
        <Audio src={staticFile('pour_powder.mp3')} volume={0.35} />
      </Sequence>

      <Sequence from={615} durationInFrames={40}>
        <Audio src={staticFile('metal_clank.mp3')} volume={0.4} />
      </Sequence>

      <Sequence from={1130} durationInFrames={45}>
        <Audio src={staticFile('hydraulic_press.mp3')} volume={0.55} />
      </Sequence>
      <Sequence from={1135} durationInFrames={65}>
        <Audio src={staticFile('steam_hiss.mp3')} volume={0.35} />
      </Sequence>

      <Sequence from={1260} durationInFrames={90}>
        <Audio src={staticFile('truck_engine.mp3')} volume={0.3} />
      </Sequence>
      <Sequence from={1380} durationInFrames={45}>
        <Audio src={staticFile('digital_success.mp3')} volume={0.4} />
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
            backgroundColor:
              activeIndex === 0
                ? '#0d9488'
                : activeIndex === 1
                ? '#eab308'
                : activeIndex === 2
                ? '#38bdf8'
                : activeIndex === 3
                ? '#ef4444'
                : '#10b981',
            color:
              activeIndex === 0
                ? '#f0fdfa'
                : activeIndex === 1
                ? '#422006'
                : activeIndex === 2
                ? '#082f49'
                : activeIndex === 3
                ? '#fef2f2'
                : '#022c22',
            padding: '14px 40px',
            borderRadius: 50,
            fontSize: 36,
            fontWeight: 900,
            letterSpacing: 1.5,
            transform: `scale(${badgeScale})`,
            boxShadow:
              activeIndex === 4
                ? '0 10px 30px rgba(16, 185, 129, 0.45)'
                : '0 10px 30px rgba(0,0,0,0.5)',
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

        {/* BABAK 2: MESIN PENGADUK KOMPON */}
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
        {/* BABAK 3: PENAMPANG LAPISAN KAWAT BAJA */}
        {activeIndex === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 480,
                height: 480,
                backgroundColor: '#0c1322',
                borderRadius: 28,
                border: '3px solid #1e293b',
                boxShadow: '0 25px 60px rgba(0,0,0,0.95)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'linear-gradient(to right, rgba(56, 189, 248, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.08) 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              <div
                style={{
                  position: 'relative',
                  width: 360,
                  height: 320,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 340,
                    height: 55,
                    backgroundColor: '#18181b',
                    border: '3px solid #3f3f46',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
                    zIndex: 5,
                    transform: `translateY(${interpolate(sceneProgress, [0, 80], [-80, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                  }}
                >
                  {[0, 1, 2, 3, 4, 5].map((g) => (
                    <div
                      key={`tread-bar-${g}`}
                      style={{
                        width: 28,
                        height: 24,
                        backgroundColor: '#27272a',
                        borderRadius: 4,
                        border: '1.5px solid #52525b',
                      }}
                    />
                  ))}
                  <span
                    style={{
                      position: 'absolute',
                      right: -10,
                      top: -24,
                      fontSize: 12,
                      fontWeight: 900,
                      color: '#94a3b8',
                      letterSpacing: 1,
                    }}
                  >
                    LAPISAN TAPAK KARET
                  </span>
                </div>

                <div
                  style={{
                    width: 310,
                    height: 60,
                    margin: '14px 0',
                    backgroundColor: '#0f172a',
                    border: '2.5px solid #38bdf8',
                    borderRadius: 10,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(56, 189, 248, 0.4)',
                    zIndex: 4,
                  }}
                >
                  <svg width="310" height="60" style={{ position: 'absolute' }}>
                    {[-30, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((x, idx) => (
                      <line
                        key={`steel-line-1-${idx}`}
                        x1={x}
                        y1={0}
                        x2={x + 35}
                        y2={60}
                        stroke="#f59e0b"
                        strokeWidth="3.5"
                      />
                    ))}
                    {[-30, 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((x, idx) => (
                      <line
                        key={`steel-line-2-${idx}`}
                        x1={x + 35}
                        y1={0}
                        x2={x}
                        y2={60}
                        stroke="#e2e8f0"
                        strokeWidth="2"
                      />
                    ))}
                  </svg>
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 6,
                      backgroundColor: 'rgba(2, 6, 23, 0.9)',
                      padding: '4px 14px',
                      borderRadius: 6,
                      border: '1px solid #f59e0b',
                      fontSize: 13,
                      fontWeight: 900,
                      color: '#f59e0b',
                      letterSpacing: 1,
                    }}
                  >
                    ★ ANYAMAN KAWAT BAJA (STEEL BELT) ★
                  </div>
                </div>

                <div
                  style={{
                    width: 340,
                    height: 50,
                    backgroundColor: '#1e293b',
                    border: '3px solid #334155',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.9)',
                    zIndex: 3,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 900,
                      color: '#94a3b8',
                      letterSpacing: 1,
                    }}
                  >
                    DASAR RANGKA BAN (CARCASS PLY)
                  </span>
                </div>
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: 18,
                  padding: '6px 18px',
                  backgroundColor: 'rgba(56, 189, 248, 0.1)',
                  border: '1px solid #38bdf8',
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 800,
                  color: '#38bdf8',
                  letterSpacing: 1,
                }}
              >
                KETAHANAN STRUKTUR: ANTI-PECAH
              </div>
            </div>

            <div
              style={{
                marginTop: 22,
                fontSize: 22,
                color: '#38bdf8',
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              KAWAT BAJA DITANAM DI ANTARA LAPISAN KARET
            </div>
          </div>
        )}

        {/* BABAK 4: MESIN PRES HIDROLIK */}
        {activeIndex === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 480,
                height: 480,
                backgroundColor: '#0c1322',
                borderRadius: 28,
                border: '3px solid #1e293b',
                boxShadow: '0 25px 60px rgba(0,0,0,0.95)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px 20px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: 90,
                  background: 'linear-gradient(180deg, #991b1b 0%, #dc2626 100%)',
                  borderRadius: 16,
                  border: '3px solid #ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `translateY(${moldPressY}px)`,
                  boxShadow: `0 10px 30px rgba(239, 68, 68, ${moldGlow})`,
                  zIndex: 5,
                }}
              >
                <span style={{ fontSize: 18, fontWeight: 900, color: '#ffffff', letterSpacing: 1 }}>
                  CETAKAN ATAS • SUHU 200°C
                </span>
              </div>

              <div
                style={{
                  width: '100%',
                  height: 160,
                  backgroundColor: '#18181b',
                  borderRadius: 18,
                  border: '4px solid #3f3f46',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: '0 14px',
                  boxShadow: 'inset 0 0 25px rgba(0,0,0,0.9)',
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={`mold-groove-${i}`}
                    style={{
                      width: 28,
                      height: 110,
                      backgroundColor: '#09090b',
                      borderRadius: 6,
                      border: '2px solid #52525b',
                      boxShadow: 'inset 0 0 8px rgba(0,0,0,0.9)',
                    }}
                  />
                ))}
              </div>

              <div
                style={{
                  width: '100%',
                  height: 90,
                  background: 'linear-gradient(0deg, #991b1b 0%, #dc2626 100%)',
                  borderRadius: 16,
                  border: '3px solid #ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `translateY(${-moldPressY}px)`,
                  boxShadow: `0 -10px 30px rgba(239, 68, 68, ${moldGlow})`,
                  zIndex: 5,
                }}
              >
                <span style={{ fontSize: 18, fontWeight: 900, color: '#ffffff', letterSpacing: 1 }}>
                  CETAKAN BAWAH • HIDROLIK TEKAN
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: 22,
                fontSize: 22,
                color: '#ef4444',
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              POLA ALUR PEMBUANG AIR DICETAK DI SUHU 200°C
            </div>
          </div>
        )}
        {/* BABAK 5: TRUK MUATAN BERAT & CLOSE-UP BAN PRESISI DI TENGAH */}
        {activeIndex === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 500,
                height: 480,
                backgroundColor: '#0c1322',
                borderRadius: 28,
                border: '3px solid #1e293b',
                boxShadow: '0 25px 60px rgba(0,0,0,0.95)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Kanvas Zoom & Pan - Target Pas di Roda Belakang */}
              <div
                style={{
                  position: 'absolute',
                  width: 480,
                  height: 440,
                  transform: `scale(${cameraZoom}) translate(${cameraPanX}px, ${cameraPanY}px)`,
                  transformOrigin: 'center center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Truk Pengangkut Logistik */}
                <div style={{ position: 'relative', width: 440, height: 240, display: 'flex', alignItems: 'flex-end' }}>
                  {/* Kontainer Muatan Berat */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 10,
                      bottom: 60,
                      width: 270,
                      height: 150,
                      backgroundColor: '#1e3a5f',
                      borderRadius: '12px 6px 6px 6px',
                      border: '3px solid #38bdf8',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.7)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 10,
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 900, color: '#93c5fd', letterSpacing: 2 }}>
                      HEAVY CARGO
                    </span>
                    <div
                      style={{
                        marginTop: 8,
                        backgroundColor: '#0f172a',
                        padding: '4px 12px',
                        borderRadius: 6,
                        border: '1.5px solid #facc15',
                        fontSize: 16,
                        fontWeight: 900,
                        color: '#facc15',
                        fontFamily: 'monospace',
                      }}
                    >
                      {truckWeight} KG
                    </div>
                  </div>

                  {/* Kepala Kabin Truk */}
                  <div
                    style={{
                      position: 'absolute',
                      right: 25,
                      bottom: 60,
                      width: 125,
                      height: 140,
                      backgroundColor: '#dc2626',
                      borderRadius: '18px 24px 6px 6px',
                      border: '3px solid #f87171',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: 85,
                        height: 50,
                        backgroundColor: '#38bdf8',
                        margin: '12px 0 0 10px',
                        borderRadius: '8px 16px 4px 4px',
                        border: '2px solid #bae6fd',
                        opacity: 0.85,
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 15,
                        right: 8,
                        width: 14,
                        height: 18,
                        backgroundColor: '#facc15',
                        borderRadius: 4,
                        boxShadow: '0 0 12px #facc15',
                      }}
                    />
                  </div>

                  {/* Sasis Rangka Baja Truk */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 10,
                      bottom: 48,
                      width: 410,
                      height: 16,
                      backgroundColor: '#334155',
                      borderRadius: 4,
                    }}
                  />

                  {/* Roda Belakang 1 (Target Kamera Zoom Utama) */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 35,
                      bottom: 8,
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: '#18181b',
                      border: '8px solid #09090b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: b5Progress > 90 ? '0 0 35px #10b981' : '0 6px 15px rgba(0,0,0,0.9)',
                    }}
                  >
                    {/* Alur Gerigi Tapak Ban Truk */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                      <div
                        key={`b5-tread-${deg}`}
                        style={{
                          position: 'absolute',
                          width: 4,
                          height: 8,
                          backgroundColor: '#3f3f46',
                          transform: `rotate(${deg}deg) translateY(-37px)`,
                        }}
                      />
                    ))}

                    {/* Velg Truk Baja Baut Lingkar */}
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        backgroundColor: '#0f172a',
                        border: '3px solid #cbd5e1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      {[0, 60, 120, 180, 240, 300].map((rot) => (
                        <div
                          key={`baut-${rot}`}
                          style={{
                            position: 'absolute',
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            backgroundColor: '#94a3b8',
                            transform: `rotate(${rot}deg) translateY(-14px)`,
                          }}
                        />
                      ))}
                      <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10b981' }} />
                    </div>
                  </div>

                  {/* Roda Belakang 2 */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 130,
                      bottom: 8,
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: '#18181b',
                      border: '8px solid #09090b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 15px rgba(0,0,0,0.9)',
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        backgroundColor: '#0f172a',
                        border: '3px solid #cbd5e1',
                      }}
                    />
                  </div>

                  {/* Roda Depan */}
                  <div
                    style={{
                      position: 'absolute',
                      right: 45,
                      bottom: 8,
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: '#18181b',
                      border: '8px solid #09090b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 15px rgba(0,0,0,0.9)',
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        backgroundColor: '#0f172a',
                        border: '3px solid #cbd5e1',
                      }}
                    />
                  </div>
                </div>

                {/* Aspal Jalanan */}
                <div
                  style={{
                    width: 460,
                    height: 14,
                    backgroundColor: '#334155',
                    borderRadius: 6,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.8)',
                  }}
                />
              </div>

              {/* HUD Indikator Close-up Ban (Diletakkan di Bawah Roda) */}
              {b5Progress > 95 && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 24,
                    backgroundColor: 'rgba(2, 6, 23, 0.94)',
                    padding: '8px 22px',
                    borderRadius: 20,
                    border: '1.5px solid #10b981',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 0 25px rgba(16, 185, 129, 0.45)',
                    zIndex: 20,
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 900, color: '#94a3b8', letterSpacing: 1 }}>
                    STRUKTUR RADIAL KAWAT BAJA
                  </span>
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 900,
                      color: '#10b981',
                      fontFamily: 'monospace',
                      marginTop: 2,
                    }}
                  >
                    BEBAN TERTOPANG: 8.000 KG / BAN
                  </span>
                </div>
              )}
            </div>

            <div
              style={{
                marginTop: 22,
                fontSize: 22,
                color: '#10b981',
                fontWeight: 700,
                letterSpacing: 1.5,
              }}
            >
              {b5Progress < 95 ? 'TRUK MUATAN 32 TON MELAJU' : 'BAN KARET BAJA MENAHAN TEKANAN EKSTREM'}
            </div>
          </div>
        )}
      </div>

      {/* SUBTITLE GAYA KONTEN INFLASI */}
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
              backgroundColor:
                activeIndex === 0
                  ? '#0d9488'
                  : activeIndex === 1
                  ? '#eab308'
                  : activeIndex === 2
                  ? '#38bdf8'
                  : activeIndex === 3
                  ? '#ef4444'
                  : '#10b981',
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
