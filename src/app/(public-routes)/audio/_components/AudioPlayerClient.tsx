'use client';

import { AudioPlayer } from '@/components/blocks/audio-player';
import { useRef } from 'react';
import WavesurferPlayer, { useWavesurfer } from '@wavesurfer/react';

type AudioPlayerClientProps = {
  src: string;
};

export default function AudioPlayerClient({ src }: AudioPlayerClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { wavesurfer, isReady, isPlaying } = useWavesurfer({
    container: containerRef as React.MutableRefObject<HTMLDivElement>,
    url: src,
    waveColor: 'purple',
    height: 100,
  });

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <>
      <AudioPlayer src={src} />
      <div ref={containerRef} />
      <button onClick={onPlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
    </>
  );
}


// pages/audio.tsx
// import { AudioPlayer, AudioWaveform } from '@/components/blocks/audio-player';
// import { Button } from '@/components/button';
// import React, {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
//   useMemo,
// } from 'react';
// import WavesurferPlayer, { useWavesurfer } from '@wavesurfer/react';
// import AudioPlayerClient from './_components/AudioPlayerClient';
// const AudioPage = ({}) => {
//   // const src = "https://cdn.pixabay.com/audio/2024/01/14/audio_79bd546f34.mp3";
//   const src = 'https://cdn.pixabay.com/audio/2024/01/14/audio_79bd546f34.mp3';

//   //   const [wavesurfer, setWavesurfer] = useState(null)
//   //   const [isPlaying, setIsPlaying] = useState(false)

//   //   const onReady = (ws) => {
//   //     setWavesurfer(ws)
//   //     setIsPlaying(false)
//   //   }

//   //   const onPlayPause = () => {
//   //     wavesurfer && wavesurfer.playPause()
//   //   }

//   const containerRef = useRef<HTMLDivElement>();

//   const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
//     container: containerRef as React.MutableRefObject<HTMLDivElement>,
//     // url: '/my-server/audio.ogg',
//     url: src,
//     waveColor: 'purple',
//     height: 100,
//   });

//   const onPlayPause = () => {
//     wavesurfer && wavesurfer.playPause();
//   };
//   return (
//     <div>
//       <AudioPlayer src={src} />

//       <>
//       <AudioPlayerClient src={src} />
//       </>
//       {/* <>
//       <WavesurferPlayer
//         height={100}
//         waveColor="violet"
//         // url="/my-server/audio.wav"
//         url={src}
//         onReady={onReady}
//         onPlay={() => setIsPlaying(true)}
//         onPause={() => setIsPlaying(false)}
//         barWidth={4}
//       />

//       <button onClick={onPlayPause}>
//         {isPlaying ? 'Pause' : 'Play'}
//       </button>
//     </> */}
//     </div>
//   );
// };

// // export async function getServerSideProps(context) {
// //     // Fetch waveform data from your Django backend
// //     const res = await fetch(`your-django-backend-url/api/waveform?src=${encodeURIComponent(src)}`);
// //     const waveform = await res.json();

// //     return { props: { waveform } };
// // }

// export default AudioPage;
