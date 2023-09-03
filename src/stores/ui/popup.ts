import { createUIStore, useUIStore } from './hooks/uiStoreFactory';

const popupStore = createUIStore({});

export const usePopup = () => useUIStore(popupStore);

//path: src/stores/popup/popup.ts
