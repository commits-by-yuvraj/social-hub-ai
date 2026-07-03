import { Outlet } from 'react-router-dom'
import { useSidebar } from '../hooks/useSidebar'
import { useIsDesktop } from '../hooks/useMediaQuery'
import { cn } from '../lib/utils'
import { AIPanel } from '../components/layout/AIPanel'
import { ContentContainer } from '../components/layout/ContentContainer'
import { FloatingActionButton } from '../components/layout/FloatingActionButton'
import { MobileDrawer } from '../components/layout/MobileDrawer'
import { Navbar } from '../components/layout/Navbar'
import { Sidebar } from '../components/layout/Sidebar'

export function AppShell() {
  const { collapsed } = useSidebar()
  const isDesktop = useIsDesktop()

  return (
    <div className="flex h-screen overflow-hidden bg-shell-base">
      {isDesktop && (
        <div
          className={cn(
            'relative hidden shrink-0 transition-all duration-300 ease-out lg:block',
            collapsed ? 'w-[72px]' : 'w-[260px]',
          )}
        >
          <Sidebar />
        </div>
      )}

      <MobileDrawer />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </div>

      <AIPanel />
      <FloatingActionButton />
    </div>
  )
}
