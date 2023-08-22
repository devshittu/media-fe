export type Step = {
  id: string;
  title?: string;
  subtitle?: string;
  component: React.ReactNode;
  isMandatory?: boolean; //To disable skip button
  onNext?: () => Promise<void> | void;
  onPrevious?: () => Promise<void> | void;
  onSkip?: () => Promise<void> | void;
  canComeBack?: boolean; //To return back to the step from the next step
};

export type WizardProps = {
  steps: Step[];
  onFinish?: () => void;
};
