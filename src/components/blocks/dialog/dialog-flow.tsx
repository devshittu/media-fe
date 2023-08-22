import React from 'react';
import useWizard from '../wizard/hook/useWizard';
import { usePopupContext } from '../popup';
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogContainer,
  DialogHeader,
  DialogOverlay,
} from './';
import { Button } from '@/components/button';
import WizardStep from '../wizard/wizard-step';
import { WizardProps } from '../wizard/types';

export const DialogFlow = ({ steps, onFinish }: WizardProps) => {
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
  } = useWizard(steps, onFinish);

  const { setOpen } = usePopupContext();
  const canGoBack =
    steps[state.currentStep - 1 < 0 ? 0 : state.currentStep - 1]?.canComeBack ??
    true;
  const onClose = () => {
    return setOpen(false);
  };
  return (
    <Dialog>
      <DialogOverlay />
      <DialogContainer>
        <DialogHeader>
          <>
            <div className="flex justify-between items-center">
              <nav className="flex items-center space-x-2 md:space-x-4">
                <>
                  {/* {state.currentStep > 0 && ( */}
                  <Button
                    type="primary"
                    size="small"
                    rounded
                    disabled={!canGoBack || state.currentStep === 0}
                    onClick={goToPreviousStep}
                  >
                    Previous
                  </Button>
                  {/* )} */}

                  {isLastStep ? (
                    <Button
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
                          type="primary"
                          size="small"
                          rounded
                          disabled={
                            isNextStepDisabled() || isLastStep || loading
                          }
                          onClick={goToNextStep}
                          loading={loading}
                        >
                          Next
                        </Button>
                      )}
                      {!isCurrentStepMandatory && (
                        <Button
                          type="primary"
                          size="small"
                          rounded
                          disabled={isCurrentStepMandatory || isLastStep}
                          onClick={() => skipStep(state.currentStep.toString())}
                        >
                          Skip
                        </Button>
                      )}
                    </>
                  )}
                </>
                <small className="ml-4 text-slate-600 dark:text-slate-400">
                  <span>{currentStep}</span> of <span>{totalSteps}</span> steps
                </small>
              </nav>
              <DialogCloseButton onClose={onClose} />
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
            <div>{renderCurrentStep()}</div>
          </WizardStep>
        </DialogBody>
      </DialogContainer>
    </Dialog>
  );
};
