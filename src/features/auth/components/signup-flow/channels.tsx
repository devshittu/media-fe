import Image from 'next/image';
import React from 'react';

// Step5.tsx
export const Channels: React.FC = () => {
  return (
    <div>
      Step 5: Set favorite channels to follow (skippable)
      <ul className="max-w-sm divide-y divide-gray-200 dark:divide-gray-700">
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Image
                width="48"
                height="48"
                className="rounded-md w-14 h-14"
                alt="Avatar image"
                loading="lazy"
                src={`https://xsgames.co/randomusers/avatar.php?g=male`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                Neil Sims
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@example.com
              </p>
            </div>
            <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
              <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
              Available
            </span>
          </div>
        </li>
        <li className="py-3 sm:py-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Image
                width="48"
                height="48"
                className="rounded-md w-14 h-14"
                alt="Avatar image"
                loading="lazy"
                src={`https://xsgames.co/randomusers/avatar.php?g=female`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                Bonnie Green
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@example.com
              </p>
            </div>
            <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
              <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
              Unavailable
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};
