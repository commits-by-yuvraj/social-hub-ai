import { ChevronRight, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-1.5 text-sm', className)}
    >
      <Link
        to="/"
        className="flex items-center text-shell-muted transition-colors hover:text-shell-secondary"
      >
        <Home className="h-3.5 w-3.5" strokeWidth={1.75} />
      </Link>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 text-shell-muted" strokeWidth={1.75} />
          {item.href && index < items.length - 1 ? (
            <Link
              to={item.href}
              className="text-shell-muted transition-colors hover:text-shell-secondary"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-shell-secondary">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
