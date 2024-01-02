import React from 'react';
import {
  InputField,
  SelectField,
  SelectFieldOption,
  ToggleSwitch,
} from '@/components';
import { Button } from '@/components/button';
import { AppFormProps } from '@/types';
import { useForm } from 'react-hook-form';
import { useAddFeedback } from '../../api/post-add-feedback';
import { Story } from '@/features/stories';
import { AddFeedbackFormData, ReportType } from '@/features/feedbacks';
import { AuthStore } from '@/stores/auth';
import { Space } from '@/components/labs';

export const AddFeedbackForm = ({
  story,
  onSuccess,
  onError,
  onCancel,
}: AppFormProps & { story: Story; onCancel?: () => void }) => {
  const { submit, isLoading } = useAddFeedback({ onSuccess, onError });
  const { register, handleSubmit, formState, watch } =
    useForm<AddFeedbackFormData>({
      defaultValues: {
        report_type: ReportType.Spam.toLowerCase(),
        description: 'This story seems spammy.',
        content_type_name: 'story', // TODO: remove the magic value.
        object_id: story.id,
        is_anonymous: false,
      },
      // mode: 'onChange',
      mode: 'onBlur',
    });
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };
  const onSubmit = (data: AddFeedbackFormData) => {
    console.log('AddFeedbackFormData://', data);
    submit(data);
  };
  const ReportTypes: SelectFieldOption[] = [
    { value: ReportType.Spam.toLowerCase(), label: ReportType.Spam },
    {
      value: ReportType.Inappropriate.toLowerCase(),
      label: ReportType.Inappropriate,
    },
    { value: ReportType.Rumour.toLowerCase(), label: ReportType.Rumour },
    { value: ReportType.Other.toLowerCase(), label: ReportType.Other },
  ];
  return (
    <>
      <div className="w-full max-w-[500px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col justify-center overflow-hidden w-full relative"
        >
          <div className="w-full flex flex-col space-y-2 md:space-y-4">
            <h2 className="text-slate-800 dark:text-slate-200 tracking-wide whitespace-pre-wrap font-semibold">
              {story.title}
            </h2>

            <input type="hidden" {...register('content_type_name')} />
            <input type="hidden" {...register('object_id')} />

            <SelectField
              label="Report Type"
              id="report_type"
              options={ReportTypes}
              showLabel
              {...register('report_type')}
            />
            <InputField
              required
              placeholder="Your thoughts"
              id="description"
              label="Comment"
              type="textarea"
              showLabel
              {...register('description')}
              error={formState.errors.description}
            />
            <ToggleSwitch
              id="is_anonymous"
              // rightLabel="Submit anonymously"

              rightLabel={{
                checked: 'Submitting Anonymously',
                unchecked: `Submitting ${
                  AuthStore.getState().authUserDetails?.display_name
                    ? `as  ${
                        AuthStore.getState().authUserDetails?.display_name
                      }`
                    : 'with your name'
                }`,
              }}
              checked={watch('is_anonymous')}
              {...register('is_anonymous')}
            />

            <div className="flex space-x-3">
              <Button
                id={`add-feedback-button`}
                type="primary"
                loading={!!isLoading}
                disabled={isLoading}
                nativeType="submit"

                // className="justify-center font-semibold mt-4 w-full md:h-12"
                // onClick={openModal}
              >
                <span className="opacity-100 transition-opacity font-extrabold text-xl">
                  Submit
                </span>
              </Button>
              <Space />
              <Space />
              <Button
                id={`cancel-feedback-button`}
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

// Path: src/features/feedbacks/components/forms/add-feedback-form.tsx
