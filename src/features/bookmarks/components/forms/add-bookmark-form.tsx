import React from 'react';
import { InputField, SelectField, SelectFieldOption } from '@/components';
import { Button } from '@/components/button';
import { AddBookmarkFormData, BookmarkCategory } from '@/features/bookmarks';
import { AppFormProps } from '@/types';
import { useForm } from 'react-hook-form';
import { useAddBookmark } from '../../api/post-add-bookmark';
import { Story } from '@/features/stories';

export const AddBookmarkForm = ({
  story,
  onSuccess,
  onCancel,
}: AppFormProps & { story: Story; onCancel?: () => void }) => {
  const { submit, isLoading } = useAddBookmark({ onSuccess });
  const { register, handleSubmit, formState } = useForm<AddBookmarkFormData>({
    defaultValues: {
      bookmark_category: BookmarkCategory.Save,
      note: '',
      story_id: story.id + '',
    },
    // mode: 'onChange',
    mode: 'onBlur',
  });
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  const onSubmit = (data: AddBookmarkFormData) => {
    submit(data);
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
              {story.title}
            </h2>

            <br />
            <input type="hidden" {...register('story_id')} />

            <SelectField
              label="Bookmark Category"
              id="bookmark_category"
              options={BookmarkCategories}
              showLabel
              {...register('bookmark_category')}
            />
            <br />
            <InputField
              required
              placeholder="Enter your note"
              id="note"
              label="Note"
              type="textarea"
              showLabel
              {...register('note')}
              error={formState.errors.note}
            />
            <br />
            <div className="flex space-x-3">
              <Button
                type="primary"
                loading={!!isLoading}
                disabled={isLoading}
                nativeType="submit"

                // className="justify-center font-semibold mt-4 w-full md:h-12"
                // onClick={openModal}
              >
                <span className="opacity-100 transition-opacity font-extrabold text-xl">
                  Add Bookmark
                </span>
              </Button>
              &nbsp;&nbsp;
              <Button
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
