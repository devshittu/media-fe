'use client';
import { useReducer, useEffect, useState } from 'react';
import { Step, StepProps } from '../types';
import { useWizardContext } from '../wizard-context';

enum WizardActionType {
  NEXT_STEP = 'NEXT_STEP',
  PREVIOUS_STEP = 'PREVIOUS_STEP',
  SKIP_STEP = 'SKIP_STEP',
  FINISH = 'FINISH',
}

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
      console.log('New state:', state);
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

const useWizard = (
  steps: Step[],
  onFinish?: () => void,
  onClose?: () => void,
) => {
  const initialState: WizardState = {
    currentStep: 0,
    skippedSteps: [],
  };
  const [skippedStepId, setSkippedStepId] = useState<string | null>(null);

  const [state, dispatch] = useReducer(wizardReducer, initialState);
  const [action, setAction] = useState<null | 'next' | 'previous' | 'skip'>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const goToNextStep = () => {
    console.log('Going to next step');
    setAction('next');
  };

  const goToPreviousStep = () => {
    setAction('previous');
  };

  const skipStep = (stepId: string) => {
    setAction('skip');
    // You can store the stepId in a state variable to access it in the useEffect
    setSkippedStepId(stepId);
  };

  const finishWizard = async () => {
    if (onFinish) {
      await onFinish();
    }
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const performAction = async () => {
      if (action) {
        setLoading(true);
        const currentStep = steps[state.currentStep];
        if (action === 'next') {
          console.log('Action changed:', action);
          try {
            // if (beforeNext) {
            //   await beforeNext();
            // }
            // logic for moving to the next step
            if (currentStep.onNext) {
              await currentStep.onNext();
            }
            dispatch({ type: WizardActionType.NEXT_STEP });
          } catch (e: any) {
            // setWizardError(new Error(e));
          }
        } else if (action === 'previous') {
          if (currentStep.onPrevious) {
            await currentStep.onPrevious();
          }
          dispatch({ type: WizardActionType.PREVIOUS_STEP });
        } else if (action === 'skip' && skippedStepId) {
          if (currentStep.onSkip) {
            await currentStep.onSkip();
          }
          dispatch({ type: WizardActionType.SKIP_STEP, stepId: skippedStepId });
          setSkippedStepId(null); // Reset the skippedStepId
        }
        setAction(null); // Reset the action
        setLoading(false);
      }
    };

    performAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, state.currentStep, skippedStepId]);

  const isCurrentStepMandatory = steps[state.currentStep]?.isMandatory ?? false;

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
  // const renderCurrentStep = (props: StepProps) => {
  //   if (state.currentStep < steps.length) {
  //     const currentStepInfo = steps[state.currentStep];
  //     const CurrentComponent: React.ComponentType<StepProps> =
  //       currentStepInfo.component;
  //     return <CurrentComponent {...props} />;
  //   }
  //   return null;
  // };
  // const renderCurrentStep = (props: StepProps) => {
  //   if (state.currentStep < steps.length) {
  //     const currentStepInfo = steps[state.currentStep];
  //     return currentStepInfo.component(props);
  //   }
  //   return null;
  // };

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
    loading, // Added loading state
  };
};

export default useWizard;

//Path: src/components/blocks/wizard/hook/useWizard.ts
