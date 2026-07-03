import { Menu, Moon, PenSquare, Sparkles, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAIPanel } from '../../hooks/useAIPanel'
import { useSidebar } from '../../hooks/useSidebar'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../lib/utils'
import {
  CommandPaletteTrigger,
  useCommandPalette,
} from './CommandPaletteTrigger'
import { NotificationButton } from './NotificationButton'
import { ProfileMenu } from './ProfileMenu'
import { SearchBar } from './SearchBar'

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  const { toggleMobile } = useSidebar()
  const { toggle: toggleAIPanel } = useAIPanel()
  const { theme, toggleTheme } = useTheme()
  const { open, setOpen } = useCommandPalette()

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-shell-subtle bg-shell-raised/80 px-4 backdrop-blur-xl sm:gap-4 sm:px-6',
          className,
        )}
      >
        <button
          type="button"
          onClick={toggleMobile}
          aria-label="Open navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-shell border border-shell-subtle bg-shell-elevated text-shell-secondary transition-all hover:bg-shell-hover hover:text-shell-primary lg:hidden"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>

        <SearchBar
          className="hidden sm:block"
          onFocus={() => setOpen(true)}
        />

        <div className="ml-auto flex items-center gap-2">
          <SearchBar
            className="sm:hidden"
            onFocus={() => setOpen(true)}
            placeholder="Search..."
          />

          <Link
            to="/create"
            className="hidden items-center gap-2 rounded-shell bg-accent-gradient px-4 py-2 text-sm font-medium text-white shadow-premium transition-all duration-200 hover:opacity-90 sm:inline-flex"
          >
            <PenSquare className="h-4 w-4" strokeWidth={2} />
            Quick Create
          </Link>

          <NotificationButton className="hidden sm:flex" />

          <button
            type="button"
            onClick={toggleAIPanel}
            aria-label="Toggle AI assistant"
            className="hidden h-10 items-center gap-2 rounded-shell border border-shell-subtle bg-shell-elevated px-3 text-sm font-medium text-shell-secondary transition-all hover:border-indigo-500/30 hover:bg-shell-hover hover:text-shell-primary sm:inline-flex"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" strokeWidth={1.75} />
            AI Assistant
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-shell border border-shell-subtle bg-shell-elevated text-shell-secondary transition-all hover:bg-shell-hover hover:text-shell-primary"
          >
            {theme === 'dark' ? (
              <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
            ) : (
              <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            )}
          </button>

          <NotificationButton className="sm:hidden" />

          <ProfileMenu />
        </div>
      </header>

      <CommandPaletteTrigger open={open} onOpenChange={setOpen} />
    </>
  )
}
