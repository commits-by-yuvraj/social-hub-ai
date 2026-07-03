import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  collapsed: boolean
  mobileOpen: boolean
  aiPanelOpen: boolean
  toggleCollapsed: () => void
  setCollapsed: (value: boolean) => void
  openMobile: () => void
  closeMobile: () => void
  toggleMobile: () => void
  openAIPanel: () => void
  closeAIPanel: () => void
  toggleAIPanel: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      collapsed: false,
      mobileOpen: false,
      aiPanelOpen: false,
      toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
      setCollapsed: (value) => set({ collapsed: value }),
      openMobile: () => set({ mobileOpen: true }),
      closeMobile: () => set({ mobileOpen: false }),
      toggleMobile: () => set((state) => ({ mobileOpen: !state.mobileOpen })),
      openAIPanel: () => set({ aiPanelOpen: true }),
      closeAIPanel: () => set({ aiPanelOpen: false }),
      toggleAIPanel: () =>
        set((state) => ({ aiPanelOpen: !state.aiPanelOpen })),
    }),
    {
      name: 'socialhub-ui',
      partialize: (state) => ({ collapsed: state.collapsed }),
    },
  ),
)
