import { Bell } from 'lucide-react'
import { cn } from '../../lib/utils'

interface NotificationButtonProps {
  className?: string
  count?: number
}

export function NotificationButton({
  className,
  count = 3,
}: NotificationButtonProps) {
  return (
    <button
      type="button"
      aria-label="Notifications"
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-shell border border-shell-subtle bg-shell-elevated text-shell-secondary transition-all duration-200 hover:border-shell-default hover:bg-shell-hover hover:text-shell-primary',
        className,
      )}
    >
      <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
      {count > 0 && (
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-shell-raised" />
      )}
    </button>
  )
}
