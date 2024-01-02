import { Button } from '@/components/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/illustrations';
import React from 'react';
import { DiscoverSection } from './discover-section';
import { GridItemData } from '@/components/labs/display/types';
import GridDisplay from '@/components/labs/display/grid-display';
import { randomUUID } from 'crypto';
import { DiscoverSectionGrid } from './discover-section-grid';
import { UserListItem } from '@/features/users/components';
import { User } from '@/features/auth';
import { ChannelList } from '@/features/channels/components/blocks/channel-list';
import mockChannels from '@/features/channels/mocks/data';
import { ChannelListItem } from '@/features/channels/components/blocks/channel-list-item';
import { Channel } from '@/features/channels/types';
import mockCities from '../city/mocks/data';
import { City } from '../../types';
import { CityListItem } from '../city/city-list-item';
import { IS_DEBUG_MODE } from '@/config/constants';
const randomUsers: User[] = [
  {
    id: 1,
    display_name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    username: 'alicej',
    avatar_url: null,
    display_picture: null,
    bio: 'Loves hiking and outdoor activities.',
    phone_number: '555-0101',
    last_activity: '2023-03-01T12:00:00Z',
    roles: ['editor'],
    is_active: true,
    is_staff: false,
    has_completed_setup: true,
  },
  {
    id: 2,
    display_name: 'Bob Smith',
    email: 'bob.smith@example.com',
    username: 'bobby',
    avatar_url: null,
    display_picture: null,
    bio: 'Avid reader and writer.',
    phone_number: '555-0202',
    last_activity: '2023-03-02T15:30:00Z',
    roles: ['contributor'],
    is_active: true,
    is_staff: false,
    has_completed_setup: false,
  },
  {
    id: 3,
    display_name: 'Carol White',
    email: 'carol.white@example.com',
    username: 'carolw',
    avatar_url: null,
    display_picture: null,
    bio: 'Passionate about photography and art.',
    phone_number: '555-0303',
    last_activity: '2023-03-03T09:45:00Z',
    roles: ['admin'],
    is_active: true,
    is_staff: true,
    has_completed_setup: true,
  },
  {
    id: 4,
    display_name: 'David Brown',
    email: 'david.brown@example.com',
    username: 'daveb',
    avatar_url: null,
    display_picture: null,
    bio: 'Tech enthusiast and gadget lover.',
    phone_number: '555-0404',
    last_activity: '2023-03-04T17:20:00Z',
    roles: ['user'],
    is_active: true,
    is_staff: false,
    has_completed_setup: true,
  },
  {
    id: 5,
    display_name: 'Eve Green',
    email: 'eve.green@example.com',
    username: 'eveg',
    avatar_url: null,
    display_picture: null,
    bio: 'Enjoys cooking and experimenting with new recipes.',
    phone_number: '555-0505',
    last_activity: '2023-03-05T08:10:00Z',
    roles: ['moderator'],
    is_active: true,
    is_staff: true,
    has_completed_setup: false,
  },
];

export const Discover = () => {
  const handlePrevious = () => {
    console.log('handlePrevious');
  };
  const recentStoriesSectionActions = [
    {
      id: 'scrollLeft',
      label: 'Previous',
      onClick: handlePrevious,
      icon: <ChevronLeftIcon />,
    },
    {
      id: 'scrollRight',
      label: 'Next',
      onClick: handlePrevious,
      icon: <ChevronRightIcon />,
    },
  ];

  const image_width = 600;
  const image_height = 320;

  const exampleGridItems: GridItemData[] = [
    {
      media_url: `https://source.unsplash.com/random/${image_width}x${image_height}?sig=${randomUUID}`,
      caption: '1. Serene Beach Sunset',
      location: {
        region: 'Bali',
        label: 'Indonesia',
      },
      price: 200,
      reservationDate: '2022-08-01',
    },
  ];

  return (
    <>
      <DiscoverSectionGrid
        title="Newly Added Channels"
        gridProps={{
          items: mockChannels,
          numColumns: 10,
          numRows: 2,
          itemWidth: 'more-than-2/3',
          renderItem: (channel: Channel, index: number) => (
            <ChannelListItem key={index} channel={channel} />
          ),
        }}
        actions={[
          {
            label: 'Scroll Left',
            onClick: () => {},
            icon: <ChevronLeftIcon />,
            id: 'scrollLeft',
          },
          {
            label: 'Scroll Right',
            onClick: () => {},
            icon: <ChevronRightIcon />,
            id: 'scrollRight',
          },
          // ... other actions ...
        ]}
      />

      {IS_DEBUG_MODE && (
        <>
          <DiscoverSectionGrid
            title="Readers Around You"
            gridProps={{
              items: randomUsers,
              numColumns: 5,
              numRows: 1,
              itemWidth: 'more-than-2/3',
              renderItem: (user: User, index: number) => (
                <UserListItem key={index} user={user} />
              ),
            }}
            actions={[
              {
                label: 'Scroll Left',
                onClick: () => {},
                icon: <ChevronLeftIcon />,
                id: 'scrollLeft',
              },
              {
                label: 'Scroll Right',
                onClick: () => {},
                icon: <ChevronRightIcon />,
                id: 'scrollRight',
              },
              // ... other actions ...
            ]}
          />

          <DiscoverSectionGrid
            title="Explore by Locations"
            gridProps={{
              items: mockCities,
              numColumns: 6,
              numRows: 2,
              itemWidth: 'more-than-2/3',
              renderItem: (city: City, index: number) => (
                <CityListItem key={index} city={city} />
              ),
            }}
            actions={[
              {
                label: 'Scroll Left',
                onClick: () => {},
                icon: <ChevronLeftIcon />,
                id: 'scrollLeft',
              },
              {
                label: 'Scroll Right',
                onClick: () => {},
                icon: <ChevronRightIcon />,
                id: 'scrollRight',
              },
              // ... other actions ...
            ]}
          />
        </>
      )}

      <DiscoverSection
        title="Popular Stories"
        // actions={recentStoriesSectionActions}
      >
        <></>
      </DiscoverSection>
    </>
  );
};
