import { createStore, useStore } from 'zustand';

import { uid } from '@/utils/uid';
import { ToastType } from '@/components/blocks/toast';
import { AttentionType } from '@/types';

// export enum PromptType {
//   SUCCESS = ToastType.SUCCESS,
//   ERROR = ToastType.ERROR,
//   WARNING = ToastType.WARNING,
//   INFO = ToastType.INFO,
// }

export type Prompt = {
  id: string;
  type: AttentionType;
  title: string;
  duration?: number;
  message: string;
  onOk: () => void;
  onOkComplete?: () => void;
  onCancel?: () => void;
};
export type PromptsStore = {
  // prompts: Prompt[];
  prompt: Prompt;
  showPrompt: (prompt: Omit<Prompt, 'id'>) => void;
  dismissPrompt: (id: string) => void;
};

export const promptsStore = createStore<PromptsStore>((set, get) => ({
  // prompts: [],
  prompt: {} as Prompt,
  showPrompt: (prompt: Omit<Prompt, 'id'>) => {
    const id = uid();
    set((state) => ({
      // prompts: [...state.prompts, { ...prompt, id }],
      prompt: { ...prompt, id },
    }));
    if (prompt.duration) {
      setTimeout(() => {
        get().dismissPrompt(id);
      }, prompt.duration);
    }
  },
  dismissPrompt: (id) => {
    set((state) => ({
      // prompts: state.prompts.filter(
      //   (prompt) => prompt.id !== id,
      // ),
      prompt: undefined,
    }));
  },
}));

export const usePrompts = () => useStore(promptsStore);

//Path: src/stores/prompts/prompts.ts
