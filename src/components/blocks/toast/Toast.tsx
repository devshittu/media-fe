import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot, Root } from 'react-dom/client';
import { ToastComponent } from './toast-component';
import { ToastProps } from './types';

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

  constructor({
    message,
    position,
    type,
    onClose,
    duration = 3000,
  }: ToastProps) {
    this.id = `toast-${Date.now().toString()}`;
    this.type = type;
    this.position = position;
    this.message = message;
    this.duration = duration;
    this.onClose = onClose;
    this.container = document.createElement('div');
    // document.body.appendChild(this.container);
    document.body.append(this.container);
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
    const closeToast = () => {
      this.close();
    };

    this.root.render(
      <ToastComponent
        id={this.id}
        type={this.type}
        message={this.message}
        position={this.position}
        duration={this.duration}
        onClose={this.onClose || closeToast}
      />,
    );
  };

  public close = () => {
    if (this.isOpen) {
      this.isOpen = false;
      const toastElement = document.getElementById(this.id);
      if (toastElement) {
        this.root.unmount();
        toastElement.remove();
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
