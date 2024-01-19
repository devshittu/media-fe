import {
  UIStoreOptions,
  createUIStore,
  useUIStore,
} from './hooks/uiStoreFactory';

const popupStore = createUIStore({ closeDelay: 3000 });
export type PopupProps = {
  onClose: () => void;
  isOpen: boolean;
  isClosing: boolean;
};
export const usePopupStore = (options?: Partial<UIStoreOptions>) =>
  useUIStore(options ? createUIStore(options) : popupStore);

//path: src/stores/popup/popup.ts
