// Importing utility functions and Zustand library
import { DeepPartial, updateDeep } from '@/utils';
import { createStore } from 'zustand';

// Define the generic type for the Zustand store
type AppSettingsState<T> = {
  defaultSettings: T; // The initial settings
  modifiedSettings: T; // The settings that can be modified
  setDefaultSettings: (settings: T) => void; // Function to set the initial settings
  setModifiedSettings: (settings: T) => void; // Function to set the modified settings
  updateModifiedSettings: (path: string[], value: any) => void; // Function to update a specific setting
  getChanges: () => Partial<T>; // Function to get the changes made to the settings
};

// Create the Zustand store
export const createAppSettingsStore = <T extends Record<string, any>>() => {
  return createStore<AppSettingsState<T>>((set, get) => ({
    // Initialize default and modified settings as empty objects
    defaultSettings: {} as T,
    modifiedSettings: {} as T,

    // Function to set both default and modified settings
    setDefaultSettings: (settings) =>
      set({ defaultSettings: settings, modifiedSettings: settings }),

    // Function to set only the modified settings
    setModifiedSettings: (settings) => set({ modifiedSettings: settings }),

    // Function to update a specific setting by its path

    updateModifiedSettings: (path, value) => {
      set((state) => {
        // Create a nested update object based on the path
        let update: any = value;
        for (let i = path.length - 1; i >= 0; i--) {
          update = { [path[i]]: update };
        }

        // Use the updateDeep function to deeply update the modifiedSettings
        const updatedSettings = updateDeep(
          state.modifiedSettings,
          update as DeepPartial<T>,
        );
        // Return the updated modifiedSettings
        return { modifiedSettings: updatedSettings };
      });
    },

    // Function to get the changes made to the settings
    getChanges: () => {
      const state = get();
      const changes: Partial<T> = {};
      // Logic to compare `state.defaultSettings` and `state.modifiedSettings` and populate `changes`
      return changes;
    },
  }));
};
// Path: src/stores/wizard/wizard.ts
