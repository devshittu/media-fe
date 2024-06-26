// // components/AudioPlayer.tsx
// import React from 'react';
// import { useAudio } from './hooks/useAudio';
// import { ProgressBar } from './ProgressBar';

// type AudioPlayerProps = {
//     src: string;
// };

// export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
//     const { playing, togglePlayPause, progress } = useAudio(src);

//     return (
//         <div className="flex items-start gap-2.5">
//             {/* Other UI elements */}
//             <button
//                 onClick={togglePlayPause}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//                 {playing ? 'Pause' : 'Play'}
//             </button>
//             <ProgressBar progress={progress} />
//         </div>
//     );
// };
// components/AudioPlayer.tsx
import React from 'react';
import { useAudio } from './hooks/useAudio';
import { AudioWaveProgressBar } from './AudioWaveProgressBar';
import { ProgressBar } from './ProgressBar';
import { Image } from '@/components/labs';
import { Icon, PauseIcon, PlayIcon } from '@/components/illustrations';
import { Button } from '@/components/button';

type AudioPlayerProps = {
  src: string;
};

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const { playing, togglePlayPause, progress } = useAudio(src);

  return (
    <>
      <div className="flex items-start gap-2.5">
        {/* Other UI elements */}
        <button
          onClick={togglePlayPause}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <AudioWaveProgressBar progress={progress} />
        <ProgressBar progress={progress} />

        <div className="flex items-start gap-2.5">
          <Image
            width="600"
            height="600"
            className="w-8 h-8 rounded-full"
            src={`https://dummyimage.com/320x320`}
            alt="Jese image"
            loading="lazy"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                11:46
              </span>
            </div>
            <div className="flex flex-col w-full max-w-[320px] leading-1.5 py-2 rounded-e-xl rounded-es-xl">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button
                  id="media_play_pause"
                  onClick={togglePlayPause}
                  className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  <Icon
                    icon={playing ? <PauseIcon /> : <PlayIcon />}
                    strokeWidth={3}
                    className={`w-6 h-6 text-gray-800 dark:text-white`}
                  />
                </Button>
                <svg
                  className="w-[145px] md:w-[185px] md:h-[40px]"
                  aria-hidden="true"
                  viewBox="0 0 185 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="17"
                    width="3"
                    height="6"
                    rx="1.5"
                    fill="#6B7280"
                    className="dark:fill-white"
                  />
                  <rect
                    x="7"
                    y="15.5"
                    width="3"
                    height="9"
                    rx="1.5"
                    fill="#6B7280"
                    className="dark:fill-white"
                  />
                  <rect
                    x="21"
                    y="6.5"
                    width="3"
                    height="27"
                    rx="1.5"
                    fill="#6B7280"
                    className="dark:fill-white"
                  />
                  <rect
                    x="14"
                    y="6.5"
                    width="3"
                    height="27"
                    rx="1.5"
                    fill="#6B7280"
                    className="dark:fill-white"
                  />
                  <rect
                    x="28"
                    y="3"
                    width="3"
                    height="34"
                    rx="1.5"
                    fill="#6B7280"
                    className="dark:fill-white"
                  />
                  <rect
                    x="35"
                    y="3"
                    width="3"
                    height="34"
                    rx="1.5"
                    fill="#6B7280"
                    className="dark:fill-white"
                  />
                  <rect
                    x="42"
                    y="5.5"
                    width="3"
                    height="29"
                    rx="1.5"
                    fill="#6B7280"
                    className="dark:fill-white"
                  />
                  <rect
                    x="49"
                    y="10"
                    width="3"
                    height="20"
                    rx="1.5"
                    fill="#6B7280"
                    className="dark:fill-white"
                  />
                  <rect
                    x="56"
                    y="13.5"
                    width="3"
                    height="13"
                    rx="1.5"
                    fill="#6B7280"
                    className="dark:fill-white"
                  />
                  <rect
                    x="63"
                    y="16"
                    width="3"
                    height="8"
                    rx="1.5"
                    fill="#6B7280"
                    className="dark:fill-white"
                  />
                  <rect
                    x="70"
                    y="12.5"
                    width="3"
                    height="15"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="77"
                    y="3"
                    width="3"
                    height="34"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="84"
                    y="3"
                    width="3"
                    height="34"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="91"
                    y="0.5"
                    width="3"
                    height="39"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="98"
                    y="0.5"
                    width="3"
                    height="39"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="105"
                    y="2"
                    width="3"
                    height="36"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="112"
                    y="6.5"
                    width="3"
                    height="27"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="119"
                    y="9"
                    width="3"
                    height="22"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="126"
                    y="11.5"
                    width="3"
                    height="17"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="133"
                    y="2"
                    width="3"
                    height="36"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="140"
                    y="2"
                    width="3"
                    height="36"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="147"
                    y="7"
                    width="3"
                    height="26"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="154"
                    y="9"
                    width="3"
                    height="22"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="161"
                    y="9"
                    width="3"
                    height="22"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="168"
                    y="13.5"
                    width="3"
                    height="13"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="175"
                    y="16"
                    width="3"
                    height="8"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="182"
                    y="17.5"
                    width="3"
                    height="5"
                    rx="1.5"
                    fill="#E5E7EB"
                    className="dark:fill-gray-500"
                  />
                  <rect
                    x="66"
                    y="16"
                    width="8"
                    height="8"
                    rx="4"
                    fill="#1C64F2"
                  />
                </svg>
                <span className="inline-flex self-center items-center p-2 text-sm font-medium text-gray-900 dark:text-white">
                  3:42
                </span>
              </div>
            </div>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Delivered
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
