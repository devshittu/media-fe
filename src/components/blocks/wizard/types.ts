export type StepProps = {
  onValidationStatusChange?: (isValid: boolean) => void;
};

export type Step = {
  id: string;
  title?: string;
  subtitle?: string;
  component: React.ReactNode;
  // component: (props: StepProps) => React.ReactElement;
  isMandatory?: boolean; //To disable skip button
  onNext?: () => Promise<void> | void;
  onPrevious?: () => Promise<void> | void;
  onSkip?: () => Promise<void> | void;
  canComeBack?: boolean; //To return back to the step from the next step
};

export type WizardProps = {
  steps: Step[];
  onFinish?: () => void;
  onClose?: () => void;
  requiresSession?: boolean;
};
