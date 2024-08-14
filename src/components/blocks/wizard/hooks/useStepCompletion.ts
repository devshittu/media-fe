'use client';
import { useState, useEffect } from 'react';

// Define a TypeScript type for the hook parameters
interface UseCompletionProps {
  // trigger: any;
  onCompleted?: () => Promise<void> | void;
  initialValue?: boolean;
}

// Hook signature with typed props
export const useStepCompletion = ({
  // trigger,
  onCompleted,
  initialValue = false,
}: UseCompletionProps): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const [isCompleted, setIsCompleted] = useState(initialValue);

  useEffect(() => {
    const handleCompletion = async () => {
      // Execute the provided onCompleted function, if any
      if (onCompleted) {
        await onCompleted();
      }
      setIsCompleted(true);
    };

    // if (trigger) {
    handleCompletion();
    // }
    // Reset isCompleted to false when the component using this hook unmounts
    return () => {
      setIsCompleted(false);
    };
  }, [onCompleted]); //trigger

  return [isCompleted, setIsCompleted];
};
