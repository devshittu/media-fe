import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ModalComponent } from './modal-component';
import { ModalProps } from './types';

class Modal {
  private id: string;
//   private type: ModalProps['type'];
  private size: ModalProps['size'];
  private title: ModalProps['title'];
  private noOverlay: ModalProps['noOverlay'];
  private children?: ModalProps['children'];
  private onClose?: ModalProps['onClose'];
  private container: HTMLElement;
  private root: Root;
  private isOpen: boolean;
  private elementContainer: HTMLElement | null = null;

  constructor({
  id,
  size = 'default',
  noOverlay = false,
  title,
  children,
  onClose
  }: ModalProps) {
    this.id = `modal-${Date.now().toString()}`;
    // this.type = type;
    // this.message = message;
    this.size = size;
    this.title = title;
    this.children = children;
    this.onClose = onClose;
    this.container = document.createElement('div');
    this.container.id = 'modal-container';
    document.body.append(this.container);
    this.root = createRoot(this.container);
    this.isOpen = false;
  }

  public open = () => {
    if (!this.isOpen) {
      this.isOpen = true;
      this.render();
    }
  };

  private render = () => {
    this.isOpen = true;
    this.elementContainer = document.createElement('div');
    this.container.appendChild(this.elementContainer);

    this.root.render(
      <ModalComponent
        id={this.id}
        size={this.size}
        title={this.title}
        onClose={this.close}
      >{this.children}</ModalComponent>
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

export default Modal;

// Path: src/components/blocks/modal/Modal.tsx
