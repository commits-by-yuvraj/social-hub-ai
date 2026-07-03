import { ChevronLeft, ChevronRight, LogOut, Sparkles } from 'lucide-react'
import { NAV_ITEMS } from '../../config/navigation'
import { useSidebar } from '../../hooks/useSidebar'
import { cn } from '../../lib/utils'
import { SidebarItem } from './SidebarItem'

interface SidebarProps {
  isMobileDrawer?: boolean
}

export function Sidebar({ isMobileDrawer = false }: SidebarProps) {
  const { collapsed, toggleCollapsed, closeMobile } = useSidebar()

  const isCollapsed = !isMobileDrawer && collapsed

  return (
    <aside
      className={cn(
        'relative flex h-full flex-col border-r border-shell-subtle bg-shell-raised transition-all duration-300 ease-out',
        isMobileDrawer ? 'w-[280px]' : 'w-full',
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3 border-b border-shell-subtle px-4 py-5',
          isCollapsed && !isMobileDrawer && 'justify-center px-2',
        )}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-shell bg-accent-gradient shadow-premium">
          <Sparkles className="h-4 w-4 text-white" strokeWidth={2} />
        </div>
        {(!isCollapsed || isMobileDrawer) && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-shell-primary">
              SocialHub AI
            </p>
            <p className="truncate text-xs text-shell-muted">Acme Workspace</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3 scrollbar-thin">
        {NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.path}
            to={item.path}
            label={item.label}
            icon={item.icon}
            collapsed={isCollapsed && !isMobileDrawer}
            onNavigate={isMobileDrawer ? closeMobile : undefined}
          />
        ))}
      </nav>

      <div className="border-t border-shell-subtle p-3">
        <div
          className={cn(
            'mb-2 flex items-center gap-3 rounded-shell bg-shell-elevated p-3',
            isCollapsed && !isMobileDrawer && 'justify-center p-2',
          )}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-gradient text-xs font-semibold text-white">
            YK
          </div>
          {(!isCollapsed || isMobileDrawer) && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-shell-primary">
                Yuvraj Kumar
              </p>
              <p className="truncate text-xs text-shell-muted">Pro Plan</p>
            </div>
          )}
        </div>

        <button
          type="button"
          className={cn(
            'flex w-full items-center gap-3 rounded-shell px-3 py-2.5 text-sm font-medium text-shell-secondary transition-all duration-200 hover:bg-shell-hover hover:text-shell-primary',
            isCollapsed && !isMobileDrawer && 'justify-center px-2',
          )}
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={1.75} />
          {(!isCollapsed || isMobileDrawer) && <span>Logout</span>}
        </button>
      </div>

      {!isMobileDrawer && (
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3 top-20 z-10 hidden h-6 w-6 items-center justify-center rounded-full border border-shell-default bg-shell-raised text-shell-muted shadow-premium transition-all duration-200 hover:text-shell-primary lg:flex"
        >
          {isCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      )}
    </aside>
  )
}
