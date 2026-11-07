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

  // Konfigurasi 5 Babak (Total 1500 frame = 50 detik)
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

  // Animasi Pop Badge
  const badgeScale = spring({
    frame: sceneProgress,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 120 },
  });

  // Animasi Fade Subtitle
  const subtitleOpacity = spring({
    frame: sceneProgress,
    fps,
    config: { damping: 15, mass: 0.5 },
  });

  // Bab 2: Transformasi Warna Karet
  const rubberColorProgress = interpolate(frame, [260, 480], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Bab 3: Anyaman Kawat Baja Muncul Menyilang
  const steelWireProgress = interpolate(frame, [630, 850], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Bab 4: Tekanan Hidrolik Cetakan Tapak
  const moldPressY = interpolate(frame, [1040, 1150], [90, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Bab 5: Simulasi Tekanan Beban Mobil
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
      {/* 1. BGM MUSIK LATAR (Aset yang sudah ada) */}
      <Sequence from={0} durationInFrames={1500}>
        <Audio src={staticFile('bgm.mp3')} volume={0.12} />
      </Sequence>

      {/* 2. SFX PERGANTIAN BABAK */}
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

      {/* VO sengaja dimatikan sementara agar bisa tes render visual tanpa file vo1-vo5 */}

      {/* HUD & GRID BACKGROUND */}
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

      {/* HEADER: BADGE TAHAPAN & SUBTITLE */}
      <div
        style
