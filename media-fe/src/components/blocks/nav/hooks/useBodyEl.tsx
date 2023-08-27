import { useEffect } from 'react';

export const useBodyClass = (bodyClass?: string) => {
  useEffect(() => {
    // document.body.classList = bodyClass;
  }, [bodyClass]);
};
export const useBodyStyle = (isNavOpen: boolean) => {
  useEffect(() => {
    isNavOpen
      ? (document.body.style.overflow = 'hidden')
      : document.body.style.removeProperty('overflow');
  }, [isNavOpen]);
};
