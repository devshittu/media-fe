import { createFeedsStore } from './feeds';
import { useStore } from 'zustand';
import { Story } from '@/features/stories';

export const userFeedsStore = createFeedsStore<Story>();

export const useUserFeedsStore = () => useStore(userFeedsStore);

// Path: src/stores/feeds/user-feeds.ts
