import { create } from 'zustand';
import type { Screen } from '../types/navigation';

interface NavigationStore {
  currentScreen: Screen;
  selectedPostId: string | null;
  setScreen: (screen: Screen) => void;
  setSelectedPostId: (postId: string | null) => void;
  goToDetail: (postId: string) => void;
  goBackFromDetail: () => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentScreen: 'splash',
  selectedPostId: null,

  setScreen: (screen) => set({ currentScreen: screen }),
  setSelectedPostId: (postId) => set({ selectedPostId: postId }),

  goToDetail: (postId) => set({
    selectedPostId: postId,
    currentScreen: 'detail',
  }),

  goBackFromDetail: () => set({ currentScreen: 'home' }),
}));
