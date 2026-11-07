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
      subtitle: 'BAHAN DASAR ALAMI',
      script: 'Getah pohon karet aslinya lembek dan gampang meleleh, tapi bisa diolah menahan beban mobil hingga berton-ton!',
    },
    {
      start: 240,
      duration: 360,
      badge: '2 • VULKANISASI BELERANG',
      subtitle: 'CAMPURAN CARBON & SULFUR',
      script: 'Karet dicampur bubuk sulfur dan carbon black agar warna hitam pekat sekaligus mengikat rantai molekul jadi 10x lebih kuat.',
    },
    {
      start: 600,
      duration: 420,
      badge: '3 • RANGKA KAWAT BAJA',
      subtitle: 'STEEL BELT INNER CORE',
      script: 'Rahasia kekuatannya ada di dalam: lapisan rajutan kawat baja dipasang menyilang agar ban tidak pecah dihantam beban ekstrem.',
    },
    {
      start: 1020,
      duration: 240,
      badge: '4 • CETAKAN HIDROLIK',
      subtitle: 'PEMBENTUKAN ALUR TIRE TREAD',
      script: 'Ban mentah dipanaskan dalam mesin pres hidrolik untuk mencetak motif tapak pembuang air dan pencengkeram aspal.',
    },
    {
      start: 1260,
      duration: 240,
      badge: '5 • TAHAN BEBAN BERTON-TON',
      subtitle: 'RODA MOBIL SIAP MELAJU',
      script: 'Hasilnya, ban karet elastis ini siap menopang mobilmu melaju kencang di jalanan ekstrem dengan aman!',
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

  const subtitleOpacity = spring({
    frame: sceneProgress,
    fps,
    config: { damping: 15, mass: 0.5 },
  });

  const rubberColorProgress = interpolate(frame, [260, 480], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const steelWireProgress = interpolate(frame, [630, 850], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const moldPressY = interpolate(frame, [1040, 1150], [90, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const loadWeight = Math.round(
    interpolate(frame, [1270, 1420], [500, 3200], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

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
      <Sequence from={595} durationInFrames={35}>
        <Audio src={staticFile('whoosh.mp3')} volume={0.3} />
      </Sequence>
      <Sequence from={1015} durationInFrames={35}>
        <Audio src={staticFile('whoosh.mp3')} volume={0.3} />
      </Sequence>
      <Sequence from={1255} durationInFrames={35}>
        <Audio src={staticFile('whoosh.mp3')} volume={0.3} />
      </Sequence>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 50% 45%, rgba(15, 118, 110, 0.25) 0%, transparent 75%), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
          opacity: 0.85,
        }}
      />

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
            backgroundColor: '#14b8a6',
            color: '#042f2e',
            padding: '14px 38px',
            borderRadius: 50,
            fontSize: 36,
            fontWeight: 900,
            letterSpacing: 1.5,
            transform: `scale(${badgeScale})`,
            boxShadow: '0 10px 28px rgba(20, 184, 166, 0.4)',
            textTransform: 'uppercase',
          }}
        >
          {currentScene.badge}
        </div>
        <div
          style={{
            fontSize: 22,
            color: '#94a3b8',
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          {currentScene.subtitle}
        </div>
      </div>

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
            border: '2px dashed rgba(255, 255, 255, 0.14)',
            boxShadow: 'inset 0 0 60px rgba(0,0,0,0.8)',
          }}
        />

        {activeIndex === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 320,
                height: 320,
                backgroundColor: '#f8fafc',
                borderRadius: '45% 55% 60% 40% / 50% 60% 40% 50%',
                boxShadow: '0 25px 50px rgba(255, 255, 255, 0.15), inset -10px -10px 25px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${1 + Math.sin(frame / 8) * 0.04})`,
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 900, color: '#0f172a' }}>LATEKS ALAMI</div>
            </div>
            <div
              style={{
                marginTop: 35,
                padding: '10px 26px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 12,
                fontSize: 22,
                color: '#e2e8f0',
                fontWeight: 700,
              }}
            >
              Polimer Alami Lembut & Elastis
            </div>
          </div>
        )}
        {activeIndex === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 360,
                height: 360,
                borderRadius: 40,
                backgroundColor: `rgb(${Math.round(240 - rubberColorProgress * 215)}, ${Math.round(240 - rubberColorProgress * 215)}, ${Math.round(240 - rubberColorProgress * 210)})`,
                border: '4px solid #f59e0b',
                boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 15,
                transition: 'all 0.1s ease-out',
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: rubberColorProgress > 0.5 ? '#f59e0b' : '#0f172a',
                }}
              >
                + CARBON BLACK
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: rubberColorProgress > 0.5 ? '#e2e8f0' : '#475569',
                }}
              >
                + SULFUR (BELERANG)
              </div>
            </div>
            <div
              style={{
                marginTop: 30,
                fontSize: 26,
                fontWeight: 900,
                color: '#f59e0b',
                fontFamily: 'monospace',
                letterSpacing: 2,
              }}
            >
              KEKUATAN TARIK: +1.000%
            </div>
          </div>
        )}

        {activeIndex === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 480,
                height: 480,
                borderRadius: '50%',
                backgroundColor: '#1e293b',
                border: '18px solid #0f172a',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
              }}
            >
              <svg width="400" height="400" style={{ position: 'absolute' }}>
                {[-120, -60, 0, 60, 120].map((offset, idx) => (
                  <line
                    key={`l1-${idx}`}
                    x1={0}
                    y1={200 + offset}
                    x2={(400 * steelWireProgress) / 100}
                    y2={offset}
                    stroke="#38bdf8"
                    strokeWidth="5"
                    strokeDasharray="6,4"
                  />
                ))}
                {[-120, -60, 0, 60, 120].map((offset, idx) => (
                  <line
                    key={`l2-${idx}`}
                    x1={0}
                    y1={offset}
                    x2={(400 * steelWireProgress) / 100}
                    y2={200 + offset}
                    stroke="#f59e0b"
                    strokeWidth="5"
                    strokeDasharray="6,4"
                  />
                ))}
              </svg>
              <div
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  backgroundColor: '#0a0d14',
                  border: '6px solid #475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  fontWeight: 900,
                  color: '#94a3b8',
                }}
              >
                VELG MOBIL
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
              SABUK ANYAMAN BAJA MENYILANG (STEEL BELT)
            </div>
          </div>
        )}
        {activeIndex === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 440,
                height: 480,
                backgroundColor: '#0f172a',
                borderRadius: 24,
                border: '3px solid rgba(255,255,255,0.2)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 24,
                boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
              }}
            >
              <div
                style={{
                  height: 90,
                  backgroundColor: '#ef4444',
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  fontWeight: 900,
                  color: '#ffffff',
                  transform: `translateY(${moldPressY}px)`,
                  boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4)',
                }}
              >
                MESIN HIDROLIK SUHU 200°C
              </div>

              <div
                style={{
                  height: 160,
                  backgroundColor: '#18181b',
                  borderRadius: 18,
                  border: '4px solid #3f3f46',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: '0 15px',
                }}
              >
                {[0, 1, 2, 3, 4, 5].map((t) => (
                  <div
                    key={t}
                    style={{
                      width: 24,
                      height: 110,
                      backgroundColor: '#27272a',
                      borderRadius: 8,
                      border: '2px solid #71717a',
                    }}
                  />
                ))}
              </div>

              <div
                style={{
                  height: 90,
                  backgroundColor: '#ef4444',
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  fontWeight: 900,
                  color: '#ffffff',
                  transform: `translateY(${-moldPressY}px)`,
                  boxShadow: '0 -10px 25px rgba(239, 68, 68, 0.4)',
                }}
              >
                CETAKAN ALUR TAPAK (TREAD)
              </div>
            </div>
            <div
              style={{
                marginTop: 25,
                fontSize: 22,
                color: '#e2e8f0',
                fontWeight: 700,
              }}
            >
              ALUR PEMBUANG AIR & ANTI-SLIP DIBENTUK
            </div>
          </div>
        )}

        {activeIndex === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: 480,
                height: 480,
                borderRadius: '50%',
                backgroundColor: '#18181b',
                border: '28px solid #27272a',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                boxShadow: '0 30px 70px rgba(0,0,0,0.9)',
                transform: `scaleY(${1 - (loadWeight / 3200) * 0.08})`,
              }}
            >
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: '50%',
                  backgroundColor: '#0f172a',
                  border: '8px solid #94a3b8',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(148, 163, 184, 0.4)',
                }}
              >
                <div style={{ fontSize: 18, color: '#94a3b8', fontWeight: 800 }}>TEKANAN</div>
                <div style={{ fontSize: 32, color: '#38bdf8', fontWeight: 900 }}>35 PSI</div>
              </div>
            </div>
            <div
              style={{
                marginTop: 25,
                fontSize: 36,
                color: '#10b981',
                fontWeight: 900,
                fontFamily: 'monospace',
                letterSpacing: 2,
                textShadow: '0 0 15px rgba(16, 185, 129, 0.5)',
              }}
            >
              BEBAN TERTOPANG: {loadWeight} KG
            </div>
          </div>
        )}
      </div>
      {/* SUBTITLE KOTAK AMAN (SAFE ZONE) */}
      <div
        style={{
          width: '90%',
          minHeight: 110,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          border: '1.5px solid rgba(20, 184, 166, 0.35)',
          borderRadius: 20,
          padding: '16px 28px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          opacity: subtitleOpacity,
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1.4,
            color: '#f8fafc',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          {currentScene.script}
        </div>
      </div>

      {/* FOOTER: PROGRESS BAR */}
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
              backgroundColor: '#14b8a6',
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
