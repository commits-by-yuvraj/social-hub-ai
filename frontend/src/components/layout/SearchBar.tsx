import { Search } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SearchBarProps {
  className?: string
  onFocus?: () => void
  placeholder?: string
}

export function SearchBar({
  className,
  onFocus,
  placeholder = 'Search posts, accounts, team...',
}: SearchBarProps) {
  return (
    <div className={cn('relative w-full max-w-md', className)}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-shell-muted"
        strokeWidth={1.75}
      />
      <input
        type="search"
        placeholder={placeholder}
        onFocus={onFocus}
        className="h-10 w-full rounded-shell border border-shell-subtle bg-shell-elevated pl-10 pr-20 text-sm text-shell-primary placeholder:text-shell-muted transition-all duration-200 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
      />
      <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded-md border border-shell-default bg-shell-raised px-1.5 py-0.5 text-[10px] font-medium text-shell-muted sm:inline-flex">
        <span>Ctrl</span>
        <span>K</span>
      </kbd>
    </div>
  )
}
