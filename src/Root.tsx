import React from 'react';
import { Composition } from 'remotion';
import { ExplainerStyle } from './ExplainerStyle';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InflasiEdu"
        component={ExplainerStyle}
        durationInFrames={1500}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
