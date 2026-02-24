'use client';

import { create } from 'zustand';

interface SidebarStore {
  isExpanded: boolean;
  toggleSidebar: () => void;
  setExpanded: (expanded: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isExpanded: true,
  toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
  setExpanded: (expanded) => set({ isExpanded: expanded }),
}));
