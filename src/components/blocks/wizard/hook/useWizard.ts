// useWizard.ts
import { useReducer, useMemo } from 'react';

enum WizardActionType {
  NEXT_STEP = 'NEXT_STEP',
  PREVIOUS_STEP = 'PREVIOUS_STEP',
  SKIP_STEP = 'SKIP_STEP',
  FINISH = 'FINISH',
}

type Step = {
  id: string;
  component: React.ReactNode;
  isMandatory?: boolean;
};

type WizardState = {
  currentStep: number;
  skippedSteps: string[];
};

type WizardAction =
  | { type: WizardActionType.NEXT_STEP }
  | { type: WizardActionType.PREVIOUS_STEP }
  | { type: WizardActionType.SKIP_STEP; stepId: string }
  | { type: WizardActionType.FINISH };

const wizardReducer = (
  state: WizardState,
  action: WizardAction,
): WizardState => {
  switch (action.type) {
    case WizardActionType.NEXT_STEP:
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case WizardActionType.PREVIOUS_STEP:
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    case WizardActionType.SKIP_STEP:
      return {
        ...state,
        currentStep: state.currentStep + 1,
        skippedSteps: [...state.skippedSteps, action.stepId],
      };
    case WizardActionType.FINISH:
      return state;
    default:
      return state;
  }
};

const useWizard = (steps: Step[], onFinish?: () => void) => {
  const initialState: WizardState = {
    currentStep: 0,
    skippedSteps: [],
  };

  const [state, dispatch] = useReducer(wizardReducer, initialState);

  const goToNextStep = () => {
    dispatch({ type: WizardActionType.NEXT_STEP });
  };

  const goToPreviousStep = () => {
    dispatch({ type: WizardActionType.PREVIOUS_STEP });
  };

  const skipStep = (stepId: string) => {
    dispatch({ type: WizardActionType.SKIP_STEP, stepId });
  };

  const finishWizard = () => {
    if (onFinish) {
      onFinish();
    }
  };

  const isCurrentStepMandatory = useMemo(
    () => steps[state.currentStep]?.isMandatory ?? false,
    [steps, state.currentStep],
  );

  const isNextStepDisabled = () => {
    if (isCurrentStepMandatory) {
      return false;
    }
    return false;
  };

  const isLastStep = state.currentStep === steps.length - 1;

  const renderCurrentStep = () => {
    if (state.currentStep < steps.length) {
      const currentStepInfo = steps[state.currentStep];
      return currentStepInfo.component;
    }
    return null;
  };

  return {
    state,
    currentStep: state.currentStep + 1, // +1 because we want to show it as 1-based index
    totalSteps: steps.length,
    goToNextStep,
    goToPreviousStep,
    skipStep,
    finishWizard,
    isCurrentStepMandatory,
    isNextStepDisabled,
    isLastStep,
    renderCurrentStep,
  };
};

export default useWizard;
