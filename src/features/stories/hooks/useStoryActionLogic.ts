// hooks/useStoryActionLogic.ts
import { LikeStoryFormData } from '../components/types';
import { useStoryNotification } from './useStoryNotification';

export const useStoryActionLogic = (
  storyId: number,
  storySlug: string,
  action: string,
  apiFunction: any,
) => {
  const { onSuccess, onError } = useStoryNotification(storySlug, action);

  const { submit: storyActionSubmit, isLoading } = apiFunction({
    story_id: storyId as unknown as string,
    onSuccess,
    onError,
  });

  const handleStoryAction = () => {
    const data: LikeStoryFormData = { story_slug: storySlug };
    storyActionSubmit(data);
  };

  return {
    handleStoryAction,
    isLoading,
  };
};
