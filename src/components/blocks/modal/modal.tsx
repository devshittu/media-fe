import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ModalComponent } from './modal-component';
import { ModalClassProps, ModalProps } from './types';

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
    onClose,
  }: ModalClassProps) {
    this.id = id ? id : `modal-${Date.now().toString()}`;
    this.size = size;
    this.title = title;
    this.children = children;
    this.noOverlay = noOverlay;
    this.onClose = onClose;
    this.container = document.createElement('div');
    this.root = createRoot(this.container);
    this.isOpen = false;
  }

  public open = () => {
    if (!this.isOpen) {
      this.isOpen = true;
      this.renderModal();
    }
  };

  private renderModal = () => {
    this.isOpen = true;
    this.elementContainer = document.createElement('div');
    this.container.appendChild(this.elementContainer);

    this.root.render(
      <ModalComponent
        id={this.id}
        isActive={this.isOpen}
        size={this.size}
        title={this.title}
        onClose={this.close}
        noOverlay={this.noOverlay}
      >
        {this.children}
      </ModalComponent>,
    );
  };

  public close = () => {
    if (this.isOpen) {
      this.isOpen = false;
      const modalElement = document.getElementById(this.id);
      const modalElementOverlay = document.getElementById(
        `${this.id}-dialog-overlay`,
      );
      const modalElementParent = modalElement?.parentNode as HTMLElement;
      if (modalElement) {
        modalElement.remove();
        modalElementOverlay?.remove();
        modalElementParent?.remove();
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
