import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      staleTime: 5 * 60 * 1000, // Data is considered stale after 5 minutes
      cacheTime: 30 * 60 * 1000, // Cache data for 30 minutes
    },
    mutations: {
      // You can customize mutation behaviors similarly
      retry: 1, // Retry failed mutations once
      retryDelay: (attemptIndex) => 1000 * attemptIndex, // Linear backoff for retries
    },
    //  queries: {
    // queryFn: customQueryFunction,
    // staleTime: 5 * 60 * 1000, // Data is considered stale after 5 minutes
    // cacheTime: 30 * 60 * 1000, // Cache data for 30 minutes
    //   refetchOnWindowFocus: true, // Refetch on window focus
    //   retry: 2, // Retry failed queries 2 times
    //   retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff for retries
    //   // Add more query configurations as needed
    // },
    // mutations: {
    //   // You can customize mutation behaviors similarly
    //   retry: 1, // Retry failed mutations once
    //   retryDelay: (attemptIndex) => 1000 * attemptIndex, // Linear backoff for retries
    //   // Add more mutation configurations as needed
    // },
  },
});
