import { PageHeader } from '../components/layout/PageHeader'
import type { BreadcrumbItem } from '../components/layout/Breadcrumb'

interface ShellDemoPageProps {
  title: string
  breadcrumbs?: BreadcrumbItem[]
}

export function ShellDemoPage({ title, breadcrumbs }: ShellDemoPageProps) {
  const crumbs: BreadcrumbItem[] = breadcrumbs ?? [{ label: title }]

  return (
    <>
      <PageHeader title={title} breadcrumbs={crumbs} />
      <div className="space-y-4">
        <div className="h-32 animate-pulse rounded-shell-lg bg-shell-elevated" />
        <div className="h-48 animate-pulse rounded-shell-lg bg-shell-elevated" />
        <div className="h-32 animate-pulse rounded-shell-lg bg-shell-elevated" />
      </div>
    </>
  )
}
