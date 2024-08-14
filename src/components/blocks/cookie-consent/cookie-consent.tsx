'use client';
import React, { useEffect } from 'react';
import { CookieConsentComponent } from './cookie-consent-component';
import { useCookieConsentStore } from '@/stores/ui/cookie-consent';
import { DrawerComponent, DrawerSide } from '../drawer';
import { InfoIcon } from '@/components/illustrations';

export const CookieConsent = () => {
  const {
    isOpen: open,
    show: showConsent,
    close: closeConsent,
  } = useCookieConsentStore();

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
              onClose={closeConsent}
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
