import { CacheRefType } from '@/types';
import { StoryAction } from '../components/types';
import { useStoryNotification } from './useStoryNotification';

// Base payload type
export type BasePayload = {
  story_id: number;
};

// Specific payload types
export type LikeStoryPayload = BasePayload;
export type AddBookmarkPayload = BasePayload & {
  bookmark_category: string;
  note: string;
};

// Union of all payload types
export type PayloadType = LikeStoryPayload | AddBookmarkPayload;

export type StoryActionLogicParameterType = {
  basePayload: BasePayload;
  action: StoryAction;
  apiFunction: any//(args: any) => { submit: (data: PayloadType) => void; isLoading: boolean };
  cacheRefQueryKey: CacheRefType;
};

export const useStoryActionLogic = ({
  basePayload,
  action,
  apiFunction,
  cacheRefQueryKey,
}: StoryActionLogicParameterType) => {
  const { onSuccess, onError } = useStoryNotification(basePayload.story_id, action);
  const { submit, isLoading } = apiFunction({ story_id:basePayload.story_id, onSuccess, onError, cacheRefQueryKey });

  // For actions that only require the base payload (e.g., story_id)
  const handleSimpleAction = () => {
    if (!basePayload.story_id) {
      console.error('Story ID is required in the payload.');
      return;
    }
    submit(basePayload);
  };

  // For actions that require additional data
  const handleActionWithAdditionalData = (additionalData: Partial<PayloadType>) => {
    if (!basePayload.story_id) {
      console.error('Story ID is required in the payload.');
      return;
    }
    const fullPayload = { ...basePayload, ...additionalData };
    submit(fullPayload);
  };

  return {
    handleSimpleAction,
    handleActionWithAdditionalData,
    isLoading,
  };
};

// Path: src/features/stories/hooks/useStoryActionLogic.ts
