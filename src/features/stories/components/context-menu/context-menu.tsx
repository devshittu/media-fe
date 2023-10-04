import React, { useContext, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/blocks/popover';
import {
  WhatsappColoredIcon,
  TwitterColoredIcon,
  FlagIcon,
  BookmarkIcon,
  GoogleColoredIcon,
  Icon,
  MoreHorizontalIcon,
} from '@/components/illustrations/';
import { Tag } from '@/components/blocks/tag';
import { Drawer, DrawerSide } from '@/components/blocks/drawer';
import Menu, { MenuHeader, MenuItem } from '@/components/menus/menu';
import { Toast, ToastPosition, ToastType } from '@/components/blocks/toast';
import { Button } from '@/components/button';
import { Modal } from '@/components/blocks/modal';
import { Story } from '../../types';
import { useBookmark } from '@/features/bookmarks/hooks/useBookmark';

type ContextMenuProps = {
  story: Story;
  initialBookmarkState: boolean;
};

export const ContextMenu = ({
  story,
  initialBookmarkState,
}: ContextMenuProps) => {
  const [open, setOpen] = useState(false);
  const ShowToast = () => {
    const notify = new Toast({
      message: 'Hello, world!',
      position: ToastPosition.BOTTOM_CENTER, // 'bottom-center',
      type: ToastType.SUCCESS, //'success',
      onClose: () => {
        // Handle close event
        console.log('toast closed');
      },
      duration: 3000,
    });

    notify.open();
  };

  const { isBookmarked, handleBookmark, handleUnbookmark } = useBookmark(
    story.id + '',
    (initialBookmarkState = false),
  );

  const addBookmark = (event: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    if (isBookmarked) {
      handleUnbookmark();
    } else {
      handleBookmark();
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

  return (
    <Popover open={open} onOpenChange={setOpen} placement="bottom-end">
      <PopoverTrigger onClick={() => setOpen((v) => !v)}>
        <Icon icon={<MoreHorizontalIcon />} className="w-6" />
      </PopoverTrigger>
      <PopoverContent className="Popover z-20 w-44 md:w-48 bg-slate-50 dark:bg-slate-800">
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
            label={isBookmarked ? 'Unbookmark' : 'Bookmark'}
            url="#"
            onClick={addBookmark}
            icon={
              <Icon
                icon={<BookmarkIcon />}
                className="w-6 text-slate-900 dark:text-slate-100"
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
  );
};
