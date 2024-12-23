import React from 'react';
import {
  HookFormInputField,
  HookFormSelectField,
  InputField,
  SelectField,
  SelectFieldOption,
} from '@/components';
import { Button } from '@/components/button';
import {
  AddBookmarkFormData,
  Bookmark,
  BookmarkCategory,
  UpdateBookmarkFormData,
} from '@/features/bookmarks';
import { AppFormProps, CacheRefType } from '@/types';
import { useForm } from 'react-hook-form';
import { useAddBookmark } from '../../api/post-add-bookmark';
import { Story, useStoryActionLogic } from '@/features/stories';
import { StoryAction } from '@/features/stories/components/types';

import { Space } from '@/components/labs';
import { useBookmarkActionLogic } from '../../hooks';
import { BookmarkAction } from '../types';
import { useUpdateBookmark } from '../../api/patch-update-bookmark';

export const EditBookmarkForm = ({
  bookmark,
  onSuccess,
  onCancel,
  cacheRefQueryKey,
}: AppFormProps & {
  bookmark: Bookmark;
  onCancel?: () => void;
  cacheRefQueryKey: CacheRefType;
}) => {
  const { id } = bookmark;
  const addBookmarkPayload = {
    bookmark_category: bookmark.bookmark_category,
    note: bookmark.note,
    bookmark_id: id,
  };
  const { register, handleSubmit, formState, control } =
    useForm<UpdateBookmarkFormData>({
      defaultValues: addBookmarkPayload,
      // mode: 'onChange',
      mode: 'onBlur',
    });
  const {
    handleActionWithAdditionalData: handleUpdateBookmark,
    isLoading: isAddBookmarkLoading,
  } = useBookmarkActionLogic({
    basePayload: addBookmarkPayload,
    action: BookmarkAction.EDIT_BOOKMARK,
    apiFunction: useUpdateBookmark, // Replace with your actual API function
    cacheRefQueryKey,
  });

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    }
  };
  const onSubmit = (data: UpdateBookmarkFormData) => {
    // submit(data);
    // console.log(`Form data on submit: ${JSON.stringify(data)}`);
    handleUpdateBookmark(data);
    handleSuccess();
    handleCancel(); // close the form modal/window
  };
  const BookmarkCategories: SelectFieldOption[] = [
    { value: BookmarkCategory.Save, label: BookmarkCategory.Save },
    { value: BookmarkCategory.Favorites, label: BookmarkCategory.Favorites },
    { value: BookmarkCategory.ReadLater, label: BookmarkCategory.ReadLater },
  ];
  return (
    <>
      <div className="w-full max-w-[500px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col justify-center overflow-hidden w-full relative"
        >
          <div className="w-full">
            <h2 className="text-slate-800 dark:text-slate-200 tracking-wide whitespace-pre-wrap font-semibold">
              {bookmark.title}
            </h2>

            <br />
            <input type="hidden" {...register('bookmark_id')} />

            <HookFormSelectField
              name="bookmark_category"
              control={control}
              label="Bookmark Category"
              id="bookmark_category"
              options={BookmarkCategories}
              showLabel
              rules={{ required: 'Bookmark category is required' }}
              error={formState.errors.bookmark_category}
            />
            <br />
            <HookFormInputField
              name="note"
              control={control}
              placeholder="Enter your note"
              id="name"
              label="Note"
              type="textarea"
              showLabel
              error={formState.errors.note}
            />
            <br />
            <div className="flex space-x-3">
              <Button
                id={`add-bookmark`}
                type="primary"
                loading={!!isAddBookmarkLoading}
                disabled={isAddBookmarkLoading}
                nativeType="submit"

                // className="justify-center font-semibold mt-4 w-full md:h-12"
                // onClick={openModal}
              >
                <span className="opacity-100 transition-opacity font-extrabold text-xl">
                  Update Bookmark
                </span>
              </Button>
              <Space />
              <Space />
              <Button
                id={`cancel-add-bookmark`}
                nativeType="button"
                outlined
                type={`adaptive`}
                onClick={handleCancel}
              >
                <span className="opacity-100 transition-opacity font-extrabold text-xl">
                  Cancel
                </span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

// Path: src/features/bookmarks/components/forms/add-bookmark-form.tsx
