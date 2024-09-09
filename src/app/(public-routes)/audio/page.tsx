import { Metadata } from 'next';
import AudioPlayerClient from './_components/AudioPlayerClient';

export const metadata: Metadata = {
  title: 'Audio test',
  description: 'Learn more about our company and our values.',
};

const AudioPage = ({}) => {
  const src = 'https://cdn.pixabay.com/audio/2024/01/14/audio_79bd546f34.mp3';
  return (
    <div>
      <>
        <AudioPlayerClient src={src} />
      </>
    </div>
  );
};

// export async function getServerSideProps(context) {
//     // Fetch waveform data from your Django backend
//     const res = await fetch(`your-django-backend-url/api/waveform?src=${encodeURIComponent(src)}`);
//     const waveform = await res.json();

//     return { props: { waveform } };
// }

export default AudioPage;
