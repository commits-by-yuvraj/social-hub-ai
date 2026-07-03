import { Link } from 'react-router-dom'
import { PenSquare } from 'lucide-react'
import { cn } from '../../lib/utils'

interface FloatingActionButtonProps {
  className?: string
}

export function FloatingActionButton({ className }: FloatingActionButtonProps) {
  return (
    <Link
      to="/create"
      aria-label="Create Post"
      className={cn(
        'fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-accent-gradient text-white shadow-glass transition-all duration-200 hover:scale-105 hover:opacity-95 active:scale-95 lg:hidden',
        className,
      )}
    >
      <PenSquare className="h-5 w-5" strokeWidth={2} />
    </Link>
  )
}
