import React from 'react';

type WizardStepProps = {
  children: React.ReactNode;
  onFinish?: () => void;
};

const WizardStep = ({ children }: WizardStepProps) => {
  return (
    <section className="flex items-center justify-center w-full py-10 text-slate-800 dark:text-slate-400 ">
      {children}
    </section>
  );
};

export default WizardStep;

//path: src/components/blocks/wizard/wizard.tsx
