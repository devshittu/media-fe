'use client';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ToastComponent } from './toast-component';
import { ToastClassProps, ToastProps } from './types';

class Toast {
  private id: string;
  private type: ToastProps['type'];
  private position: ToastProps['position'];
  private message: ToastProps['message'];
  private duration: ToastProps['duration'];
  private onClose?: ToastProps['onClose'];
  private container: HTMLElement;
  private root: Root;
  private isOpen: boolean;
  private elementContainer: HTMLElement | null = null;

  constructor({
    message,
    position,
    type,
    onClose,
    duration = 3000,
  }: ToastClassProps) {
    this.id = `toast-${Date.now().toString()}`;
    this.type = type;
    this.position = position;
    this.message = message;
    this.duration = duration;
    this.onClose = onClose;
    this.container = document.createElement('div');
    this.root = createRoot(this.container);
    this.isOpen = false;
  }

  public open = () => {
    if (!this.isOpen) {
      this.isOpen = true;
      this.renderToast();
    }
  };

  private renderToast = () => {
    this.isOpen = true;
    this.elementContainer = document.createElement('div');
    this.container.appendChild(this.elementContainer);

    this.root.render(
      <ToastComponent
        id={this.id}
        isActive={this.isOpen}
        type={this.type}
        message={this.message}
        position={this.position}
        duration={this.duration}
        onClose={this.close}
      />,
    );
  };

  public close = () => {
    if (this.isOpen) {
      this.isOpen = false;
      const toastElement = document.getElementById(this.id);
      const toastElementParent = toastElement?.parentNode as HTMLElement;

      if (toastElement) {
        // this.root.unmount();
        toastElement.remove();
        toastElementParent?.remove();
      }

      if (this.onClose) {
        this.onClose();
      }

      // Clean up the container from the DOM
      if (this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
    }
  };
}

export default Toast;

// Path: src/components/blocks/toast/Toast.tsx
