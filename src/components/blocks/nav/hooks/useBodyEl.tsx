import { useEffect } from 'react';

export const useBodyClass = (bodyClass?: string) => {
  useEffect(() => {
    // document.body.classList = bodyClass;
  }, [bodyClass]);
};
export const useBodyStyle = (isNavOpen: boolean) => {
  useEffect(() => {
    isNavOpen
      ? (document.body.style.overflowY = 'hidden')
      : document.body.style.removeProperty('overflow-y');
  }, [isNavOpen]);
};
