import React from 'react';
import { render, screen } from '@testing-library/react';
import { StoryListItem } from '@/features/stories/components/blocks';
import userEvent from '@testing-library/user-event';
import { Story } from '../../types';

const mockStory = {
  slug: 'sample-story',
  category_id: '1',
  title: 'Sample Story Title',
  body: 'This is a sample story body.',
  user: {
    name: 'John Doe',
    news_channel: {
      name: 'Sample News Channel',
    },
  },
  updated_at: new Date().toISOString(),
};

const mockCategories = {
  '1': 'Sample Category',
};

describe('StoryListItem', () => {
  it('should render the story details', () => {
    render(
      <StoryListItem story={mockStory as Story} categories={mockCategories} />,
    );

    expect(screen.getByText('Sample Category')).toBeInTheDocument();
    expect(screen.getByText('Sample Story Title')).toBeInTheDocument();
    expect(
      screen.getByText('This is a sample story body.'),
    ).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(
      screen.getByText('Reporter, Sample News Channel'),
    ).toBeInTheDocument();
  });

  it('should link to the correct story page', () => {
    render(
      <StoryListItem story={mockStory as Story} categories={mockCategories} />,
    );
    const linkElement = screen.getByRole('link', {
      name: /Sample Story Title/,
    });
    expect(linkElement).toHaveAttribute('href', '/stories/sample-story');
  });

  it('should display the story media carousel', () => {
    render(
      <StoryListItem story={mockStory as Story} categories={mockCategories} />,
    );
    expect(screen.getByText('1 Sample Story Title')).toBeInTheDocument();
    expect(screen.getByText('2 Sample Story Title')).toBeInTheDocument();
  });

  it('should display the story statistics', () => {
    render(
      <StoryListItem story={mockStory as Story} categories={mockCategories} />,
    );
    expect(screen.getByText(/1200 views/)).toBeInTheDocument();
    expect(screen.getByText(/6 comments/)).toBeInTheDocument();
  });

  it('should display the user details with formatted date', () => {
    render(
      <StoryListItem story={mockStory as Story} categories={mockCategories} />,
    );
    const formattedDate = new Intl.DateTimeFormat('en-US').format(
      new Date(mockStory.updated_at),
    );
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  // Add more tests as needed, for example, interactions with the context menu, etc.
});
