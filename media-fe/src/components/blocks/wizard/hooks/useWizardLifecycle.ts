import { useEffect } from 'react';
import { useWizardContext } from '../wizard-context';

export const useBeforeNext = (fn: () => Promise<void>) => {
  //   const { setBeforeNext } = useWizardContext();
  useEffect(() => {
    // setBeforeNext(fn);
  }, [, fn]);
};
//Path: src/components/blocks/wizard/hooks/useWizardLifecycle.ts
