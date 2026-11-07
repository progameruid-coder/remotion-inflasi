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
      script: 'Getah pohon karet aslinya lembek dan gampang meleleh, tapi bisa diolah menahan beban mobil hingga berton-ton!',
    },
    {
      start: 240,
      duration: 360,
      badge: '2 • VULKANISASI BELERANG',
      subtitle: 'CAMPURAN CARBON & SULFUR',
      script: 'Karet dicampur bubuk sulfur dan carbon black agar warna hitam pekat sekaligus mengikat rantai molekul jadi 10x lebih kuat.',
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
        {/* BABAK 2: TANGKI PENCAMPUR & REAKSI VULKANISASI */}
        {activeIndex === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Tangki Reaktor Pengaduk Silinder Industri */}
            <div
              style={{
                width: 440,
                height: 440,
                borderRadius: '36px',
                background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                border: '5px solid #334155',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 25px 60px rgba(0,0,0,0.9)',
                overflow: 'hidden',
              }}
            >
              {/* Batang Pengaduk Berputar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  width: 14,
                  height: 180,
                  backgroundColor: '#94a3b8',
                  borderRadius: 7,
                  zIndex: 4,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
                }}
              />

              {/* Wadah Adonan Karet yang Berubah Warna */}
              <div
                style={{
                  width: 340,
                  height: 340,
                  borderRadius: '50%',
                  backgroundColor: `rgb(${Math.round(245 - rubberColorProgress * 225)}, ${Math.round(245 - rubberColorProgress * 225)}, ${Math.round(245 - rubberColorProgress * 220)})`,
                  border: '6px solid #eab308',
                  boxShadow: '0 0 45px rgba(234, 179, 8, 0.45)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'background-color 0.1s ease',
                }}
              >
                {/* Partikel Sulfur Kuning Jatuh Mengaduk */}
                {[0, 1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={`sulfur-${s}`}
                    style={{
                      position: 'absolute',
                      top: 40 + ((frame * 3 + s * 45) % 240),
                      left: 50 + (s * 50) % 250,
                      width: 22,
                      height: 22,
                      backgroundColor: '#facc15',
                      borderRadius: '50%',
                      boxShadow: '0 0 12px #facc15',
                      transform: `rotate(${frame * 4}deg)`,
                    }}
                  />
                ))}

                {/* Butiran Carbon Black */}
                {[0, 1, 2, 3].map((c) => (
                  <div
                    key={`carbon-${c}`}
                    style={{
                      position: 'absolute',
                      top: 60 + ((frame * 2 + c * 60) % 220),
                      right: 40 + (c * 55) % 240,
                      width: 18,
                      height: 18,
                      backgroundColor: '#09090b',
                      borderRadius: 4,
                      border: '1px solid #52525b',
                    }}
                  />
                ))}

                {/* Label Formula Bahan */}
                <div
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    padding: '8px 22px',
                    borderRadius: 30,
                    border: '1.5px solid #eab308',
                    fontSize: 20,
                    fontWeight: 900,
                    color: '#facc15',
                    zIndex: 5,
                    marginBottom: 8,
                  }}
                >
                  + CARBON BLACK
                </div>
                <div
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    padding: '6px 18px',
                    borderRadius: 30,
                    border: '1.5px solid #cbd5e1',
                    fontSize: 18,
                    fontWeight: 800,
                    color: '#f8fafc',
                    zIndex: 5,
                  }}
                >
                  + SULFUR (BELERANG)
                </div>
              </div>
            </div>

            {/* Indikator Kekuatan Tarik HUD */}
            <div
              style={{
                marginTop: 25,
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

      {/* SUBTITLE KOTAK AMAN (SAFE ZONE) */}
      <div
        style={{
          width: '90%',
          minHeight: 110,
          backgroundColor: 'rgba(15, 23, 42, 0.88)',
          border: '1.5px solid rgba(13, 148, 136, 0.4)',
          borderRadius: 20,
          padding: '16px 28px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
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
