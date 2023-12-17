import { useQueryClient } from '@tanstack/react-query';

import { PaginatedStoryListResponse, Story, StoryListResponse } from '../types';
import { StoryAction } from '../components';
import { QUERY_KEYS } from '@/config/query';
const { GET_USER_FEED_STORIES } = QUERY_KEYS;

export const useUpdateCachedStory = () => {
  const queryClient = useQueryClient();

  const updateStory = (
    queryKey: [string, ...any[]],
    story_id: number | string,
    actionType: StoryAction,
  ) => {
    queryClient.setQueryData<PaginatedStoryListResponse | undefined>(
      queryKey,
      (oldData: PaginatedStoryListResponse | undefined) => {
        if (!oldData) return;

        console.log('updatecache: ', oldData);

        const newData: PaginatedStoryListResponse = {
          ...oldData,
          pages: oldData.pages.map((page: StoryListResponse) => ({
            ...page,
            results: page.results.map((story) => {
              if (story.id === story_id) {
                console.log('updatecache: ', story);
                let updatedStory = { ...story };
                switch (actionType) {
                  case StoryAction.LIKE:
                    updatedStory = {
                      ...updatedStory,
                      likes_count: (updatedStory.likes_count || 0) + 1,
                      has_liked: true,
                    };
                    break;
                  case StoryAction.UNLIKE:
                    updatedStory = {
                      ...updatedStory,
                      likes_count: Math.max(
                        (updatedStory.likes_count || 0) - 1,
                        0,
                      ),
                      has_liked: false,
                    };
                    break;
                  case StoryAction.DISLIKE:
                    // Similar logic for dislike
                    break;
                  case StoryAction.UNDISLIKE:
                    // Similar logic for undislike
                    break;
                }
                return updatedStory;
              }
              return story;
            }),
          })),
        };

        return newData;
      },
    );
  };

  return updateStory;
};

// export const useUpdateCachedStory = () => {
//   const queryClient = useQueryClient();

//   const updateStory = (
//     queryKey: [string, ...any[]],
//     story_id: number | string,
//     actionType: StoryAction
//   ) => {
//     queryClient.setQueryData<PaginatedStoryListResponse | undefined>(
//       queryKey,
//       (oldData) => {
//         if (!oldData) return;

//         const newData: PaginatedStoryListResponse = {
//           ...oldData,
//           pages: oldData.pages.map((page: StoryListResponse) => ({
//             ...page,
//             results: page.results.map((story: Story) => {
//               if (story.id === story_id) {
//                 let updatedStory = { ...story };
//                 switch (actionType) {
//                   case StoryAction.LIKE:
//                     updatedStory = {
//                       ...updatedStory,
//                       likes_count: (updatedStory.likes_count || 0) + 1,
//                       has_liked: true,
//                     };
//                     break;
//                   case StoryAction.UNLIKE:
//                     updatedStory = {
//                       ...updatedStory,
//                       likes_count: Math.max((updatedStory.likes_count || 0) - 1, 0),
//                       has_liked: false,
//                     };
//                     break;
//                   // Add cases for 'dislike' and 'undislike' as needed
//                 }
//                 return updatedStory;
//               }
//               return story;
//             }),
//           })),
//         };

//         return newData;
//       }
//     );
//   };

//   return updateStory;
// };
//Path: src/features/stories/hooks/useUpdateCachedStory.ts
