import React, { useEffect, useState } from 'react';
import { HashtagListItem } from './list-item';
import { HashtagItem, HashtagListProps } from './types';

const generateRandomHashtagItems = (): HashtagItem[] => {
  const hashtagItems: HashtagItem[] = [];

  for (let i = 0; i < 20; i++) {
    const hashtagId = Math.random().toString(36).substr(2, 9);
    const nameLength = Math.floor(Math.random() * 18) + 3; // Random length between 3 and 20
    const name = Math.random().toString(36).substr(2, nameLength);
    const hashtagItem: HashtagItem = {
      hashtagId,
      name,
    };

    hashtagItems.push(hashtagItem);
  }

  return hashtagItems;
};

export const HashtagList = ({ data = [] }: HashtagListProps) => {
  const [hashtagData, setHashtagData] = useState<HashtagItem[]>([]);

  useEffect(() => {
    if (data?.length === 0) {
      setHashtagData(generateRandomHashtagItems());
    }
  }, [data]);

  // Generate random hashtag items if data is empty
  if (data.length === 0) {
    data = hashtagData;
  }

  return (
    <>
      <div className="flex gap-4 flex-wrap">
        {data.map((hashtag: HashtagItem) => (
          <HashtagListItem key={hashtag.hashtagId} hashtag={hashtag} />
        ))}
      </div>
    </>
  );
};
