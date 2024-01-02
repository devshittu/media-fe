import { CacheRefType } from '@/types';
import { BookmarkAction } from '../components/types';
import { useBookmarkNotification } from './useBookmarkNotification';

// Base payload type
export type BasePayload = {
  bookmark_id: number;
};

// Specific payload types
export type DeleteBookmarkPayload = BasePayload;
export type UpdateBookmarkPayload = BasePayload & {
  bookmark_category?: string;
  note?: string;
};

// Union of all payload types
export type PayloadType = DeleteBookmarkPayload | UpdateBookmarkPayload;

export type BookmarkActionLogicParameterType = {
  basePayload: BasePayload;
  action: BookmarkAction;
  apiFunction: any;
  cacheRefQueryKey: CacheRefType;
};

export const useBookmarkActionLogic = ({
  basePayload,
  action,
  apiFunction,
  cacheRefQueryKey,
}: BookmarkActionLogicParameterType) => {
  const { onSuccess, onError } = useBookmarkNotification(
    basePayload.bookmark_id,
    action,
  );
  const { submit, isLoading } = apiFunction({
    bookmark_id: basePayload.bookmark_id,
    onSuccess,
    onError,
    cacheRefQueryKey,
  });

  // For actions that only require the base payload (e.g., bookmark_id)
  const handleSimpleAction = () => {
    if (!basePayload.bookmark_id) {
      console.error('Bookmark ID is required in the payload.');
      return;
    }
    submit(basePayload);
  };

  // For actions that require additional data
  const handleActionWithAdditionalData = (
    additionalData: Partial<PayloadType>,
  ) => {
    if (!basePayload.bookmark_id) {
      console.error('Bookmark ID is required in the payload.');
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

// Path: src/features/stories/hooks/useBookmarkActionLogic.ts
