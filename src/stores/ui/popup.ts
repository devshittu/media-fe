import { createUIStore, useUIStore } from './hooks/uiStoreFactory';

const popupStore = createUIStore({});
export type PopupProps = { onClose: () => void, isOpen: boolean};
export const usePopup = () => useUIStore(popupStore);

//path: src/stores/popup/popup.ts
