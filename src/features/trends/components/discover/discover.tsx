import { Button } from '@/components/button';
import {
  BookmarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FilmIcon,
  Icon,
  MapIcon,
  MapPinIcon,
  StarIcon,
} from '@/components/illustrations';
import React from 'react';
import { DiscoverSection } from './discover-section';
import { Image } from '@/components/labs';

export const Discover = () => {
  const handlePrevious = () => {
    console.log('handlePrevious');
  };
  const recentStoriesSectionActions = [
    {
      id: 'previous',
      label: 'Previous',
      onClick: handlePrevious,
      icon: <ChevronLeftIcon />,
    },
    {
      id: 'next',
      label: 'Next',
      onClick: handlePrevious,
      icon: <ChevronRightIcon />,
    },
  ];
  return (
    <>
      <DiscoverSection
        title="Recent Stories"
        actions={recentStoriesSectionActions}
      >
        <div className="mb-6 sm:w-1/2 rounded-lg bg-black dark:bg-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                width={`32`}
                height={`32`}
                className="mr-2 h-10 w-10 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="profile"
              />
              <div>
                <h3 className="text-base font-semibold text-gray-100 dark:text-gray-900">
                  Kotler Philips
                </h3>
                <span className="block text-xs font-normal  text-gray-400 dark:text-gray-500">
                  Web Developer
                </span>
              </div>
            </div>
            <p className="text-sm font-medium text-cyan-500">
              <span className="mr-0.5">+</span>Follow
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm font-semibold text-gray-900">
            <div className="flex">
              <FilmIcon className="mr-2 h-5 w-5 text-base text-gray-500" />
              <span className="mr-1">40</span> Task
            </div>
            <div className="flex items-center">
              <StarIcon className="mr-1 h-4 w-4 text-yellow-500" />
              4,7 (750 Reviews)
            </div>
          </div>
        </div>
      </DiscoverSection>

      <DiscoverSection
        title="Explore the world"
        actions={recentStoriesSectionActions}
      >
        <div className="grid mt-5 grid-cols-2  space-x-4 overflow-y-scroll flex justify-center items-center w-full ">
          <div
            className="relative flex flex-col justify-between   bg-whitex  bg-cover text-gray-800  overflow-hidden cursor-pointer w-full object-cover object-center rounded shadow-md h-64 my-2"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/reserve/8T8J12VQxyqCiQFGa2ct_bahamas-atlantis.jpg?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1050&amp;q=80')",
            }}
          >
            <div className="absolute bg-gradient-to-t from-green-400 to-blue-400  opacity-50 inset-0 z-0"></div>
            <div className="relative flex flex-row items-end  h-72 w-full ">
              <div className="absolute right-0 top-0 m-2">
                <BookmarkIcon className="h-9 w-9 p-2 text-gray-200 hover:text-blue-400 rounded-full hover:bg-white transition ease-in duration-200 " />
              </div>
              <div className="p-6 rounded-lg  flex flex-col w-full z-10 ">
                <h4 className="mt-1 text-white text-xl font-semibold  leading-tight truncate">
                  Loremipsum..
                </h4>
                <div className="flex justify-between items-center ">
                  <div className="flex flex-col">
                    <h2 className="text-sm flex items-center text-gray-300 font-normal">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      Dubai
                    </h2>
                  </div>
                </div>
                <div className="flex pt-4  text-sm text-gray-300">
                  <div className="flex items-center mr-auto">
                    <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />

                    <p className="font-normal">4.5</p>
                  </div>
                  <div className="flex items-center font-medium text-white ">
                    $1800
                    <span className="text-gray-300 text-sm font-normal">
                      {' '}
                      /wk
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="relative flex flex-col justify-between   bg-whitex  bg-cover text-gray-800  overflow-hidden cursor-pointer w-full object-cover object-center rounded shadow-md h-64 my-2"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80')",
            }}
          >
            <div className="absolute bg-gradient-to-t from-green-400 to-blue-400  opacity-50 inset-0 z-0"></div>
            <div className="relative flex flex-row items-end  h-72 w-full ">
              <div className="absolute right-0 top-0 m-2">
                <BookmarkIcon className="h-9 w-9 p-2 text-gray-200 hover:text-blue-400 rounded-full hover:bg-white transition ease-in duration-200 " />
              </div>
              <div className="p-6 rounded-lg  flex flex-col w-full z-10 ">
                <h4 className="mt-1 text-white text-xl font-semibold  leading-tight truncate">
                  Loremipsum..
                </h4>
                <div className="flex justify-between items-center ">
                  <div className="flex flex-col">
                    <h2 className="text-sm flex items-center text-gray-300 font-normal">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      Dubai
                    </h2>
                  </div>
                </div>
                <div className="flex pt-4  text-sm text-gray-300">
                  <div className="flex items-center mr-auto">
                    <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />

                    <p className="font-normal">4.5</p>
                  </div>
                  <div className="flex items-center font-medium text-white ">
                    $1800
                    <span className="text-gray-300 text-sm font-normal">
                      {' '}
                      /wk
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DiscoverSection>
    </>
  );
};
