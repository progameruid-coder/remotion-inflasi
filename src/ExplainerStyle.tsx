import React from 'react';
import {
  Audio,
  Sequence,
  staticFile,
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
  activeKeywords: string[];
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
    activeKeywords: ['selalu', 'naik?'],
    topBadge: 'HARGA MAKANAN',
    callout: { label: 'HARGA AWAL', value: 'Rp 20.000', type: 'bar' },
  },
  {
    id: 2,
    startFrame: 225,
    endFrame: 480,
    idText: 'Bukan pedagangnya yang pelit, tapi mesin cetak uang jalan terus dan uang beredar terlalu cepat!',
    enText: 'It is not the seller being stingy, but continuous money printing increases supply too fast!',
    activeKeywords: ['cetak', 'uang'],
    topBadge: 'PASOKAN UANG',
    callout: { label: 'UANG BEREDAR', value: '+350%', type: 'arrow-up' },
  },
  {
    id: 3,
    startFrame: 480,
    endFrame: 720,
    idText: 'Uang Rp 20.000 kamu yang dulu dapat porsi penuh, sekarang porsinya dipangkas separuh.',
    enText: 'Your 20k that once bought a full bowl now only gets you half a portion.',
    activeKeywords: ['dipangkas', 'separuh.'],
    topBadge: 'DAYA BELI',
    callout: { label: 'PORSI MAKAN', value: '-50%', type: 'arrow-down' },
  },
  {
    id: 4,
    startFrame: 720,
    endFrame: 900,
    idText: 'Nominal uang di dompetmu sama, tapi nilai aslinya menguap. Itulah inflasi!',
    enText: 'The nominal cash in your wallet stays identical, but purchasing power evaporates. That is inflation!',
    activeKeywords: ['menguap.', 'inflasi!'],
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

  const bowlScale = spring({
    frame: sceneProgress,
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 180 },
  });

  const rollerAngle = (frame * 14) % 360;
  const billDropY = (frame * 10) % 150;
  const stackGrowth = interpolate(sceneProgress, [0, 240], [25, 80], {
    extrapolateRight: 'clamp',
  });

  const meatballScale = interpolate(sceneProgress, [20, 180], [1, 0.45], {
    extrapolateRight: 'clamp',
  });

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
        backgroundColor: '#0d1017',
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
            {/* 1. MUSIK LATAR (Sepanjang 30 detik) */}
      <Sequence from={0} durationInFrames={900}>
        <Audio src={staticFile('bgm.mp3')} volume={0.12} />
      </Sequence>

      {/* 2. EFEK SUARA */}
      <Sequence from={220} durationInFrames={35}>
        <Audio src={staticFile('whoosh.mp3')} volume={0.3} />
      </Sequence>
      <Sequence from={475} durationInFrames={35}>
        <Audio src={staticFile('whoosh.mp3')} volume={0.3} />
      </Sequence>
      <Sequence from={715} durationInFrames={35}>
        <Audio src={staticFile('whoosh.mp3')} volume={0.3} />
      </Sequence>

      <Sequence from={250} durationInFrames={70}>
        <Audio src={staticFile('cash.mp3')} volume={0.35} />
      </Sequence>

      <Sequence from={500} durationInFrames={40}>
        <Audio src={staticFile('pop.mp3')} volume={0.35} />
      </Sequence>

                    {/* VOICEOVER PER ADENGAN */}
              <Sequence from={0} durationInFrames={225}>
        <Audio src={staticFile('VO1.mp3')} volume={1} />
      </Sequence>
      <Sequence from={225} durationInFrames={255}>
        <Audio src={staticFile('VO2.mp3')} volume={1} />
      </Sequence>
      <Sequence from={480} durationInFrames={240}>
        <Audio src={staticFile('VO3.mp3')} volume={1} />
      </Sequence>
      <Sequence from={720} durationInFrames={180}>
        <Audio src={staticFile('VO4.mp3')} volume={1} />
      </Sequence>

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
            borderRadius: 40,
            border: '2px dashed rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(255,255,255,0.02)',
          }}
        />

        {currentScene.id === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${bowlScale})` }}>
            <div
              style={{
                width: 360,
                height: 360,
                borderRadius: '50%',
                backgroundColor: '#f8fafc',
                border: '14px solid #e2e8f0',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6), inset 0 6px 18px rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: 334,
                  height: 334,
                  borderRadius: '50%',
                  border: '3px solid #2563eb',
                  opacity: 0.7,
                }}
              />
              <div
                style={{
                  width: 290,
                  height: 290,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #d97706 0%, #b45309 65%, #78350f 100%)',
                  boxShadow: 'inset 0 10px 25px rgba(0,0,0,0.5)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="280" height="280" viewBox="0 0 100 100" style={{ position: 'absolute', opacity: 0.55 }}>
                  <path d="M 20 40 Q 50 15 80 45" stroke="#facc15" strokeWidth="3" fill="none" />
                  <path d="M 25 55 Q 55 85 75 50" stroke="#facc15" strokeWidth="2.5" fill="none" />
                  <path d="M 30 30 Q 60 65 70 30" stroke="#ffffff" strokeWidth="2" fill="none" />
                </svg>
                <div style={{ position: 'absolute', top: 100, left: 100, width: 90, height: 90, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #9a3412 0%, #6c230b 60%, #431407 100%)', boxShadow: '4px 6px 14px rgba(0,0,0,0.6)', border: '2px solid #b45309' }} />
                <div style={{ position: 'absolute', top: 45, left: 60, width: 72, height: 72, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #9a3412 0%, #6c230b 60%, #431407 100%)', boxShadow: '3px 5px 12px rgba(0,0,0,0.55)', border: '2px solid #b45309' }} />
                <div style={{ position: 'absolute', bottom: 45, right: 65, width: 68, height: 68, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #9a3412 0%, #6c230b 60%, #431407 100%)', boxShadow: '3px 5px 12px rgba(0,0,0,0.55)', border: '2px solid #b45309' }} />
                <div style={{ position: 'absolute', top: 85, right: 90, width: 14, height: 8, backgroundColor: '#22c55e', borderRadius: 4, transform: 'rotate(25deg)' }} />
                <div style={{ position: 'absolute', bottom: 105, left: 80, width: 12, height: 7, backgroundColor: '#16a34a', borderRadius: 4, transform: 'rotate(-40deg)' }} />
                <div style={{ position: 'absolute', top: 140, right: 75, width: 10, height: 5, backgroundColor: '#78350f', borderRadius: 2 }} />
                <div style={{ position: 'absolute', top: 125, left: 110, width: 8, height: 4, backgroundColor: '#92400e', borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ marginTop: 26, backgroundColor: '#16a34a', padding: '10px 28px', borderRadius: 20, fontWeight: 900, fontSize: 26, letterSpacing: 1, boxShadow: '0 4px 15px rgba(22,163,74,0.4)' }}>
              PORSI LENGKAP 100%
            </div>
          </div>
        )}
        {currentScene.id === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: 520, height: 540, justifyContent: 'center' }}>
            <div style={{ width: 440, height: 230, backgroundColor: '#1e293b', borderRadius: 20, border: '6px solid #475569', boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 2px 8px rgba(255,255,255,0.1)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
              <div style={{ position: 'absolute', top: 14, left: 20, display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <span style={{ fontSize: 13, fontWeight: 900, color: '#94a3b8', letterSpacing: 1, marginLeft: 6 }}>PRINT-UNIT #01</span>
              </div>
              <div style={{ position: 'absolute', left: -28, width: 56, height: 56, borderRadius: '50%', border: '6px dashed #64748b', backgroundColor: '#334155', transform: `rotate(${rollerAngle * 1.5}deg)`, boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 320, height: 55, borderRadius: 28, background: 'linear-gradient(180deg, #94a3b8 0%, #475569 50%, #1e293b 100%)', border: '3px solid #cbd5e1', boxShadow: 'inset 0 4px 6px rgba(255,255,255,0.4)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(0,0,0,0.3) 15px, rgba(0,0,0,0.3) 20px)', transform: `translateX(${(frame * 6) % 20}px)` }} />
                </div>
                <div style={{ width: 340, height: 4, backgroundColor: '#000000', opacity: 0.8 }} />
                <div style={{ width: 320, height: 55, borderRadius: 28, background: 'linear-gradient(0deg, #94a3b8 0%, #475569 50%, #1e293b 100%)', border: '3px solid #cbd5e1', boxShadow: 'inset 0 -4px 6px rgba(255,255,255,0.4)' }} />
              </div>
              <div style={{ position: 'absolute', right: 20, top: 14, backgroundColor: '#0f172a', padding: '4px 10px', borderRadius: 6, border: '1px solid #334155', fontSize: 12, fontWeight: 900, color: '#38bdf8' }}>
                HIGH SPEED
              </div>
            </div>
            <div style={{ position: 'absolute', top: 220, width: 250, height: 125, background: 'linear-gradient(135deg, #166534 0%, #15803d 50%, #14532d 100%)', borderRadius: 12, border: '3px solid #4ade80', boxShadow: '0 12px 30px rgba(22,101,52,0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px 14px', color: '#ffffff', transform: `translateY(${billDropY}px)`, zIndex: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: '#86efac' }}>BANK INDONESIA</span>
                <span style={{ fontSize: 11, color: '#cbd5e1' }}>100000</span>
              </div>
              <div style={{ textAlign: 'center', fontSize: 30, fontWeight: 900, letterSpacing: 1, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Rp 100.000</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#86efac' }}>
                <span>EMISI 2024</span>
                <span>SERI NO. 99482</span>
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: 20, width: 420, height: 70, backgroundColor: '#0f172a', borderRadius: 16, border: '4px solid #22c55e', boxShadow: '0 14px 35px rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', zIndex: 4 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#4ade80', letterSpacing: 2 }}>OUTPUT: BANJIR LIKUIDITAS</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>Pasokan Uang Melonjak Tajam</div>
            </div>
          </div>
        )}

        {currentScene.id === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 360, height: 360, borderRadius: '50%', backgroundColor: '#f8fafc', border: '14px solid #e2e8f0', boxShadow: '0 25px 60px rgba(0,0,0,0.6), inset 0 6px 18px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', width: 334, height: 334, borderRadius: '50%', border: '3px solid #2563eb', opacity: 0.7 }} />
              <div style={{ width: 290, height: 290, borderRadius: '50%', background: 'radial-gradient(circle, #78350f 0%, #451a03 100%)', boxShadow: 'inset 0 10px 25px rgba(0,0,0,0.6)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ transform: `scale(${meatballScale})`, position: 'absolute', top: 100, left: 100 }}>
                  <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #9a3412 0%, #6c230b 60%, #431407 100%)', boxShadow: '4px 6px 14px rgba(0,0,0,0.6)', border: '2px solid #b45309' }} />
                </div>
                <div style={{ position: 'absolute', top: 50, right: 65, fontSize: 44, opacity: 0.4 }}>❌</div>
                <div style={{ position: 'absolute', bottom: 55, left: 65, fontSize: 44, opacity: 0.4 }}>❌</div>
              </div>
            </div>
            <div style={{ marginTop: 26, backgroundColor: '#ef4444', padding: '10px 28px', borderRadius: 20, fontWeight: 900, fontSize: 26, letterSpacing: 1, boxShadow: '0 4px 15px rgba(239,68,68,0.4)' }}>
              PORSI TERGERUS -50%
            </div>
          </div>
        )}

        {currentScene.id === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 280, height: 150, backgroundColor: '#1e3a8a', borderRadius: 18, border: '4px solid #60a5fa', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontWeight: 900, fontSize: 36, opacity: cashOpacity, transform: `translateY(${cashFloatUp}px)`, boxShadow: '0 15px 35px rgba(30,58,138,0.5)' }}>
              <div>Rp 20.000</div>
              <div style={{ fontSize: 16, color: '#93c5fd', marginTop: 6 }}>NILAI MENURUN</div>
            </div>
            <div style={{ marginTop: 40, fontSize: 24, fontWeight: 800, color: '#f87171' }}>
              💨 Daya Beli Menguap
            </div>
          </div>
        )}

        {currentScene.callout && (
          <div style={{ position: 'absolute', top: 15, right: 20, backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '3px solid #38bdf8', borderRadius: 18, padding: '14px 26px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.6)', opacity: calloutOpacity, transform: `translateY(${calloutY}px)`, zIndex: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#94a3b8', letterSpacing: 1 }}>{currentScene.callout.label}</span>
            <span style={{ fontSize: 36, fontWeight: 900, color: currentScene.callout.type === 'arrow-up' ? '#ef4444' : '#22c55e', marginTop: 2 }}>{currentScene.callout.value}</span>
          </div>
        )}
      </div>

      <div style={{ minHeight: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px' }}>
        <div style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.3, textTransform: 'uppercase', maxWidth: 960, textShadow: '0 3px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, 0 6px 14px rgba(0,0,0,0.9)' }}>
          {currentScene.idText.split(' ').map((word, i) => {
            const cleanWord = word.toLowerCase().replace(/[^a-z0-9?]/g, '');
            const isMatch = currentScene.activeKeywords.some((kw) => {
              const cleanKw = kw.toLowerCase().replace(/[^a-z0-9?]/g, '');
              return cleanWord.includes(cleanKw) || cleanKw.includes(cleanWord);
            });
            return (
              <span key={i} style={{ color: isMatch ? '#22c55e' : '#ffffff', marginRight: 12, display: 'inline-block' }}>
                {word}
              </span>
            );
          })}
        </div>
        <div style={{ fontSize: 24, fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', marginTop: 16, fontStyle: 'italic', letterSpacing: 0.5 }}>
          {currentScene.enText}
        </div>
      </div>
    </div>
  );
};
