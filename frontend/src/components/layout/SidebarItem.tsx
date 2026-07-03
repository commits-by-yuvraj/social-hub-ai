import { NavLink } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SidebarItemProps {
  to: string
  label: string
  icon: LucideIcon
  collapsed?: boolean
  onNavigate?: () => void
}

export function SidebarItem({
  to,
  label,
  icon: Icon,
  collapsed = false,
  onNavigate,
}: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 rounded-shell px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-out',
          'text-shell-secondary hover:bg-shell-hover hover:text-shell-primary',
          isActive && 'bg-shell-elevated text-shell-primary shadow-sm',
          collapsed && 'justify-center px-2',
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-accent-gradient" />
          )}
          <Icon
            className={cn(
              'h-[18px] w-[18px] shrink-0 transition-colors duration-200',
              isActive ? 'text-indigo-400' : 'text-shell-muted group-hover:text-shell-secondary',
            )}
            strokeWidth={1.75}
          />
          {!collapsed && <span className="truncate">{label}</span>}
        </>
      )}
    </NavLink>
  )
}
