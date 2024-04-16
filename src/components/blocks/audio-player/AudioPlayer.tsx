// components/AudioPlayer.tsx

import React, { useRef, useEffect } from 'react';
// import WaveSurfer from 'wavesurfer.js';

interface AudioPlayerProps {
  src: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  // const wavesurferRef = useRef<WaveSurfer | null>(null);

  // useEffect(() => {
  //   if (!wavesurferRef.current) {
  //     wavesurferRef.current = WaveSurfer.create({
  //       container: '#waveform',
  //       waveColor: 'grey',
  //       progressColor: 'black',
  //       cursorColor: 'black',
  //       barWidth: 2,
  //       barRadius: 3,
  //       dragToSeek: true,
  //       // responsive: true,
  //     });
  //   }

  //   const wavesurfer = wavesurferRef.current;

  //   wavesurfer.load(src);

  //   return () => {
  //     wavesurfer.stop();
  //     wavesurfer.destroy();
  //   };
  // }, [src]);

  return (
    <div id="waveform" style={{ width: '100%', height: '100px' }}>
      {/* The waveform will be rendered here */}
    </div>
  );
};
