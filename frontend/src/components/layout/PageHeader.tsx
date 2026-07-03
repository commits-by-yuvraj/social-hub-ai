import type { ReactNode } from 'react'
import { Breadcrumb, type BreadcrumbItem } from './Breadcrumb'
import { cn } from '../../lib/utils'

interface PageHeaderProps {
  title: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: ReactNode
  className?: string
}

export function PageHeader({
  title,
  breadcrumbs = [],
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn('mb-8', className)}>
      {breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} className="mb-3" />
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-shell-primary sm:text-3xl">
          {title}
        </h1>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </header>
  )
}
