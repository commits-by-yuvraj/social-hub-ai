import { Command } from 'cmdk'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  LayoutDashboard,
  Link2,
  PenSquare,
  Search,
  Settings,
  Sparkles,
  Image,
  Users,
} from 'lucide-react'
import { COMMAND_ITEMS } from '../../config/navigation'
import { cn } from '../../lib/utils'

const iconMap: Record<string, typeof LayoutDashboard> = {
  '/': LayoutDashboard,
  '/create': PenSquare,
  '/scheduled': CalendarClock,
  '/published': CheckCircle2,
  '/analytics': BarChart3,
  '/ai-studio': Sparkles,
  '/media': Image,
  '/accounts': Link2,
  '/team': Users,
  '/settings': Settings,
}

interface CommandPaletteTriggerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CommandPaletteTrigger({
  open: controlledOpen,
  onOpenChange,
}: CommandPaletteTriggerProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const navigate = useNavigate()

  const open = controlledOpen ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setOpen])

  const handleSelect = (path: string) => {
    navigate(path)
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <button
        type="button"
        aria-label="Close command palette"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setOpen(false)}
      />
      <Command
        className={cn(
          'relative z-10 w-full max-w-lg overflow-hidden rounded-shell-lg border border-shell-default bg-shell-raised shadow-glass animate-fade-in',
        )}
        label="Global command menu"
      >
        <div className="flex items-center gap-2 border-b border-shell-subtle px-4">
          <Search className="h-4 w-4 text-shell-muted" strokeWidth={1.75} />
          <Command.Input
            placeholder="Search pages and actions..."
            className="h-12 flex-1 bg-transparent text-sm text-shell-primary placeholder:text-shell-muted focus:outline-none"
          />
          <kbd className="rounded-md border border-shell-default px-1.5 py-0.5 text-[10px] text-shell-muted">
            ESC
          </kbd>
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
          <Command.Empty className="px-3 py-6 text-center text-sm text-shell-muted">
            No results found.
          </Command.Empty>
          <Command.Group heading="Navigation" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-shell-muted">
            {COMMAND_ITEMS.map((item) => {
              const Icon = iconMap[item.path] ?? LayoutDashboard
              return (
                <Command.Item
                  key={item.path}
                  value={item.label}
                  onSelect={() => handleSelect(item.path)}
                  className="flex cursor-pointer items-center gap-3 rounded-shell px-3 py-2.5 text-sm text-shell-secondary transition-colors data-[selected=true]:bg-shell-hover data-[selected=true]:text-shell-primary"
                >
                  <Icon className="h-4 w-4 text-shell-muted" strokeWidth={1.75} />
                  {item.label}
                </Command.Item>
              )
            })}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  )
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false)
  return { open, setOpen }
}
