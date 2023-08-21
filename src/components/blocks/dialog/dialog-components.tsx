import React, { useEffect, useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Icon,
  SkipForwardIcon,
  XIcon,
} from '@/components/illustrations';
import {
  Popup,
  PopupContent,
  PopupDescription,
  PopupHeading,
  PopupTrigger,
  usePopupContext,
} from '../popup/popup-components';
import { Button } from '@/components/button';
import { useId } from '@floating-ui/react';
import useWizard from '../wizard/hook/useWizard';
import { WizardProps } from '../wizard';
import WizardStep from '../wizard/wizard-step';
type Navigation = {
  icon: React.ReactElement;
  onClick: () => void;
  title?: string;
  disabled?: boolean;
  show?: boolean;
};
type NavigationButtonProps = {
  icon: React.ReactElement;
  disabled?: boolean;
  onClick: () => void;
};

const NavigationButton: React.FC<NavigationButtonProps> = ({
  icon,
  disabled = false,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center w-8 h-8 text-cyan-500 bg-cyan-100 first:rounded-l-lg last:rounded-r-lg ${
      disabled
        ? 'disabled:bg-cyan-200 disabled:text-cyan-300 disabled:cursor-not-allowed'
        : ''
    } `}
    disabled={disabled}
  >
    {''}
    <Icon icon={icon} className="w-6" />
  </button>
);
type NavigationGroupProps = React.HTMLProps<HTMLDivElement> & {
  navigationItems: Navigation[];
  children?: React.ReactNode;
};
const NavigationGroup = React.forwardRef<HTMLDivElement, NavigationGroupProps>(
  ({ children, navigationItems, ...props }: NavigationGroupProps, ref) => (
    <div className="flex space-x-2" ref={ref} {...props}>
      {children
        ? children
        : navigationItems.map(
            (nav, index) =>
              (nav.show === undefined || nav.show) && ( // Added this condition
                <NavigationButton
                  key={index}
                  icon={nav.icon}
                  onClick={nav.onClick}
                  disabled={nav.disabled}
                />
              ),
          )}
    </div>
  ),
);
NavigationGroup.displayName = 'NavigationGroup';

type CloseButtonProps = React.HTMLProps<HTMLButtonElement> & {
  onClose?: () => void;
};
const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ onClose, ...props }, ref) => (
    <button
      onClick={onClose}
      className="p-0 bg-transparent opacity-40 hover:opacity-70"
      ref={ref}
      {...props}
    >
      {''}
      <Icon icon={<XIcon />} className="w-6" />
    </button>
  ),
);
CloseButton.displayName = 'Close Button';

type DialogOverlayProps = React.HTMLProps<HTMLDivElement> & {};

const DialogOverlay = React.forwardRef<HTMLDivElement, DialogOverlayProps>(
  (props, ref) => (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80  pointer-events-auto z-[-1]"
      data-app-dialog-backdrop="true"
      ref={ref}
      {...props}
    ></div>
  ),
);
DialogOverlay.displayName = 'Dialog Overlay';

type DialogHeaderProps = React.HTMLProps<HTMLDivElement> & {
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  children?: React.ReactNode;
  navigationItems?: Navigation[];
  currentStep?: number;
  totalSteps?: number;
};

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  (
    {
      title = 'Step Title',
      subtitle = 'Flash message',
      onClose,
      children,
      navigationItems = [],
      currentStep = 1,
      totalSteps = 1,
      ...props
    },
    ref,
  ) => {
    return (
      <header className="flex-shrink-0 mb-4" ref={ref} {...props}>
        {children ? (
          children
        ) : (
          <>
            <div className="flex justify-between items-center">
              <nav className="flex items-center space-x-2">
                {navigationItems.length > 0 && (
                  <NavigationGroup navigationItems={navigationItems} />
                )}
                <small className="ml-4 text-slate-600 dark:text-slate-400">
                  <span>{currentStep}</span> of <span>{totalSteps}</span> steps
                </small>
              </nav>
              <CloseButton onClose={onClose} />
            </div>
            <h1 className="text-xl leading-6 font-bold m-0 mt-5 text-slate-900 dark:text-slate-100">
              {title}
            </h1>
            <p className="font-mono text-sm leading-5 font-bold m-0 mt-1 text-cyan-500 whitespace-pre-wrap">
              {subtitle}
            </p>
          </>
        )}
      </header>
    );
  },
);

DialogHeader.displayName = 'DialogHeader';

type DialogBodyProps = React.HTMLProps<HTMLDivElement> & {
  children: React.ReactNode;
};

const DialogBody = React.forwardRef<HTMLDivElement, DialogBodyProps>(
  (props, ref) => {
    return (
      <div className="relative flex-auto" ref={ref} {...props}>
        <h5 className="mt-0 font-medium leading-relaxed text-xl mb-2">
          Body Title
        </h5>
        <div>{props.children}</div>
      </div>
    );
  },
);

DialogBody.displayName = 'DialogBody';

type DialogContainerProps = React.HTMLProps<HTMLDivElement> & {
  rounded?: boolean;
};

const DialogContainer = React.forwardRef<HTMLDivElement, DialogContainerProps>(
  ({ rounded, children, ...props }, ref) => {
    return (
      <div
        className={`flex flex-col w-full mx-auto outline-none bg-slate-50 dark:bg-slate-950 max-h-[calc(100%-56px)] overflow-y-hidden shadow-lg max-w-4xl ${
          rounded ? 'rounded-2xl' : ''
        } z-[9999]`}
        data-app-dialog="true"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="app__container_errors_label"
        aria-describedby="app__container_errors_desc"
        aria-modal="true"
        ref={ref}
        {...props}
      >
        <div className="relative border-cyan-500 dark:border-cyan-700 border-t-8 after:absolute after:top-0 after:right-0 after:w-full after:z-10 after:border-t after:border-transparent"></div>
        <div
          className="overflow-y-auto border-0 m-0 py-5 px-4 h-full flex flex-col"
          data-app-dialog-content="true"
        >
          {children}
        </div>
      </div>
    );
  },
);

DialogContainer.displayName = 'DialogContainer';

type DialogProps = {
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  rounded?: boolean;
  children?: React.ReactNode;
};

export const Dialog: React.FC<DialogProps> = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  const { setLabelId } = usePopupContext();
  const id = useId();

  React.useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return (
    <div
      {...props}
      className="fixed top-0 right-0 bottom-0 left-0 overflow-auto z-50 flex flex-col items-center content-center pt-[15px] px-[15px] h-[calc(100%-15px)] md:p-4 lg:pt-[10vh]"
      data-app-dialog-overlay="true"
      ref={ref}
      id={id}
    >
      {props.children}
    </div>
  );
});
Dialog.displayName = 'Dialog';

export const DialogSampleUsage = () => {
  const navigationItems: Navigation[] = [
    {
      icon: <ChevronLeftIcon />,
      title: 'Previous',
      onClick: () => {
        console.log('Clicked Previous');
      },
      disabled: false,
      show: true,
    },
    {
      icon: <SkipForwardIcon />,
      title: 'Skip',
      onClick: () => {
        console.log('Clicked Skip');
      },
      disabled: true,
      show: true,
    },
    {
      icon: <ChevronRightIcon />,
      title: 'Next',
      onClick: () => {
        console.log('Clicked Next');
      },
      disabled: false,
      show: true,
    },
  ];
  const { setOpen } = usePopupContext();
  const onClose = () => {
    return setOpen(false);
  };
  return (
    <Dialog>
      <DialogOverlay />
      <DialogContainer>
        <DialogHeader
          title={'Sample title'}
          subtitle={'subtitle'}
          onClose={onClose}
          navigationItems={navigationItems}
        />
        <DialogBody>
          {/* {children} */}
          Sample body
          {/* <PopupDialog/> */}
        </DialogBody>
      </DialogContainer>
    </Dialog>
  );
};

export const DialogFlow = ({ steps, onFinish }: WizardProps) => {
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

  const { setOpen } = usePopupContext();
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
                    disabled={!(state.currentStep > 0)}
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
                          disabled={isNextStepDisabled() || isLastStep}
                          onClick={goToNextStep}
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
              <CloseButton onClose={onClose} />
            </div>
            <h1 className="text-xl leading-6 font-bold m-0 mt-5 text-slate-900 dark:text-slate-100">
              {steps[state.currentStep].title}
            </h1>
            <p className="font-mono text-sm leading-5 font-bold m-0 mt-1 text-cyan-500 whitespace-pre-wrap">
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

export const ControlledPopup = ({ children }: FlowPopupProps) => {
  return (
    <Popup>
      <PopupTrigger>
        {/* <Button type={'primary'}> */}
        My trigger
      </PopupTrigger>
      {/* <PopupTrigger>My trigger</PopupTrigger> */}
      <PopupContent className="Popup">
        {/* <DialogFlow steps={steps} onFinish={handleFinish} /> */}
        {children}
      </PopupContent>
    </Popup>
  );
};

type FlowPopupProps = {
  children: React.ReactNode;
};
type FlowPopupControlledProps = FlowPopupProps & {
  initOpen?: boolean;
};
export const UncontrolledPopup = ({
  initOpen = false,
  children,
}: FlowPopupControlledProps) => {
  const [open, setOpen] = useState(initOpen);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <Popup open={open} onOpenChange={setOpen}>
      <PopupContent className="Popup">
        {children}
      </PopupContent>
    </Popup>
  );
};

//Path: src/components/blocks/dialog/dialog-components.tsx
