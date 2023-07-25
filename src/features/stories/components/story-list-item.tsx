/* eslint-disable react/jsx-no-duplicate-props */
import React, { ReactEventHandler, useState } from 'react';
import { Link } from '@/components/labs/typography';
import Image from 'next/image';
import { Modal } from '@/components/blocks/modal';
import { StoryListItemProps } from './types';
import {
  Carousel,
  CarouselItem,
  CarouselOptions,
} from '@/components/blocks/carousel';
import {
  BookmarkIcon,
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
import { Toast } from '../../../components/blocks/toast';
import { Button } from '@/components/button';
import {
  GoogleColoredIcon,
  TwitterColoredIcon,
  WhatsappColoredIcon,
} from '@/components/illustrations/icons/social';
import Drawer from '../../../components/blocks/nav/drawer';
import { DrawerSide } from '../../../components/blocks/nav';
import Dropdown from './dropdown';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeading,
  PopoverTrigger,
} from '../../../components/blocks/popover';
import { Menu, MenuHeader, MenuItem } from '@/components/menus/menu';
import SvgGoogleColored from '@/components/illustrations/icons/social/GoogleColored';
import { Tag } from '../../../components/blocks/tag';

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
      <p className="text-sm font-normal text-slate-500 dark:text-slate-400">
        Connect and share with the people on your favorite social media
        platforms.
      </p>
      <ul className="my-4 space-y-3">
        <li>
          <Link
            className="flex items-center p-3 text-base font-bold text-slate-900 rounded-lg bg-slate-50 hover:bg-slate-100 group hover:shadow dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white"
            href={`whatsapp://send?text=Open this \n ${story.title} \n on WhatsApp`}
            data-action="share/whatsapp/share"
            target="_blank"
          >
            <Icon icon={<WhatsappColoredIcon />} className="w-6" />
            <span className="flex-1 ml-3 whitespace-nowrap">Whatsapp</span>
            <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-slate-500 bg-slate-200 rounded dark:bg-slate-700 dark:text-slate-400">
              New
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="https://twitter.com/intent/tweet"
            className="flex items-center p-3 text-base font-bold text-slate-900 rounded-lg bg-slate-50 hover:bg-slate-100 group hover:shadow dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white"
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
            className="flex items-center p-3 text-base font-bold text-slate-900 rounded-lg bg-slate-50 hover:bg-slate-100 group hover:shadow dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white"
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
          className="inline-flex items-center text-xs font-normal text-slate-500 hover:underline dark:text-slate-400"
        >
          <HelpCircleIcon className="w-3 mr-2" strokeWidth={2.5} />
          Why do I need to share?
        </Link>
      </div>
    </div>
  );
};

export const StoryListItem = ({ story, className }: StoryListItemProps) => {
  const [open, setOpen] = useState(false);
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

  const addBookmark = (event: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    const drawer = new Drawer({
      title: 'Add Bookmark!',
      titleIcon: <BookmarkIcon />,
      id: 'add-bookmark',
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
      className={`relative p-4 md:p-8 lg:p-12 flex flex-col items-start  border-b-2 border-slate-100 dark:border-slate-800 ${className}`}
    >
      <div
        id={`scroll-to-${story.slug}`}
        style={{ position: 'absolute', top: '-100px', left: '0' }}
      ></div>
      <div className={`flex align-middle items-center justify-between w-full`}>
        <div className="inline-block py-1 px-2 rounded bg-blue-50 text-blue-500 text-xs font-medium tracking-widest">
          {`CATEGORY`}
        </div>

        {/* <Dropdown
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
        </button> */}
        {/* Context Menu Trigger */}

        {/* <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            return openContextMenu();
          }}
        >
          <Icon icon={<MoreHorizontalIcon />} className="w-6" />
        </Link> */}

        <Popover open={open} onOpenChange={setOpen} placement="bottom-end">
          <PopoverTrigger onClick={() => setOpen((v) => !v)}>
            <Icon icon={<MoreHorizontalIcon />} className="w-6" />
          </PopoverTrigger>
          <PopoverContent className="Popover z-20">
            <Menu>
              <MenuHeader>
                <h3 className="text-lg font-bold">Share</h3>
              </MenuHeader>
              <MenuItem
                url={`whatsapp://send?text=Open this \n ${story.title} \n on WhatsApp`}
                data-action="share/whatsapp/share"
                label="Whatsapp"
                icon={<Icon icon={<WhatsappColoredIcon />} className="w-6" />}
              />
              <MenuItem
                url="https://twitter.com/intent/tweet"
                label="Twitter"
                icon={<Icon icon={<TwitterColoredIcon />} className="w-6" />}
              />
              <MenuItem
                label="Report"
                url="#"
                icon={<Icon icon={<FlagIcon />} className="w-6" />}
                onClick={openModal}
              />
              <MenuItem
                label="Add Bookmark"
                url="#"
                onClick={addBookmark}
                icon={
                  <Icon
                    icon={<BookmarkIcon />}
                    className="w-6 text-slate-900"
                    strokeWidth={2.5}
                  />
                }
                tag={<Tag variant="green">Pro</Tag>}
              />
              <MenuItem
                label="Pro Version"
                url="#"
                icon={<Icon icon={<GoogleColoredIcon />} className="w-6" />}
                tag={<Tag variant="green">Pro</Tag>}
              />
            </Menu>
            {/* <PopoverHeading>My popover heading</PopoverHeading>
          <PopoverDescription>My popover description</PopoverDescription>
          <PopoverClose>Close</PopoverClose> */}
          </PopoverContent>
        </Popover>
      </div>

      <Link href={`/stories/${story?.slug}`}>
        <h2
          id={story?.slug}
          className="story-header sm:text-2xl text-xl title-font mt-4 mb-4  font-extrabold tracking-tight text-slate-900 dark:text-slate-200"
        >
          {`${story?.id}. ${story?.title}`}
        </h2>
      </Link>
      <p className="leading-relaxed text-lg mb-8 text-justify text-slate-800 dark:text-slate-300">{`${story?.body}`}</p>

      <Carousel items={carouselItems} options={carouselOptions} />
      <div className="mb-8"></div>
      <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-slate-100 dark:border-slate-800 mt-auto w-full">
        <Link href="/" className="text-cyan-500 inline-flex items-center">
          <span className="text-base">Learn more</span>
          <ExternalLinkIcon className="w-4 h-4 ml-2" />
        </Link>
        <span className="text-slate-400 mr-3 inline-flex items-center ml-auto leading-none text-base pr-3 py-1 border-r-2  border-slate-200 dark:border-slate-700">
          <EyeIcon className="w-4 h-4 mr-1" />
          1.2K
        </span>
        <span className="text-slate-400 inline-flex items-center leading-none text-base">
          <MessageSquareIcon className="w-4 h-4 mr-1" />6
        </span>
      </div>
      <Link href="#" className="inline-flex items-center">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <Image
              width="48"
              height="48"
              className="rounded-md w-14 h-14"
              src={`https://dummyimage.com/104x104`}
              alt="Avatar image"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm lg:text-base font-semibold text-slate-900 truncate dark:text-slate-100">
              {`John Doe`}
            </p>
            <p className="text-sm text-slate-500 truncate dark:text-slate-400">
              {`correspondence, Reuter`}
            </p>
          </div>
          {/* <div className="inline-flex items-center text-base font-semibold text-slate-900 dark:text-white">
          <Button className="rounded-lg">Subscribe</Button>
        </div> */}
        </div>
      </Link>
    </article>
  );
};
