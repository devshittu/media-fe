import React, { useState } from 'react';
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
  ThumbsDownIcon,
} from '@/components/illustrations/';
import { Tag } from '@/components/blocks/tag';
import Menu, {
  MenuHeader,
  MenuLinkItem,
  MenuButtonItem,
} from '@/components/menus/menu';
import { Toast, ToastPosition, ToastType } from '@/components/blocks/toast';
import { Button } from '@/components/button';
import { Modal } from '@/components/blocks/modal';
import { Story } from '../../types';
import { useBookmark } from '@/features/bookmarks/hooks/useBookmark';
import { usePopup } from '@/stores/ui';
import { FormPopup, PromptPopup } from '@/components/blocks/popup/blocks/';
import { AddBookmarkSection } from '@/features/bookmarks';
import { AddFeedbackSection } from '@/features/feedbacks/components/forms';
import { useStoryActionLogic } from '../../hooks';
import { StoryAction } from '../types';
import { useDislikeStory } from '../../api/post-dislike-story';
import { useUndislikeStory } from '../../api/post-undislike-story';
import { NotificationType, useNotifications } from '@/stores/notifications';
import { usePrompts } from '@/stores/ui/prompts';
import { AttentionType } from '@/types';

type ContextMenuProps = {
  story: Story;
  initialBookmarkState: boolean;
};

export const ContextMenu = ({
  story,
  initialBookmarkState,
}: ContextMenuProps) => {
  const [open, setOpen] = useState(false);
  const { show: showPopup, close: closePopup } = usePopup();
  const { showNotification } = useNotifications();
  const { showPrompt } = usePrompts();
  const { id, slug, has_disliked } = story;

  const { handleStoryAction: handleDislikeStory, isLoading: isDislikeLoading } =
    useStoryActionLogic(id, slug, StoryAction.DISLIKE, useDislikeStory);

  const {
    handleStoryAction: handleUndislikeStory,
    isLoading: isUndislikeLoading,
  } = useStoryActionLogic(id, slug, StoryAction.DISLIKE, useUndislikeStory);

  const { isBookmarked, handleBookmark, handleUnbookmark } = useBookmark(
    story.id.toString(),
    (initialBookmarkState = !!story?.has_bookmarked),
  );

  const addBookmark = () => {
    if (isBookmarked) {
      // handleUnbookmark();
      showPopup(<PromptPopup onOk={handleUnbookmark} onClose={closePopup} />);
    } else {
      // handleBookmark();
      showPopup(
        <FormPopup
          title={`Add a Bookmark`}
          subtitle={`Save your favorite news stories to revisit later.`}
          onClose={closePopup}
        >
          <AddBookmarkSection story={story} onCancel={closePopup} />
        </FormPopup>,
      );
    }

    // const drawer = new Drawer({
    //   title: 'Add Bookmark!',
    //   titleIcon: <BookmarkIcon />,
    //   id: 'add-bookmark',
    //   side: DrawerSide.TOP,
    //   children: (
    //     <div>
    //       <AddBookmarkForm onSuccess={()=> alert('on success')}/>
    //       Hello <Button  id={`update-settings-button`}  onClick={ShowToast}>Show Toast</Button>
    //     </div>
    //   ),
    //   // type: 'success',
    //   onClose: () => {
    //     // Handle close event
    //   },
    // });

    // drawer.open();
  };

  const onDislikeSuccess = () => {
    showNotification({
      type: NotificationType.SUCCESS,
      title: 'Success',
      duration: 5000,
      message: 'Got it. Similar content will no longer appear in your feed.!',
    });
  };

  // TODO: Refactor the undislike behavior in to a hook but before that make the alert box callable app-wide and make icons for different states

  const dislikeStory = () => {
    if (!has_disliked) {
      // showPrompt({
      //   type: PromptType.WARNING,
      //    onOk: handleDislikeStory,
      //   title:'Warning Message',
      //   message: 'Disliking this story will remove similar content from your feed. Are you sure you want to proceed?',
      //   onOkComplete: onDislikeSuccess
      //  })
      showPopup(
        <PromptPopup
          type={AttentionType.WARNING}
          onOk={handleDislikeStory}
          // onOk={() => alert('Dislike!')}
          onClose={closePopup}
          title={'Warning Message'}
          message={
            'Disliking this story will remove similar content from your feed. Are you sure you want to proceed?'
          }
          onOkComplete={onDislikeSuccess}
        />,
      );

      console.log('Chosen to dislike this story');
    } else {
      console.log('Chosen to undislike this story');

      showPopup(
        <PromptPopup
          onOk={handleUndislikeStory}
          onClose={closePopup}
          title={'Warning Message'}
          message={
            'Undisliking this story will bring back  similar content onto your feed. Are you sure you want to proceed?'
          }
          onOkComplete={onDislikeSuccess}
        />,
      );
    }
  };

  const submitFeedbackAction = () => {
    showPopup(
      <FormPopup
        title={`Share Your Thoughts on the Story`}
        subtitle={`Provide feedback to help us deliver better news content for you.`}
        onClose={closePopup}
      >
        <AddFeedbackSection story={story} onCancel={closePopup} />
      </FormPopup>,
    );
    // const modal = new Modal({
    //   title: 'Hello, world!',
    //   id: 'first-modal',
    //   size: 'full',
    //   children: (
    //     <div>
    //       Hello <Button   id={`update-settings-button`}  onClick={ShowToast}>Show Toast</Button>
    //     </div>
    //   ),
    // });

    // modal.open();
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
          <MenuLinkItem
            url={`whatsapp://send?text=Open this \n ${story.title} \n on WhatsApp`}
            data-action="share/whatsapp/share"
            label="Whatsapp"
            icon={<Icon icon={<WhatsappColoredIcon />} className="w-6" />}
          />
          <MenuLinkItem
            url="https://twitter.com/intent/tweet"
            label="Twitter"
            icon={<Icon icon={<TwitterColoredIcon />} className="w-6" />}
          />
          <MenuButtonItem
            label={isBookmarked ? 'Unbookmark' : 'Bookmark'}
            onClick={addBookmark}
            icon={
              <Icon
                icon={<BookmarkIcon />}
                className="w-6 text-slate-900 dark:text-slate-100"
                strokeWidth={2.5}
              />
            }
            // tag={<Tag variant="green">Pro</Tag>}
          />

          <MenuButtonItem
            label={'Dislike'}
            // url="#"
            icon={
              <Icon
                icon={<ThumbsDownIcon />}
                className="w-6 text-slate-900 dark:text-slate-100"
                strokeWidth={2.5}
              />
            }
            onClick={dislikeStory}
          />

          <MenuButtonItem
            label="Report"
            // url="#"
            icon={
              <Icon
                icon={<FlagIcon />}
                className="w-6 text-slate-900 dark:text-slate-100"
                strokeWidth={2.5}
              />
            }
            onClick={submitFeedbackAction}
          />
          {/* <MenuLinkItem
            label="Pro Version"
            url="#"
            icon={<Icon icon={<GoogleColoredIcon />} className="w-6" />}
            tag={<Tag variant="green">Pro</Tag>}
          /> */}
        </Menu>
        {/* <PopoverHeading>My popover heading</PopoverHeading>
          <PopoverDescription>My popover description</PopoverDescription>
          <PopoverClose>Close</PopoverClose> */}
      </PopoverContent>
    </Popover>
  );
};

// Path: src/features/stories/components/context-menu/context-menu.tsx
