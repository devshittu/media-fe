import React from 'react';
import WizardStep from './wizard-step';
import { Button } from '@/components/button';
import useWizard from './hooks/useWizard'; // Assuming the useWizard hook is in the same directory
import { WizardProps } from './types';
import { usePopupContext } from '../popup';
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContainer,
  DialogHeader,
  DialogOverlay,
} from '../dialog';
import { useWizardContext } from './wizard-context';
import { ConditionalSessionWrapper } from '@/features/auth/components/session';

const WizardComponent = ({
  steps,
  onFinish,
  onClose,
  requiresSession = false,
}: WizardProps) => {
  const {
    loading,
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
  } = useWizard(steps, onFinish, onClose);
  console.log('Current step:', currentStep);

  const { isCurrentStepValid } = useWizardContext();

  const { setOpen } = usePopupContext();
  const canGoBack =
    steps[state.currentStep - 1 < 0 ? 0 : state.currentStep - 1]?.canComeBack ??
    true;
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    return setOpen(false); //close the popup from the usePopupContext which is the floating-ui/react library.
  };
  return (
    <ConditionalSessionWrapper requiresSession={requiresSession}>
      <Dialog>
        <DialogOverlay />
        <DialogContainer>
          <DialogHeader>
            <>
              <div className="flex justify-between items-center">
                <nav className="flex items-center space-x-2 md:space-x-4">
                  <>
                    <Button
                      id={`action-can-go-back`}
                      type="primary"
                      size="small"
                      rounded
                      disabled={!canGoBack || state.currentStep === 0}
                      onClick={goToPreviousStep}
                    >
                      Previous
                    </Button>

                    {isLastStep ? (
                      <Button
                        id={`action-finish`}
                        type="primary"
                        size="small"
                        rounded
                        disabled={!isLastStep}
                        onClick={finishWizard}
                      >
                        Finish
                      </Button>
                    ) : (
                      <>
                        {!isNextStepDisabled() && (
                          <Button
                            id={`action-next`}
                            type="primary"
                            size="small"
                            rounded
                            // disabled={
                            //   isNextStepDisabled() || isLastStep || loading
                            // }
                            disabled={
                              !isCurrentStepValid || isLastStep || loading
                            }
                            onClick={goToNextStep}
                            loading={loading}
                          >
                            Next
                          </Button>
                        )}
                        {!isCurrentStepMandatory && (
                          <Button
                            id={`action-skip`}
                            type="primary"
                            size="small"
                            rounded
                            disabled={isCurrentStepMandatory || isLastStep}
                            onClick={() =>
                              skipStep(state.currentStep.toString())
                            }
                          >
                            Skip
                          </Button>
                        )}
                      </>
                    )}
                  </>
                  <small className="ml-4 text-slate-600 dark:text-slate-400">
                    <span>{currentStep}</span> of <span>{totalSteps}</span>{' '}
                    steps
                  </small>
                </nav>
                <DialogCloseButton onClose={handleClose} />
              </div>
              <h1 className="text-2xl tracking-normal md:tracking-wide leading-6 md:leading-8 font-bold m-0 mt-5 text-slate-900 dark:text-slate-100">
                {steps[state.currentStep].title}
              </h1>
              <p className="font-mono text-sm md:text-base leading-5 font-bold m-0 mt-1 text-cyan-500 whitespace-pre-wrap">
                {steps[state.currentStep].subtitle}
              </p>
            </>
          </DialogHeader>
          <DialogBody>
            <WizardStep>
              <>
                {
                  renderCurrentStep()
                  // {onValidationStatusChange: setIsCurrentStepValid,}
                }
              </>
            </WizardStep>
          </DialogBody>
        </DialogContainer>
      </Dialog>
    </ConditionalSessionWrapper>
  );
};

export default WizardComponent;

//path: src/components/blocks/wizard/wizard-component.tsx
