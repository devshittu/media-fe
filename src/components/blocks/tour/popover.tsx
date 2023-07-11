import { useState } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useClick,
  useInteractions,
  FloatingFocusManager,
  useId,
  Strategy,
  Placement,
} from '@floating-ui/react';
type PopoverProps = {
  strategy?: string;
  placement?: string;
  children: React.ReactNode;
};

const Popover = ({
  strategy: _strategy = 'absolute',
  placement: _placement = 'bottom',
  children,
}: PopoverProps) => {
  const [open, setOpen] = useState(false);

  const { x, y, refs, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
    strategy: _strategy as Strategy,
    placement: _placement as Placement,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const headingId = useId();

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()}>
        {_strategy} Trigger
      </button>
      {open && (
        <FloatingFocusManager context={context} modal={false}>
          {children ? (
            <>{children}</>
          ) : (
            <>
              <div
                className="Popover"
                ref={refs.setFloating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                }}
                aria-labelledby={headingId}
                {...getFloatingProps()}
              >
                <h2 id={headingId}>
                  (x: {Math.round(x || 0)}, y: {Math.round(y || 0)})
                </h2>
                <textarea placeholder="Write your review..." />
                <br />
                <button
                  style={{ float: 'right' }}
                  onClick={() => {
                    console.log('Added review.');
                    setOpen(false);
                  }}
                >
                  Add
                </button>
              </div>
            </>
          )}
        </FloatingFocusManager>
      )}
    </>
  );
};
export default Popover;
