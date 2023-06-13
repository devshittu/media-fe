/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NavDrawerBottom } from '../nav/nav-drawer-bottom';
import { Modal } from '@/components/blocks/modal';
import { StoryListItemProps } from './types';
import {
  Carousel,
  CarouselItem,
  CarouselOptions,
} from '@/components/blocks/carousel';
import { HomeIcon, Icon, TwitterIcon } from '../icons';
import CarouselModule from '../carousel/carousel';

export const StoryListItem = ({ story, className }: StoryListItemProps) => {
  const carouselItems: CarouselItem[] = [
    {
      id: '1',
      media:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=20',
      caption: '1 ' + story?.title,
    },
    {
      id: '2',
      media:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1399&q=20',
      caption: '2 ' + story?.title,
    },
  ];

  const carouselOptions: CarouselOptions = {
    // autoplay: true,
    // autoplaySpeed: 3000,
    onNext: () => {
      console.log('Next slide');
    },
    onPrev: () => {
      console.log('Previous slide');
    },
    // onSlide: () => {
    //   console.log('Slide changed');
    // },
    // onChange: () => {
    //   console.log('Active slide changed');
    // },
  };
  // const carousel = CarouselComponent({ carouselItems, carouselOptions });
  // carousel.next(); // Invoke next slide
  // carousel.prev(); // Invoke previous slide

  return (
    <article
      className={`p-4 md:p-8 lg:p-12 flex flex-col items-start  border-b-2 border-slate-100 dark:border-slate-800 ${className}`}
    >
      <div className={`flex align-middle items-center justify-between w-full`}>
        <div className="inline-block py-1 px-2 rounded bg-blue-50 text-blue-500 text-xs font-medium tracking-widest">
          {`CATEGORY`}
        </div>

        <Modal id="modal-1" title="Share">
          <div className="p-6 space-y-6 ">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
        </Modal>
        <NavDrawerBottom title="Share" id="share">
          <div className="p-6">
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Connect with one of our available wallet providers or create a new
              one.
            </p>
            <ul className="my-4 space-y-3">
              <li>
                <Link
                  href="#"
                  className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  <Icon icon={<TwitterIcon />} />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Whatsapp
                  </span>
                  <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
                    New
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  <Icon icon={<TwitterIcon />} />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Coinbase Wallet
                  </span>
                </Link>
              </li>
            </ul>
            <div>
              <Link
                href="#"
                className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
              >
                <svg
                  aria-hidden="true"
                  className="w-3 h-3 mr-2"
                  focusable="false"
                  data-prefix="far"
                  data-icon="question-circle"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"
                  ></path>
                </svg>
                Why do I need to connect with my wallet?
              </Link>
            </div>
          </div>
        </NavDrawerBottom>
      </div>

      <Link href={`/stories/${story?.id}`}>
        <h2 className="sm:text-3xl text-2xl title-font mt-4 mb-4  font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
          {`${story?.id}. ${story?.title}`}
        </h2>
      </Link>
      <p className="leading-relaxed mb-8 text-justify text-lgx lg:text-xlx">
        {`${story?.body}`}
      </p>

      <CarouselModule.Carousel
        items={carouselItems}
        options={carouselOptions}
      />
      {/* <Carousel items={carouselItems} /> */}
      <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-slate-100 dark:border-slate-800 mt-auto w-full">
        <Link href="/" className="text-blue-500 inline-flex items-center">
          Learn More
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>
        <span className="text-slate-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2  border-slate-200 dark:border-slate-700">
          <svg
            className="w-4 h-4 mr-1"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          1.2K
        </span>
        <span className="text-slate-400 inline-flex items-center leading-none text-sm">
          <svg
            className="w-4 h-4 mr-1"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
          </svg>
          6
        </span>
      </div>
      <Link href="/" className="inline-flex items-center">
        <Image
          width="104"
          height="104"
          alt="blog"
          src="https://dummyimage.com/104x104"
          className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
        />
        <span className="flex-grow flex flex-col pl-4">
          <span className="title-font font-medium text-slate-900 dark:text-slate-100">
            Holden Caulfield
          </span>
          <span className="text-slate-400 text-xs tracking-widest mt-0.5">
            UI DEVELOPER
          </span>
        </span>
      </Link>
    </article>
  );
};
