/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { Link } from '@/components/labs/typography';
import Image from 'next/image';
import { Modal } from '@/components/blocks/modal';
import { StoryListItemProps } from './types';
import { CarouselItem, CarouselOptions } from '@/components/blocks/carousel';
import {
  ExternalLinkIcon,
  EyeIcon,
  FlagIcon,
  HelpCircleIcon,
  Icon,
  MessageSquareIcon,
  MoreHorizontalIcon,
  ShareIcon,
  TwitterIcon,
} from '@/components/illustrations';
import CarouselModule from '../carousel/carousel';
import { Toast } from '../toast';
import { Button } from '@/components/button';
import {
  TwitterColoredIcon,
  WhatsappColoredIcon,
} from '@/components/illustrations/icons/social';
import Drawer from '../nav/drawer';
import { DrawerSide } from '../nav';
import Dropdown from './dropdown';

export const StoryListItemContextMenu = ({ story }: StoryListItemProps) => {
  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('openModal');

    const modal = new Modal({
      title: 'Report Item Selected',
      id: 'first-modal',
      size: 'small',
      children: (
        <div>
          Hello <Button>Show Toast</Button>
        </div>
      ),
    });
    modal.open();
  };

  return (
    <div className="p-6">
      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Connect and share with the people on your favorite social media
        platforms.
      </p>
      <ul className="my-4 space-y-3">
        <li>
          <Link
            className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            href={`whatsapp://send?text=Open this \n ${story.title} \n on WhatsApp`}
            data-action="share/whatsapp/share"
            target="_blank"
          >
            <Icon icon={<WhatsappColoredIcon />} className="w-6" />
            <span className="flex-1 ml-3 whitespace-nowrap">Whatsapp</span>
            <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
              New
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="https://twitter.com/intent/tweet"
            className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            data-action="share/twitter/share"
            target="_blank"
          >
            <Icon icon={<TwitterColoredIcon />} className="w-6" />
            <span className="flex-1 ml-3 whitespace-nowrap">Twitter</span>
          </Link>
        </li>
        <li>
          <Link
            href="#"
            onClick={openModal}
            className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            data-action="Report"
            target="_blank"
          >
            <Icon icon={<FlagIcon />} className="w-6" />
            <span className="flex-1 ml-3 whitespace-nowrap">Report</span>
          </Link>
        </li>
      </ul>
      <div>
        <Link
          href="#"
          className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
        >
          <HelpCircleIcon className="w-3 mr-2" strokeWidth={2.5} />
          Why do I need to share?
        </Link>
      </div>
    </div>
  );
};

export const StoryListItem = ({ story, className }: StoryListItemProps) => {
  const carouselItems: CarouselItem[] = [
    {
      id: '1',
      media:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=470&amp;q=10',
      caption: '1 ' + story?.title,
    },
    {
      id: '2',
      media:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=399&q=10',
      caption: '2 ' + story?.title,
    },
  ];

  //   const carouselItems: CarouselItem[] = [
  //   {
  //     id: '1',
  //     media:
  //       'https://source.unsplash.com/random/540x230?Cryptocurrency&sig=1',
  //     caption: '1 ' + story?.title,
  //   },
  //   {
  //     id: '2',
  //     media:
  //       'https://source.unsplash.com/random/540x230?Cryptocurrency&sig=2',
  //     caption: '2 ' + story?.title,
  //   },
  // ];

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

  const openContextMenu = () => {
    const drawer = new Drawer({
      title: 'Share!',
      titleIcon: <ShareIcon />,
      id: 'story-list-item-share',
      side: DrawerSide.BOTTOM,
      children: <StoryListItemContextMenu story={story} />,
      // type: 'success',
      onClose: () => {
        // Handle close event
        // console.log('Drawer closed');
      },
    });

    drawer.open();
  };

  const openDrawer = () => {
    const drawer = new Drawer({
      title: 'Hello, world!',
      titleIcon: <ShareIcon />,
      id: 'first-drawer',
      side: DrawerSide.TOP,
      children: (
        <div>
          Hello <Button onClick={ShowToast}>Show Toast</Button>
        </div>
      ),
      // type: 'success',
      onClose: () => {
        // Handle close event
      },
    });

    drawer.open();
  };

  const openModal = () => {
    const modal = new Modal({
      title: 'Hello, world!',
      id: 'first-modal',
      size: 'full',
      children: (
        <div>
          Hello <Button onClick={ShowToast}>Show Toast</Button>
        </div>
      ),
    });

    modal.open();
  };

  const ShowToast = () => {
    const notify = new Toast({
      message: 'Hello, world!',
      position: 'bottom-center',
      type: 'success',
      onClose: () => {
        // Handle close event
        console.log('toast closed');
      },
      duration: 3000,
    });

    notify.open();
  };

  return (
    <article
      className={`p-4 md:p-8 lg:p-12 flex flex-col items-start  border-b-2 border-slate-100 dark:border-slate-800 ${className}`}
    >
      <div className={`flex align-middle items-center justify-between w-full`}>
        <div className="inline-block py-1 px-2 rounded bg-blue-50 text-blue-500 text-xs font-medium tracking-widest">
          {`CATEGORY`}
        </div>

      <Dropdown
        trigger={<button>Toggle Dropdown</button>}
        content={<div>This is the dropdown content</div>}
      />

        <button
          className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={openModal}
        >
          Modal
        </button>
        <button
          className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={openDrawer}
        >
          Drawer
        </button>

        {/* Context Menu Trigger */}

        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            return openContextMenu();
          }}
        >
          <Icon icon={<MoreHorizontalIcon />} className="w-6" />
        </Link>
      </div>

      <Link href={`/stories/${story?.slug}`}>
        <h2
          id={story?.slug}
          className="story-header sm:text-3xl text-2xl title-font mt-4 mb-4  font-extrabold text-slate-900 tracking-tight dark:text-slate-200"
        >
          {`${story?.id}. ${story?.title}`}
        </h2>
      </Link>
      <p className="leading-relaxed mb-8 text-justify">{`${story?.body}`}</p>

      <CarouselModule.Carousel
        items={carouselItems}
        options={carouselOptions}
      />
      {/* <Carousel items={carouselItems} /> */}
      <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-slate-100 dark:border-slate-800 mt-auto w-full">
        <Link href="/" className="text-blue-500 inline-flex items-center">
          Learn more
          <ExternalLinkIcon className="w-4 h-4 ml-2" />
        </Link>
        <span className="text-slate-400 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2  border-slate-200 dark:border-slate-700">
          <EyeIcon className="w-4 h-4 mr-1" />
          1.2K
        </span>
        <span className="text-slate-400 inline-flex items-center leading-none text-sm">
          <MessageSquareIcon className="w-4 h-4 mr-1" />6
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
            John Doe
          </span>
          <span className="text-slate-400 text-xs tracking-widest mt-0.5">
            Correspondence
          </span>
        </span>
      </Link>
    </article>
  );
};
