import { createUIStore, useUIStore } from '../ui/hooks/uiStoreFactory';

const cookieConsentStore = createUIStore({
  initialIsOpen: true,
  closeDelay: 500,
});

export const useCookieConsent = () => useUIStore(cookieConsentStore);
