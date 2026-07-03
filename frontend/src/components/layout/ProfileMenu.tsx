import { ChevronDown, LogOut, Settings, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/utils'
import { useAuth } from '../../context/AuthContext'

interface ProfileMenuProps {
  className?: string
}

export function ProfileMenu({ className }: ProfileMenuProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const displayName = user?.name || 'Yuvraj Kumar'
  const displayEmail = user?.email || 'yuvraj@socialhub.ai'
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const handleItemClick = (label: string) => {
    setOpen(false)
    if (label === 'Logout') {
      logout()
    }
  }

  const menuItems = [
    { label: 'Profile', icon: User },
    { label: 'Settings', icon: Settings },
    { label: 'Logout', icon: LogOut },
  ]

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-shell border border-shell-subtle bg-shell-elevated py-1.5 pl-1.5 pr-2 transition-all duration-200 hover:border-shell-default hover:bg-shell-hover"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-gradient text-[10px] font-semibold text-white">
          {initials}
        </div>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 text-shell-muted transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-shell-lg border border-shell-default bg-shell-raised py-1 shadow-glass animate-fade-in"
        >
          <div className="border-b border-shell-subtle px-3 py-2">
            <p className="text-sm font-medium text-shell-primary truncate">{displayName}</p>
            <p className="text-xs text-shell-muted truncate">{displayEmail}</p>
          </div>
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => handleItemClick(item.label)}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-shell-secondary transition-colors hover:bg-shell-hover hover:text-shell-primary"
            >
              <item.icon className="h-4 w-4" strokeWidth={1.75} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
