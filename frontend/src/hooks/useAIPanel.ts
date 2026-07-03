import { useShallow } from 'zustand/react/shallow'
import { useUIStore } from '../stores/uiStore'

export function useAIPanel() {
  return useUIStore(
    useShallow((state) => ({
      isOpen: state.aiPanelOpen,
      open: state.openAIPanel,
      close: state.closeAIPanel,
      toggle: state.toggleAIPanel,
    })),
  )
}
