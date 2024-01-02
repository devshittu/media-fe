import { Channel } from '../types';

const mockChannels: Channel[] = [
  {
    name: 'DW News',
    profession: 'News Channel',
    avatar_url: 'https://source.unsplash.com/random/1',
    stories_count: 120,
    rating: 4.5,
    total_reads: 5000,
  },
  {
    name: 'BBC News',
    profession: 'News Channel',
    avatar_url: 'https://source.unsplash.com/random/2',
    stories_count: 200,
    rating: 4.7,
    total_reads: 8000,
  },
  {
    name: 'CNN',
    profession: 'News Channel',
    avatar_url: 'https://source.unsplash.com/random/3',
    stories_count: 180,
    rating: 4.6,
    total_reads: 7500,
  },
  // ... Add more channels here
];

// Add more mock data to reach 15 channels
for (let i = 4; i <= 15; i++) {
  mockChannels.push({
    name: `News Channel ${i}`,
    profession: 'News Channel',
    avatar_url: `https://source.unsplash.com/random/${i}`,
    stories_count: Math.floor(Math.random() * 200) + 50,
    rating: Math.random() * (5 - 3.5) + 3.5,
    total_reads: Math.floor(Math.random() * 10000) + 1000,
  });
}

export default mockChannels;
