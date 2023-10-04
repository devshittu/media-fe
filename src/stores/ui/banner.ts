import { createUIStore, useUIStore } from '../ui/hooks/uiStoreFactory';

const bannerStore = createUIStore({ initialIsOpen: true });

export const useBanner = () => useUIStore(bannerStore);

//path: src/stores/ui/banner.ts
