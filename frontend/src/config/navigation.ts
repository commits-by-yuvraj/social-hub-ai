import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  LayoutDashboard,
  Link2,
  PenSquare,
  Settings,
  Sparkles,
  Image,
  Users,
} from 'lucide-react'

export interface NavItem {
  label: string
  path: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Create Post', path: '/create', icon: PenSquare },
  { label: 'Scheduled', path: '/scheduled', icon: CalendarClock },
  { label: 'Published', path: '/published', icon: CheckCircle2 },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'AI Studio', path: '/ai-studio', icon: Sparkles },
  { label: 'Media Library', path: '/media', icon: Image },
  { label: 'Connected Accounts', path: '/accounts', icon: Link2 },
  { label: 'Team', path: '/team', icon: Users },
  { label: 'Settings', path: '/settings', icon: Settings },
]

export const COMMAND_ITEMS = NAV_ITEMS.map((item) => ({
  label: item.label,
  path: item.path,
}))
