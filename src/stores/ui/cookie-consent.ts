import { useEffect } from 'react';
import {
  UIContentComponent,
  createUIStore,
  useUIStore,
} from '../ui/hooks/uiStoreFactory';

const cookieConsentStore = createUIStore({
  initialIsOpen: true,
  closeDelay: 500,
  persist: true,
  storageType: 'session',
  name: 'cookieConsentStore',
});

export const useCookieConsentStore = () => useUIStore(cookieConsentStore);

// Path: src/stores/ui/cookie-consent.ts
