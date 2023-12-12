import { XIcon } from '@/components/illustrations';
import { Link } from '@/components/labs';
import { useBrowserStorage } from '@/hooks/useBrowserStorage';
import React, { HTMLAttributes } from 'react';
import { useCookieConsent } from '@/stores/ui';
import { Button } from '@/components/button';
type CookieConsentComponentProps = {
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
export const CookieConsentComponent = ({
  ...props
}: CookieConsentComponentProps) => {
  const {
    isOpen: open,
    show: showConsent,
    close: closeConsent,
  } = useCookieConsent();
  const [shouldShowConsentBox, setShouldShowConsentBox] = useBrowserStorage(
    'shouldShowConsentBox',
    true,
  );
  const [userHasAgreed, setUserHasAgreed] = useBrowserStorage(
    'userHasAgreed',
    false,
  );

  const handleConsent = () => {
    setUserHasAgreed(true);
    setShouldShowConsentBox(false);
  };

  const handleClose = () => {
    setShouldShowConsentBox(false);
  };

  return (
    <>
      {/* {shouldShowConsentBox && !userHasAgreed && (
        <>
        <DrawerComponent
        id={`consent`}
        side={DrawerSide.BOTTOM}
        isActive={open}
        // titleIcon={<InfoIcon/>}
        showAppLogo={false}
        title={`Select your cookie preferences`}
        showOverlay={false}
        onClose={closeConsent}>
          <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
            We use cookies to improve your experience.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleConsent}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              I Understand
            </button>
            </div>
          </DrawerComponent>
        
        
        </>
      )} */}
      <div className="text-base md:max-w-lg lg:max-w-2xl text-slate-700 dark:text-slate-300">
        <div className="space-y-4 flex flex-col">
          <p>
            {`We utilize cookies to enrich your experience, providing seamless
            access to captivating content aligned with your interests. By
            accepting, you enable personalized posts and recommendations. While
            opting out won't restrict access, it may limit tailored content. You
            can adjust preferences anytime in "Cookie Preferences." Learn more
            in our Privacy Policy.`}
          </p>

          <div className="flex space-x-3">
            <Button outlined type={'adaptive'}>
              Customise
            </Button>
            <Button type="adaptive" onClick={handleConsent}>
              Accept and continue{' '}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
