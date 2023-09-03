import { useState } from 'react';

export const useToggle = (initialState: boolean = false) => {
  const [isVisible, setIsVisible] = useState(initialState);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const setElementVisibility = (visible: boolean) => {
    setIsVisible(visible);
  };

  return {
    isVisible,
    toggleVisibility,
    setElementVisibility,
  };
};
