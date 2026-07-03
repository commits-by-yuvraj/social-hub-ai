import { useShallow } from 'zustand/react/shallow'
import { useThemeStore } from '../stores/themeStore'

export function useTheme() {
  return useThemeStore(
    useShallow((state) => ({
      theme: state.theme,
      setTheme: state.setTheme,
      toggleTheme: state.toggleTheme,
    })),
  )
}
