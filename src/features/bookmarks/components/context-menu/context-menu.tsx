import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/blocks/popover';
import {
  Icon,
  MoreHorizontalIcon,
  ArrowRightCircleIcon,
  EditIcon,
  Trash2Icon,
} from '@/components/illustrations/';
import Menu, { MenuHeader, MenuButtonItem } from '@/components/menus/menu';
import { Bookmark, BookmarkCategory } from '../../types';
import { usePopup } from '@/stores/ui';
import { FormPopup, PromptPopup } from '@/components/blocks/popup/blocks/';
import { useBookmarkActionLogic } from '../../hooks';
import { BookmarkAction } from '../types';
import { NotificationType, useNotifications } from '@/stores/notifications';
import { usePrompts } from '@/stores/ui/prompts';
import { AttentionType, CacheRefType } from '@/types';
import { useDeleteBookmark } from '@/features/bookmarks/api/delete-bookmark';
import { useUpdateBookmark } from '../../api/patch-update-bookmark';
import { AddBookmarkSection } from '../forms';
import { EditBookmarkSection } from '../forms/edit-bookmark-section';

type ContextMenuProps = {
  bookmark: Bookmark;
  cacheRefQueryKey: CacheRefType;
};

export const ContextMenu = ({
  bookmark,
  cacheRefQueryKey,
}: ContextMenuProps) => {
  const [open, setOpen] = useState(false);
  const { show: showPopup, close: closePopup } = usePopup();
  const { showNotification } = useNotifications();
  const { showPrompt } = usePrompts();
  const { id } = bookmark;

  const {
    handleActionWithAdditionalData: handleMoveToSave,
    isLoading: isMoveToSaveLoading,
  } = useBookmarkActionLogic({
    basePayload: {
      bookmark_id: id,
    },
    action: BookmarkAction.MOVE_TO_SAVE,
    apiFunction: useUpdateBookmark, // Replace with your actual API function
    cacheRefQueryKey: cacheRefQueryKey,
  });

  const submitAction = (bookmarkCategory: BookmarkCategory) => {
    handleMoveToSave({ bookmark_id: id, bookmark_category: bookmarkCategory });
  };
  // const {
  //   handleSimpleAction: handleUndislikeStory,
  //   isLoading: isUndislikeLoading,
  // } = useBookmarkActionLogic({
  //   basePayload: {
  //     bookmark_id: id,
  //   },
  //   action: BookmarkAction.MOVE_TO_READ_LATER,
  //   apiFunction: useUpdateBookmark, // Replace with your actual API function
  //   cacheRefQueryKey: cacheRefQueryKey,
  // });
  const {
    handleSimpleAction: handleDeleteBookmark,
    isLoading: isDeleteBookmarkLoading,
  } = useBookmarkActionLogic({
    basePayload: {
      bookmark_id: id,
    },
    action: BookmarkAction.DELETE_BOOKMARK,
    apiFunction: useDeleteBookmark, // Replace with your actual API function
    cacheRefQueryKey: cacheRefQueryKey,
  });

  const moveToAnotherCategory = (bookmarkCategory: BookmarkCategory) => {
    showPopup(
      <PromptPopup
        type={AttentionType.INFO}
        onOk={() => submitAction(bookmarkCategory)}
        onClose={closePopup}
        title={'Heads Up!'}
        message={`This bookmark will be moved to the ${bookmarkCategory} category. Are you sure you want to proceed?`}
        onOkComplete={onMoveSuccess}
      />,
    );
  };
  const editBookmark = () => {
    showPopup(
      <FormPopup
        title={`Edit Bookmark`}
        subtitle={`Save your favorite news stories to revisit later.`}
        onClose={closePopup}
      >
        <EditBookmarkSection
          bookmark={bookmark}
          onCancel={closePopup}
          cacheRefQueryKey={cacheRefQueryKey}
        />
      </FormPopup>,
    );
  };
  const deleteBookmark = () => {
    showPopup(
      <PromptPopup
        onOk={handleDeleteBookmark}
        onClose={closePopup}
        title={'Heads Up!'}
        message={`You are about to deleting this bookmark. Are you sure you want to proceed?`}
        onOkComplete={onMoveSuccess}
      />,
    );
  };

  const onMoveSuccess = () => {
    showNotification({
      type: NotificationType.SUCCESS,
      title: 'Success',
      duration: 5000,
      message: 'Moved successfully!',
    });
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen} placement="bottom-end">
        <PopoverTrigger onClick={() => setOpen((v) => !v)}>
          <Icon icon={<MoreHorizontalIcon />} className="w-6" />
        </PopoverTrigger>
        <PopoverContent className="Popover z-20 w-44 md:w-56 bg-slate-50 dark:bg-slate-800">
          <Menu>
            <MenuHeader>
              <h3 className="text-lg font-bold">Actions</h3>
            </MenuHeader>
            {bookmark.bookmark_category != BookmarkCategory.Save && (
              <MenuButtonItem
                label="Move to Save"
                onClick={() => moveToAnotherCategory(BookmarkCategory.Save)}
                icon={
                  <Icon
                    icon={<ArrowRightCircleIcon />}
                    className="w-6 text-slate-900 dark:text-slate-100"
                    strokeWidth={2.5}
                  />
                }
              />
            )}
            {bookmark.bookmark_category != BookmarkCategory.ReadLater && (
              <MenuButtonItem
                label="Move to Read Later"
                onClick={() =>
                  moveToAnotherCategory(BookmarkCategory.ReadLater)
                }
                icon={
                  <Icon
                    icon={<ArrowRightCircleIcon />}
                    className="w-6 text-slate-900 dark:text-slate-100"
                    strokeWidth={2.5}
                  />
                }
              />
            )}
            {bookmark.bookmark_category != BookmarkCategory.Favorites && (
              <MenuButtonItem
                label="Move to Favorites"
                onClick={() =>
                  moveToAnotherCategory(BookmarkCategory.Favorites)
                }
                icon={
                  <Icon
                    icon={<ArrowRightCircleIcon />}
                    className="w-6 text-slate-900 dark:text-slate-100"
                    strokeWidth={2.5}
                  />
                }
              />
            )}
            <MenuButtonItem
              label={'Edit Note'}
              icon={
                <Icon
                  icon={<EditIcon />}
                  className="w-6 text-slate-900 dark:text-slate-100"
                  strokeWidth={2.5}
                />
              }
              onClick={editBookmark}
            />

            <MenuButtonItem
              label={'Delete'}
              icon={
                <Icon
                  icon={<Trash2Icon />}
                  className="w-6 text-slate-900 dark:text-slate-100"
                  strokeWidth={2.5}
                />
              }
              onClick={deleteBookmark}
            />
          </Menu>
        </PopoverContent>
      </Popover>
    </>
  );
};

// Path: src/features/stories/components/context-menu/context-menu.tsx
