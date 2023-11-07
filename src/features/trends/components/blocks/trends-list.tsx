import React from 'react';
import { TrendingList } from './trends';

export const TrendsList = () => {
  const sampleTrends = [
    {
      rank: 1,
      category: 'Tech',
      title: '#Microsoft363',
      subtitle: '5,466 stories',
      onArrowClick: () => console.log('Clicked arrow for #Microsoft363'),
    },
    {
      rank: 2,
      category: 'Politics',
      title: '#HI-Fashion',
      subtitle: '8,464 stories',
      onArrowClick: () => console.log('Clicked arrow for #HI-Fashion'),
    },
    {
      rank: 3,
      category: 'Rock',
      title: '#Ferrari',
      subtitle: '5,586 Concepts',
      onArrowClick: () => console.log('Clicked arrow for #Ferrari'),
    },
  ];

  return (
    <TrendingList
      trends={sampleTrends}
      onShowMore={() => console.log('Show more clicked!')}
    />
  );
};
