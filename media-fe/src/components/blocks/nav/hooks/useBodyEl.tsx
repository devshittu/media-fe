import { useEffect } from 'react';

export const useBodyStyle = (isNavOpen: boolean, lockScroll: boolean) => {
  useEffect(() => {
    isNavOpen && lockScroll
      ? (document.body.style.overflow = 'hidden')
      : document.body.style.removeProperty('overflow');
  }, [isNavOpen, lockScroll]);
};
