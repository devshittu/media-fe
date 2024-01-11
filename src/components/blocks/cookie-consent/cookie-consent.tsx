import React, { useEffect } from 'react';
import { CookieConsentComponent } from './cookie-consent-component';
import { useCookieConsent } from '@/stores/ui/cookie-consent';
import { DrawerComponent, DrawerSide } from '../drawer';
import { InfoIcon } from '@/components/illustrations';

export const CookieConsent = () => {
  const {
    isOpen: open,
    show: showConsent,
    close: closeConsent,
  } = useCookieConsent();

  return (
    <>
      {open && (
        <>
          <DrawerComponent
            id={`consent`}
            side={DrawerSide.BOTTOM}
            isActive={open}
            // titleIcon={<InfoIcon/>}
            showAppLogo={false}
            title={`Select your cookie preferences`}
            showOverlay={false}
            onClose={closeConsent}
            lockScroll={false}
          >
            <CookieConsentComponent
              id={'cookie-consent'}
              // isActive={open}
              // onExit={stopSplashLoader}
            />
          </DrawerComponent>
        </>
      )}
    </>
  );
};

// Path: src/components/blocks/cookie-consent/cookie-consent.tsx
