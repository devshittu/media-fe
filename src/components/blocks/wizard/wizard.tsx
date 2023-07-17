import { useReducer, useMemo } from 'react';
import WizardStep from './wizard-step';
import { Card, CardHeader, CardBody, CardFooter } from '../card';
import { Button } from '@/components/button';

type Step = {
  id: string;
  component: React.ReactNode;
  isMandatory?: boolean;
};

type WizardProps = {
  steps: Step[];
  onFinish?: () => void;
};

type WizardState = {
  currentStep: number;
  skippedSteps: string[];
};

type WizardAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'SKIP_STEP'; stepId: string }
  | { type: 'FINISH' };

const wizardReducer = (
  state: WizardState,
  action: WizardAction,
): WizardState => {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    case 'PREVIOUS_STEP':
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    case 'SKIP_STEP':
      return {
        ...state,
        currentStep: state.currentStep + 1,
        skippedSteps: [...state.skippedSteps, action.stepId],
      };
    case 'FINISH':
      return state; // No state changes needed for finishing
    default:
      return state;
  }
};

const Wizard: React.FC<WizardProps> = ({ steps, onFinish }) => {
  const initialState: WizardState = {
    currentStep: 0,
    skippedSteps: [],
  };

  const [state, dispatch] = useReducer(wizardReducer, initialState);

  const goToNextStep = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const goToPreviousStep = () => {
    dispatch({ type: 'PREVIOUS_STEP' });
  };

  const skipStep = (stepId: string) => {
    dispatch({ type: 'SKIP_STEP', stepId });
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
    const currentStepInfo = steps[state.currentStep];
    console.log('currentStepInfo', currentStepInfo, 'state', state);
    if (isCurrentStepMandatory) {
      // Check if mandatory step conditions are fulfilled
      // Replace this condition with your specific logic
      return false; // Allow proceeding to the next step
    }
    return false; // Allow skipping the step
  };

  const isLastStep = state.currentStep === steps.length - 1;

  const renderCurrentStep = () => {
    if (state.currentStep < steps.length) {
      const currentStepInfo = steps[state.currentStep];
      return currentStepInfo.component;
    }
    return null;
  };

  return (
    <Card
      heading="My Card"
      description="This is a reusable card component."
      className=" !h-[calc(100%-1rem)]"
    >
      <CardHeader>hi</CardHeader>
      <CardBody>
        <WizardStep>
          <div>{renderCurrentStep()}</div>
        </WizardStep>
      </CardBody>
      <CardFooter className="absolute bottom-0 left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">
        <div></div>
        <div className="flex gap-4">
          {state.currentStep > 0 && (
            <Button onClick={goToPreviousStep}>Previous</Button>
          )}

          {isLastStep ? (
            <Button onClick={finishWizard}>Finish</Button>
          ) : (
            // {state.currentStep < steps.length - 1 && (
            <>
              {!isNextStepDisabled() && (
                <Button onClick={goToNextStep}>Next</Button>
              )}
              {!isCurrentStepMandatory && (
                <Button onClick={() => skipStep(state.currentStep.toString())}>
                  Skip
                </Button>
              )}
            </>
            // )}
          )}
          {isLastStep && (
            <div>
              <h2>Skipped Steps:</h2>
              <ul>
                {state.skippedSteps.map((stepId) => (
                  <li key={stepId}>
                    Step {parseInt(stepId) + 1}{' '}
                    <Button onClick={() => skipStep(stepId)}>Skip</Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Wizard;

//path: src/components/blocks/wizard/wizard.tsx
