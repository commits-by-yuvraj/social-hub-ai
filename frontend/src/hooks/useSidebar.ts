import { useShallow } from 'zustand/react/shallow'
import { useUIStore } from '../stores/uiStore'

export function useSidebar() {
  return useUIStore(
    useShallow((state) => ({
      collapsed: state.collapsed,
      toggleCollapsed: state.toggleCollapsed,
      setCollapsed: state.setCollapsed,
      mobileOpen: state.mobileOpen,
      openMobile: state.openMobile,
      closeMobile: state.closeMobile,
      toggleMobile: state.toggleMobile,
    })),
  )
}
