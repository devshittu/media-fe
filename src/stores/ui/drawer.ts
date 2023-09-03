import { createUIStore, useUIStore } from '../ui/hooks/uiStoreFactory';

const drawerStore = createUIStore({ closeDelay: 300 });

export const useDrawer = () => useUIStore(drawerStore);

//path: src/stores/ui/drawer.ts
