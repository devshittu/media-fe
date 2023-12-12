jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    apiUrl: 'http://web-app:8000/api', // Replace with the actual URL or environment variable
  },
  publicRuntimeConfig: {
    apiUrl: 'https://api.mediaapp.local/api', // Replace with the actual URL or environment variable
  },
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StorylineItem } from './storyline-item';

describe('StorylineItem', () => {
  const mockStoryline = {
    id: '1',
    description: 'This is a test description',
    summary: 'Test Summary',
    subject: 'Test Subject',
    hashtags: ['hashtag1', 'hashtag2'],
    stories_count: 5,
  };

  it('renders the storyline summary, description, and subject', () => {
    render(<StorylineItem storyline={mockStoryline} />);

    expect(screen.getByText(mockStoryline.summary)).toBeInTheDocument();
    expect(screen.getByText(mockStoryline.description)).toBeInTheDocument();
    expect(screen.getByText(mockStoryline.subject)).toBeInTheDocument();
  });

  //   it('renders the transformed hashtags', () => {
  //     render(<StorylineItem storyline={mockStoryline} />);
  //     mockStoryline.hashtags.forEach(hashtag => {
  //       expect(screen.getByText(hashtag)).toBeInTheDocument();
  //     });
  //   });
  it('renders the transformed hashtags', () => {
    render(<StorylineItem storyline={mockStoryline} />);
    mockStoryline.hashtags.forEach((hashtag) => {
      // Use a custom text matcher to check if the text contains the hashtag
      expect(
        screen.getByText((text) => text.includes(hashtag)),
      ).toBeInTheDocument();
    });
  });

  // If you have any click events or other interactions, test them here

  // Add more tests as needed to cover all aspects of your component
});

// Path: src/features/storylines/components/blocks/storyline-item.test.tsx
