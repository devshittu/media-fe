import { createUIStore, useUIStore } from './hooks/uiStoreFactory';

const popupStore = createUIStore({});
export type PopupProps = { onClose: () => void };
export const usePopup = () => useUIStore(popupStore);

//path: src/stores/popup/popup.ts
