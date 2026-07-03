import { useSidebar } from '../../hooks/useSidebar'
import { cn } from '../../lib/utils'
import { Sidebar } from './Sidebar'

interface MobileDrawerProps {
  className?: string
}

export function MobileDrawer({ className }: MobileDrawerProps) {
  const { mobileOpen, closeMobile } = useSidebar()

  if (!mobileOpen) return null

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation menu"
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in',
          className,
        )}
        onClick={closeMobile}
      />
      <div className="fixed inset-y-0 left-0 z-50 lg:hidden animate-slide-in-left">
        <Sidebar isMobileDrawer />
      </div>
    </>
  )
}
