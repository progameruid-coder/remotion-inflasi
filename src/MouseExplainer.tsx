import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const MouseExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 5 Babak sesuai alur video (Total: 1800 frame / 60 detik @ 30 FPS)
  const scenes = [
    {
      start: 0,
      duration: 360,
      subIndo: 'Kalau kamu geser mouse komputer, di bawahnya nggak ada yang muter.',
      subEng: 'When you move a computer mouse, underneath it nothing turns.',
    },
    {
      start: 360,
      duration: 360,
      subIndo: 'Ternyata lampu itu cuma buat kamera mini yang terus motret permukaan mousepad.',
      subEng: 'Turns out that light is only for a tiny camera that keeps photographing the surface.',
    },
    {
      start: 720,
      duration: 360,
      subIndo: 'Cahayanya nyorot miring dari samping, jadi serat kecil mousepad punya bayangan.',
      subEng: 'The light shines in low from the side, casting shadows over the tiny fibers.',
    },
    {
      start: 1080,
      duration: 360,
      subIndo: 'Chip di dalamnya ngebandingin tiap foto dan ngitung ke mana polanya geser.',
      subEng: 'The internal chip compares each photo to figure out which way the pattern moved.',
    },
    {
      start: 1440,
      duration: 360,
      subIndo: 'Biar kursor nggak telat, fotonya diambil ribuan kali tiap detik!',
      subEng: 'So the cursor never lags, it snaps thousands of photos every single second!',
    },
  ];

  const currentSceneIndex = scenes.findIndex(
    (s) => frame >= s.start && frame < s.start + s.duration
  );
  const activeIndex = currentSceneIndex === -1 ? scenes.length - 1 : currentSceneIndex;
  const currentScene = scenes[activeIndex];
  const sceneProgress = frame - currentScene.start;

  // Animasi Pop Subtitle tiap transisi babak
  const textPop = spring({
    frame: sceneProgress,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 130 },
  });

  // Animasi Gerak Mouse (Babak 1)
  const mouseMoveX = Math.sin(frame * 0.08) * 70;
  const mouseMoveY = Math.cos(frame * 0.08) * 40;

  // Denyut Sinar LED (Babak 2 & 3)
  const lightPulse = 0.85 + Math.sin(frame * 0.2) * 0.15;

  // Animasi Pergeseran Pola Foto (Babak 4)
  const photoShiftX = interpolate(sceneProgress, [30, 90], [0, 24], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Counter Pemotretan Ribuan Foto/Detik (Babak 5)
  const burstCount = Math.round(
    interpolate(sceneProgress, [10, 180], [1500, 10000], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

    return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#0c0f17',
        color: '#ffffff',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '50px 30px 70px 30px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 1. HEADER / WATERMARK KANAL */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          zIndex: 20,
        }}
      >
        <div style={{ fontSize: 13, color: '#94a3b8', letterSpacing: 1 }}>
          @waitreallyfact.s
        </div>
        <div
          style={{
            backgroundColor: '#f59e0b',
            color: '#000000',
            width: 38,
            height: 38,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            fontWeight: 900,
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
          }}
        >
          ?!
        </div>
        <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: 0.5 }}>
          Wait, Really!?
        </div>
      </div>

      {/* 2. PANGGUNG PUSAT VISUALISASI */}
      <div
        style={{
          position: 'relative',
          width: 540,
          height: 600,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          perspective: 1000,
          zIndex: 10,
        }}
      >
        {/* BABAK 1: MEJA KOMPUTER, MOUSEPAD & MOUSE BERGERAK */}
        {activeIndex === 0 && (
          <div
            style={{
              position: 'relative',
              width: 480,
              height: 480,
              transform: 'rotateX(35deg)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Permukaan Meja Kayu */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#b45309',
                borderRadius: 24,
                boxShadow: 'inset 0 0 60px rgba(0,0,0,0.6)',
                border: '4px solid #78350f',
              }}
            />

            {/* Mousepad Hitam */}
            <div
              style={{
                width: 320,
                height: 320,
                backgroundColor: '#111827',
                borderRadius: 16,
                border: '3px solid #1f2937',
                boxShadow: '0 15px 35px rgba(0,0,0,0.8)',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Bodi Mouse */}
              <div
                style={{
                  width: 90,
                  height: 145,
                  backgroundColor: '#f8fafc',
                  borderRadius: '45px 45px 35px 35px',
                  border: '3px solid #cbd5e1',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.7)',
                  transform: `translate(${mouseMoveX}px, ${mouseMoveY}px)`,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 28,
                    backgroundColor: '#0f172a',
                    borderRadius: 6,
                    marginTop: 18,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: -8,
                    width: 40,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: '#ef4444',
                    filter: 'blur(8px)',
                    opacity: 0.8,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* BABAK 2: POTONGAN MELINTANG (LAMPU & KAMERA SENSOR) */}
        {activeIndex === 1 && (
          <div
            style={{
              position: 'relative',
              width: 500,
              height: 420,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="480" height="260" viewBox="0 0 480 260">
              <path
                d="M 40 220 C 40 100 160 40 380 40 L 440 220 Z"
                fill="none"
                stroke="#475569"
                strokeWidth="6"
              />
              <rect x="80" y="140" width="320" height="14" fill="#059669" rx="3" />

              <rect x="360" y="115" width="28" height="25" fill="#ef4444" rx="4" />
              <text x="350" y="100" fill="#f87171" fontSize="15" fontWeight="900">
                Lampu LED
              </text>

              <polygon
                points="360,130 240,240 210,240"
                fill="rgba(239, 68, 68, 0.35)"
                style={{ opacity: lightPulse }}
              />

              <rect x="180" y="90" width="60" height="50" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" rx="6" />
              <text x="160" y="75" fill="#38bdf8" fontSize="15" fontWeight="900">
                Kamera Mini
              </text>

              <polygon points="190,140 230,140 240,240 180,240" fill="rgba(56, 189, 248, 0.25)" />
              <line x1="20" y1="242" x2="460" y2="242" stroke="#f59e0b" strokeWidth="6" />
            </svg>

            <div
              style={{
                marginTop: 20,
                padding: '8px 24px',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                border: '1.5px solid #38bdf8',
                borderRadius: 20,
                fontSize: 16,
                fontWeight: 800,
                color: '#38bdf8',
              }}
            >
              MEMOTRET PERMUKAAN MIKROSKOPIS
            </div>
          </div>
        )}

                {/* BABAK 3: CLOSE-UP SERAT MOUSEPAD & BAYANGAN */}
        {activeIndex === 2 && (
          <div
            style={{
              position: 'relative',
              width: 480,
              height: 480,
              backgroundColor: '#1e1103',
              borderRadius: 24,
              border: '3px solid #78350f',
              boxShadow: 'inset 0 0 50px rgba(0,0,0,0.9)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 80px)',
                gap: 12,
                transform: 'rotate(-12deg)',
              }}
            >
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={`fiber-${i}`}
                  style={{
                    width: 76,
                    height: 55,
                    backgroundColor: '#ea580c',
                    borderRadius: 12,
                    borderRight: '12px solid #7c2d12',
                    boxShadow: '0 8px 18px rgba(0,0,0,0.8)',
                  }}
                />
              ))}
            </div>

            <div
              style={{
                position: 'absolute',
                top: 20,
                right: 25,
                padding: '6px 16px',
                backgroundColor: 'rgba(239, 68, 68, 0.25)',
                border: '1px solid #ef4444',
                borderRadius: 14,
                fontSize: 13,
                fontWeight: 900,
                color: '#fca5a5',
              }}
            >
              CAHAYA MIRING DARI SAMPING
            </div>
          </div>
        )}

        {/* BABAK 4: CHIP MEMBANDINGKAN POLA FOTO */}
        {activeIndex === 3 && (
          <div
            style={{
              position: 'relative',
              width: 500,
              height: 440,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 25,
            }}
          >
            <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
              <div
                style={{
                  width: 170,
                  height: 170,
                  backgroundColor: '#78350f',
                  border: '4px solid #94a3b8',
                  borderRadius: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 900, color: '#fcd34d', marginBottom: 6 }}>
                  FOTO 1
                </div>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 0 15px #ffffff',
                  }}
                />
              </div>

              <div style={{ fontSize: 32, fontWeight: 900, color: '#38bdf8' }}>➔</div>

              <div
                style={{
                  width: 170,
                  height: 170,
                  backgroundColor: '#78350f',
                  border: '4px solid #38bdf8',
                  borderRadius: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(56, 189, 248, 0.4)',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 900, color: '#38bdf8', marginBottom: 6 }}>
                  FOTO 2 (GESER)
                </div>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 0 15px #ffffff',
                    transform: `translateX(${photoShiftX}px)`,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                padding: '8px 24px',
                borderRadius: 16,
                border: '1.5px solid #38bdf8',
              }}
            >
              POLA BERGESER: +{Math.round(photoShiftX)} PX KE KANAN
            </div>
          </div>
        )}

        {/* BABAK 5: PARTIKEL FOTO & COUNTER KECEPATAN */}
        {activeIndex === 4 && (
          <div
            style={{
              position: 'relative',
              width: 500,
              height: 480,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={`burst-photo-${i}`}
                style={{
                  position: 'absolute',
                  top: 240 + Math.sin(frame * 0.1 + i) * 160,
                  left: 250 + Math.cos(frame * 0.1 + i) * 180,
                  width: 36,
                  height: 36,
                  backgroundColor: '#ea580c',
                  border: '2px solid #ffffff',
                  borderRadius: 4,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
                }}
              />
            ))}

            <div
              style={{
                width: 100,
                height: 160,
                backgroundColor: '#09090b',
                borderRadius: '50px 50px 40px 40px',
                border: '3px solid #ef4444',
                boxShadow: '0 0 40px rgba(239, 68, 68, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 30,
                  backgroundColor: '#ef4444',
                  borderRadius: 6,
                  boxShadow: '0 0 15px #ef4444',
                }}
              />
            </div>

            <div
              style={{
                marginTop: 35,
                fontSize: 54,
                fontWeight: 900,
                color: '#facc15',
                fontFamily: 'monospace',
                textShadow: '0 0 25px rgba(250, 204, 21, 0.6)',
              }}
            >
              {burstCount.toLocaleString()}
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#f8fafc', letterSpacing: 3 }}>
              FOTO / DETIK
            </div>
          </div>
        )}
      </div>

      {/* 3. SUBTITLE BILINGUAL (INDONESIA & INGGRIS) */}
      <div
        style={{
          width: '92%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          transform: `scale(${textPop})`,
          zIndex: 20,
          minHeight: 110,
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 27,
            fontWeight: 900,
            lineHeight: 1.35,
            color: '#ffffff',
            textShadow: '0 3px 12px rgba(0,0,0,1)',
          }}
        >
          {currentScene.subIndo}
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: '#94a3b8',
            marginTop: 6,
            fontStyle: 'italic',
          }}
        >
          {currentScene.subEng}
        </div>
      </div>
    </div>
  );
};
