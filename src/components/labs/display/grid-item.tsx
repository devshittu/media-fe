// GridItem.tsx
import React from 'react';
// import Image from 'next/image';
import { GridItemData } from './types';
import { Image } from '../image';

interface GridItemProps {
  data: GridItemData;
}

export const GridItem: React.FC<GridItemProps> = ({ data }) => {
  return (
    <div className="group col-span-1 cursor-pointer">
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square aspect-autox w-full overflow-hidden rounded-xl">
          <Image
            width={600}
            height={64}
            src={data.media_url}
            alt={data.caption}
            // layout="fill"
            // objectFit="cover"
            className="transition group-hover:scale-110 h-16 w-full"
          />
          {/* Replace HeartButton with your actual button component */}
          <div className="absolute right-3 top-3">
            <button>HeartButton</button>
          </div>
        </div>
        <div className="text-lg font-semibold text-white">
          {data.caption || data.reservationDate}
        </div>
        <div className="font-light text-neutral-500">
          {data.location.region}, {data.location.label}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">Rp. {data.price}</div>
        </div>
      </div>
    </div>
  );
};
// Path: src/components/labs/display/grid-item.tsx
