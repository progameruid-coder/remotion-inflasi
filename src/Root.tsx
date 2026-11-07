import React from 'react';
import { Composition } from 'remotion';
import { KineticStyle } from './KineticStyle';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InflasiEdu"
        component={KineticStyle}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
