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
import { Story } from '../../types';
import { usePopupStore } from '@/stores/ui';
import { FormPopup, PromptPopup } from '@/components/blocks/popup/blocks/';
import { AddBookmarkSection } from '@/features/bookmarks';
import { AddFeedbackSection } from '@/features/feedbacks/components/forms';
import { useStoryActionLogic } from '../../hooks';
import { StoryAction } from '../types';
import { useDislikeStory } from '../../api/post-dislike-story';
import { useUndislikeStory } from '../../api/post-undislike-story';
import { NotificationType, useNotifications } from '@/stores/notifications';
import { usePrompts } from '@/stores/ui/prompts';
import { AttentionType, CacheRefType } from '@/types';
import { useDeleteBookmarkByStoryId } from '@/features/bookmarks/api/delete-bookmark-by-story-id';
import { useLogAnalytics } from '@/features/analytics/hooks/useLogAnalytics';
import { InteractionType } from '@/features/analytics/types';

type ContextMenuProps = {
  story: Story;
  cacheRefQueryKey: CacheRefType;
};

export const ContextMenu = ({ story, cacheRefQueryKey }: ContextMenuProps) => {
  const [open, setOpen] = useState(false);
  const {
    show: showPopup,
    isOpen,
    isClosing,
    close: closePopup,
  } = usePopupStore();
  const { showNotification } = useNotifications();
  const { showPrompt } = usePrompts();
  const { id, slug, has_disliked } = story;

  const {
    handleSimpleAction: handleDislikeStory,
    isLoading: isDislikeLoading,
  } = useStoryActionLogic({
    basePayload: {
      story_id: id,
    },
    action: StoryAction.DISLIKE,
    apiFunction: useDislikeStory, // Replace with your actual API function
    cacheRefQueryKey: cacheRefQueryKey,
  });

  const {
    handleSimpleAction: handleUndislikeStory,
    isLoading: isUndislikeLoading,
  } = useStoryActionLogic({
    basePayload: {
      story_id: id,
    },
    action: StoryAction.UNDISLIKE,
    apiFunction: useUndislikeStory, // Replace with your actual API function
    cacheRefQueryKey: cacheRefQueryKey,
  });
  const {
    handleSimpleAction: handleDeleteBookmark,
    isLoading: isDeleteBookmarkLoading,
  } = useStoryActionLogic({
    basePayload: {
      story_id: id,
    },
    action: StoryAction.DELETE_BOOKMARK,
    apiFunction: useDeleteBookmarkByStoryId, // Replace with your actual API function
    cacheRefQueryKey: cacheRefQueryKey,
  });

  const addBookmark = () => {
    if (!!story?.has_bookmarked) {
      showPopup(
        <PromptPopup
          isOpen={isOpen}
          isClosing={isClosing}
          onOk={handleDeleteBookmark}
          onClose={closePopup}
        />,
      );
    } else {
      showPopup(
        <FormPopup
          isOpen={isOpen}
          isClosing={isClosing}
          title={`Add a Bookmark`}
          subtitle={`Save your favorite news stories to revisit later.`}
          onClose={closePopup}
        >
          <AddBookmarkSection
            story={story}
            onCancel={closePopup}
            cacheRefQueryKey={cacheRefQueryKey}
          />
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
          isOpen={isOpen}
          isClosing={isClosing}
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
          isOpen={isOpen}
          isClosing={isClosing}
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
        isOpen={isOpen}
        isClosing={isClosing}
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

  const { logAnalytics } = useLogAnalytics();

  const handleShareClick = (platform: 'WhatsApp' | 'Twitter') => {
    // Log the share interaction
    logAnalytics({
      analytics_store_id: '', // This will be generated in the store
      event: InteractionType.SHARE_STORY,
      interaction_type: InteractionType.SHARE_STORY,
      story: id,
      timestamp: Date.now(),
      metadata: {
        story_id: story.id.toString(),
        source_page: window.location.href,
        platform,
      },
    });
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
          {/* <MenuLinkItem
            url={`whatsapp://send?text=Open this \n ${story.title} \n on WhatsApp`}
            data-action="share/whatsapp/share"
            label="Whatsapp"
            icon={<Icon icon={<WhatsappColoredIcon />}
           className="w-6" />}
          />
          <MenuLinkItem
            url="https://twitter.com/intent/tweet"
            label="Twitter"
            icon={<Icon icon={<TwitterColoredIcon />} className="w-6" />}
          /> */}

          <MenuLinkItem
            url={`whatsapp://send?text=Open this \n ${story.title} \n on WhatsApp`}
            label="Whatsapp"
            icon={<Icon icon={<WhatsappColoredIcon />} className="w-6" />}
            onClick={() => handleShareClick('WhatsApp')}
          />
          <MenuLinkItem
            url="https://twitter.com/intent/tweet"
            label="Twitter"
            icon={<Icon icon={<TwitterColoredIcon />} className="w-6" />}
            onClick={() => handleShareClick('Twitter')}
          />
          <MenuButtonItem
            label={!!story?.has_bookmarked ? 'Unbookmark' : 'Bookmark'}
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
      </PopoverContent>
    </Popover>
  );
};

// Path: src/features/stories/components/context-menu/context-menu.tsx
