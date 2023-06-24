import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { DrawerComponent } from './nav-drawer-bottom-component';
import { DrawerClassProps, DrawerProps } from './types';

class Drawer {
  private id: string;
  private titleIcon: DrawerProps['titleIcon'];
  private title: DrawerProps['title'];
  //   private side: DrawerProps['side'];
  private children?: DrawerProps['children'];
  private onClose?: DrawerProps['onClose'];
  private container: HTMLElement;
  private root: Root;
  private isOpen: boolean;
  private elementContainer: HTMLElement | null = null;

  constructor({ id, titleIcon, title, children, onClose }: DrawerClassProps) {
    this.id = id ? id : `drawer-${Date.now().toString()}`;
    this.titleIcon = titleIcon;
    this.title = title;
    this.children = children;
    this.onClose = onClose;
    this.container = document.createElement('div');
    this.root = createRoot(this.container);
    this.isOpen = false;
  }

  public open = () => {
    if (!this.isOpen) {
      this.isOpen = true;
      this.renderDrawer();
    }
  };

  private renderDrawer = () => {
    this.isOpen = true;
    this.elementContainer = document.createElement('div');
    this.container.appendChild(this.elementContainer);

    this.root.render(
      <DrawerComponent
        id={this.id}
        isActive={this.isOpen}
        titleIcon={this.titleIcon}
        title={this.title}
        onClose={this.close}
      >
        {this.children}
      </DrawerComponent>,
    );
  };
  public close = () => {
    if (this.isOpen) {
      this.isOpen = false;
      const drawerElement = document.getElementById(this.id);
      const drawerElementOverlay = document.getElementById(
        `${this.id}-drawer-overlay`,
      );
      const drawerElementParent = drawerElement?.parentNode as HTMLElement;

      setTimeout(() => {
        if (drawerElementOverlay && drawerElementOverlay.parentNode) {
          drawerElementOverlay.parentNode.removeChild(drawerElementOverlay);
        }
        if (drawerElementParent) {
          drawerElementParent.remove();
        }
      }, 300);
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

export default Drawer;

// Path: src/components/blocks/drawer/Drawer.tsx
