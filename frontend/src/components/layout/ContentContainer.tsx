import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface ContentContainerProps {
  children: ReactNode
  className?: string
}

export function ContentContainer({ children, className }: ContentContainerProps) {
  return (
    <main
      className={cn(
        'flex-1 overflow-y-auto bg-shell-base scrollbar-thin',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {children}
      </div>
    </main>
  )
}
