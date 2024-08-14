'use client';
import React from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useHover,
  safePolygon,
} from '@floating-ui/react';
import { PopupOptions } from '../types';

export const usePopup = ({
  initialOpen = false,
  placement = 'bottom',
  modal = true,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  onHoverEnabled = false,
}: PopupOptions = {}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const [labelId, setLabelId] = React.useState<string | undefined>();
  const [descriptionId, setDescriptionId] = React.useState<
    string | undefined
  >();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        crossAxis: placement.includes('-'),
        fallbackAxisSideDirection: 'end',
        padding: 50,
      }),
      shift({
        padding: 5,
      }),
    ],
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context, {
    // outsidePress: false,
    // outsidePressEvent: 'mousedown',
    // escapeKey: false,
  });
  const role = useRole(context);

  const interactions = useInteractions([
    click,
    dismiss,
    role,
    useHover(context, {
      enabled: onHoverEnabled,
      // both open and close in ms
      delay: 100,
      // waits 150 ms once the user's cursor is at rest
      restMs: 150,
      handleClose: safePolygon({
        requireIntent: false,
      }),
    }),
    // useHover(context)
  ]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, modal, labelId, descriptionId],
  );
};

//Path: src/components/blocks/popup/hooks/usePopup.ts
