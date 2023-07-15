import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { SplashLoaderComponent } from './splash-loader-component';
import { SplashLoaderClassProps, SplashLoaderProps } from './types';

class SplashLoader {
  private id: string;
  private container: HTMLElement;
  private children: SplashLoaderProps['children'];
  private onShow: SplashLoaderProps['onShow'];
  private onExit: SplashLoaderProps['onExit'];
  private root: Root;
  private isOpen: boolean;
  private elementContainer: HTMLElement | null = null;

  constructor({ id, children, onExit, onShow }: SplashLoaderClassProps) {
    this.id = id ? id : `splash-loader-${Date.now().toString()}`;
    this.container = document.createElement('div');
    this.onShow = onShow;
    this.onExit = onExit;
    this.root = createRoot(this.container);
    this.isOpen = false;
  }

  public open = () => {
    if (!this.isOpen) {
      this.isOpen = true;

      if (this.onShow) {
        this.onShow();
      }

      this.renderSplashLoader();
    }
  };

  private renderSplashLoader = () => {
    this.isOpen = true;
    this.elementContainer = document.createElement('div');
    this.container.appendChild(this.elementContainer);

    this.root.render(
      <SplashLoaderComponent
        id={this.id}
        isActive={this.isOpen}
        onExit={this.close}
      >
        {this.children}
      </SplashLoaderComponent>,
    );
  };

  public close = () => {
    if (this.isOpen) {
      this.isOpen = false;
      const splashElement = document.getElementById(this.id);
      const splashElementOverlay = document.getElementById(
        `${this.id}-dialog-overlay`,
      );
      const splashElementParent = splashElement?.parentNode as HTMLElement;
      if (splashElement) {
        splashElement.remove();
        splashElementOverlay?.remove();
        splashElementParent?.remove();
      }

      if (this.onExit) {
        this.onExit();
      }

      // Clean up the container from the DOM
      if (this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
    }
  };
}

export default SplashLoader;

// Path: src/components/blocks/modal/SplashLoader.tsx
