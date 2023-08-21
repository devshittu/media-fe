import * as React from 'react';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
  FloatingOverlay,
  useId,
} from '@floating-ui/react';
import { Dialog } from '../dialog';

interface PopupOptions {
  initialOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const usePopup = ({
  initialOpen = false,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: PopupOptions = {}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const [labelId, setLabelId] = React.useState<string | undefined>();
  const [descriptionId, setDescriptionId] = React.useState<
    string | undefined
  >();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    open,
    onOpenChange: setOpen,
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, labelId, descriptionId],
  );
};

type ContextType =
  | (ReturnType<typeof usePopup> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
      setDescriptionId: React.Dispatch<
        React.SetStateAction<string | undefined>
      >;
    })
  | null;

const PopupContext = React.createContext<ContextType>(null);

export const usePopupContext = () => {
  const context = React.useContext(PopupContext);

  if (context == null) {
    throw new Error('Popup components must be wrapped in <Popup />');
  }

  return context;
};

export const Popup: React.FC<
  {
    children: React.ReactNode;
  } & PopupOptions
> = ({ children, ...options }) => {
  const dialog = usePopup(options);
  return (
    <PopupContext.Provider value={dialog}>{children}</PopupContext.Provider>
  );
};

interface PopupTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const PopupTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & PopupTriggerProps
>((props, propRef) => {
  const { children, asChild = false, ...rest } = props;
  const context = usePopupContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...rest,
        ...children.props,
        'data-state': context.open ? 'open' : 'closed',
      }),
    );
  }

  return (
    <button
      ref={ref}
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(rest)}
    >
      {children}
    </button>
  );
});
PopupTrigger.displayName = 'PopupTrigger';

export const PopupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, propRef) => {
  const { context: floatingContext, ...context } = usePopupContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      <FloatingOverlay lockScroll>
        <FloatingFocusManager context={floatingContext}>
          <div
            ref={ref}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            {...context.getFloatingProps(props)}
          >
            {props.children}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
});
PopupContent.displayName = 'PopupContent';

export const PopupHeading = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLProps<HTMLHeadingElement>
>((props, ref) => {
  const { setLabelId } = usePopupContext();
  const id = useId();

  React.useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return (
    <h2 {...props} ref={ref} id={id}>
      {props.children}
    </h2>
  );
});
PopupHeading.displayName = 'PopupHeading';

export const PopupDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLProps<HTMLParagraphElement>
>((props, ref) => {
  const { setDescriptionId } = usePopupContext();
  const id = useId();

  React.useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return (
    <p {...props} ref={ref} id={id}>
      {props.children}
    </p>
  );
});
PopupDescription.displayName = 'Popup Description';

// export const PopupClose = React.forwardRef<
//   HTMLButtonElement,
//   React.ButtonHTMLAttributes<HTMLButtonElement>
// >((props, ref) => {
//   const { setOpen } = usePopupContext();
//   return (
//     <button type="button" {...props} ref={ref} onClick={() => setOpen(false)} />
//   );
// });
// PopupClose.displayName = 'PopupClose';

//Path: src/components/blocks/popup/popup.tsx
