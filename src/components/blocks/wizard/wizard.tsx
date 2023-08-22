import React from 'react';
import WizardStep from './wizard-step';
import { Card, CardHeader, CardBody, CardFooter } from '../card';
import { Button } from '@/components/button';
import useWizard from './hook/useWizard'; // Assuming the useWizard hook is in the same directory
import { WizardProps } from './types';

const Wizard: React.FC<WizardProps> = ({ steps, onFinish }) => {
  const {
    state,
    currentStep,
    totalSteps,
    goToNextStep,
    goToPreviousStep,
    skipStep,
    finishWizard,
    isCurrentStepMandatory,
    isNextStepDisabled,
    isLastStep,
    renderCurrentStep,
  } = useWizard(steps, onFinish);

  return (
    <Card
      heading="My Card"
      description="This is a reusable card component."
      className=" !h-[calc(100%-1rem)]"
    >
      <CardHeader>
        Step {currentStep} of {totalSteps}
      </CardHeader>
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
