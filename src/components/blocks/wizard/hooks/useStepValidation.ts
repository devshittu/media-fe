import React, { useEffect, useState } from 'react';

export const useStepValidation = (
  validate: () => boolean,
  dependencies: any[],
  onValidationStatusChange?: (isValid: boolean) => void,
) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validationResult = validate();
    setIsValid(validationResult);
    onValidationStatusChange?.(validationResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return isValid;
};

//Path: src/components/blocks/wizard/hooks/useStepValidation.ts
