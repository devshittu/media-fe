import { City } from '@/features/trends/types';
const random_id: number = 1;
const image_height: number = 600;
const image_width: number = 600;
const category_title: string = 'places';

const mockCities: City[] = [
  {
    name: 'City Name 1',
    location: 'Indiana',
    image_url: `https://source.unsplash.com/random/${image_width}x${image_height}?${category_title}&sig=${random_id}`,
    price_per_week: 120,
    rating: 4.5,
  },
  // ... Add more channels here
];

// Add more mock data to reach 15 channels
for (let i = 2; i <= 15; i++) {
  mockCities.push({
    name: `City Name ${i}`,
    location: 'News Cities',
    image_url: `https://source.unsplash.com/random/${image_width}x${image_height}?${category_title}&sig=${i}`,
    price_per_week: Math.floor(Math.random() * 200) + 50,
    rating: Math.random() * (5 - 3.5) + 3.5,
  });
}

export default mockCities;
