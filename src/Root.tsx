import React from 'react';
import { Composition } from 'remotion';
import { InflationScene } from './InflationScene';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="InflasiEdu"
      component={InflationScene}
      durationInFrames={1800} // 60 Detik pada 30 FPS
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
