import React, { useState, useMemo, useEffect } from 'react'
import {
  Plus,
  Search,
  MoreVertical,
  MoreHorizontal,
  RefreshCw,
  Trash2,
  X,
  ShieldCheck,
  ExternalLink,
  Lock,
  Loader2,
  User,
  Check,
  AlertCircle,
  HelpCircle,
  Settings,
  Grid,
  Link2
} from 'lucide-react'
import { PageHeader } from '../components/layout/PageHeader'
import type { BreadcrumbItem } from '../components/layout/Breadcrumb'

// Types
interface SocialAccount {
  id: string
  name: string
  logo: React.ReactNode
  description: string
  connected: boolean
  username?: string
  displayName?: string
  avatar?: string
  accountType?: string
  lastSynced?: string
  health: 'healthy' | 'warning' | 'critical'
  color: string
  gradient: string
  permissions?: string[]
  accountId?: string
  connectionDate?: string
  tokenStatus?: string
}

// Custom SVGs for platforms not in lucide-react
const LinkedInLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
)

const FacebookLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z"/>
  </svg>
)

const InstagramLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const ThreadsLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5c-1.5 0-3-1-3-2.5s1-2.5 2.5-2.5h2v1c0 1.5-1 2.5-2.5 2.5h-1c-.8 0-1.5-.7-1.5-1.5v-2c0-1.7 1.3-3 3-3s3 1.3 3 3v2.5c0 2.5-2 4.5-4.5 4.5h-1c-3.6 0-6.5-2.9-6.5-6.5S9.4 6 13 6h1" />
  </svg>
)

const BlueskyLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M12 10.57c-1.28-2.61-4.88-5.32-8.5-5.32C1.52 5.25 0 6.64 0 8.78c0 3.23 2.05 8.71 4.7 10.1 3.51 1.84 6.35-.45 7.3-1.63.95 1.18 3.79 3.47 7.3 1.63 2.65-1.39 4.7-6.87 4.7-10.1 0-2.14-1.52-3.53-3.5-3.53-3.62 0-7.22 2.71-8.5 5.32z"/>
  </svg>
)

const MastodonLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M23.27 8.59c-.22-2.15-1.78-4.13-4.04-4.56-2.5-.47-6.07-.53-7.23-.53h-.02c-1.16 0-4.73.06-7.23.53-2.26.43-3.82 2.41-4.04 4.56-.25 2.46-.27 4.93-.27 7.4v.15c0 1.3.1 2.58.3 3.86.37 2.37 2.1 4.67 4.6 4.98 2 .25 4.07.35 6.13.3.4 0 .8 0 1.2-.02 1.32-.05 2.6-.16 3.83-.4 2.5-.48 4.23-2.77 4.6-5.14.2-1.28.3-2.56.3-3.86v-.15c0-2.47-.02-4.94-.27-7.4zm-4.72 8.77h-2.1v-5.26c0-1.1-.47-1.66-1.4-1.66-.93 0-1.4.56-1.4 1.66v2.9h-2.1v-2.9c0-1.1-.47-1.66-1.4-1.66-.93 0-1.4.56-1.4 1.66v5.26h-2.1V9.52h2.1v.83c.47-.7 1.34-1.1 2.33-1.1 1.25 0 2.23.53 2.57 1.58.34-1.05 1.32-1.58 2.57-1.58.99 0 1.86.4 2.33 1.1v-.83h2.1v7.84z"/>
  </svg>
)

const PinterestLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
    <path d="M12.017 0c-6.627 0-12 5.373-12 12 0 5.077 3.163 9.417 7.648 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.906 2.167-2.906 1.02 0 1.513.766 1.513 1.684 0 1.026-.653 2.561-.99 3.981-.281 1.19.599 2.161 1.774 2.161 2.128 0 3.768-2.245 3.768-5.487 0-2.868-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.138.89 2.738.1.12.115.224.085.345-.094.393-.305 1.238-.346 1.404-.054.218-.179.266-.412.158-1.539-.716-2.5-2.969-2.5-4.782 0-3.896 2.833-7.477 8.163-7.477 4.285 0 7.61 3.052 7.61 7.13 0 4.258-2.677 7.685-6.398 7.685-1.25 0-2.428-.652-2.83-1.417l-.772 2.94c-.28 1.071-1.037 2.414-1.542 3.239 1.124.346 2.316.534 3.551.534 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const YouTubeLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
    <path d="M23.498 6.163c-.272-1.022-1.078-1.826-2.099-2.099-1.859-.5-9.4-.5-9.4-.5s-7.54 0-9.4.5c-1.021.273-1.827 1.077-2.1 2.099-.5 1.859-.5 5.837-.5 5.837s0 3.979.5 5.837c.273 1.022 1.079 1.826 2.1 2.099 1.86.5 9.4.5 9.4.5s7.543 0 9.4-.5c1.022-.273 1.827-1.077 2.1-2.099.5-1.859.5-5.837.5-5.837s0-3.978-.5-5.837zm-14.17 8.562v-7.45l6.51 3.725-6.51 3.725z"/>
  </svg>
)

const INITIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    logo: <LinkedInLogo />,
    description: 'Share industry insights, updates, and engage with your professional network.',
    connected: true,
    username: 'yuvraj-kumar-dev',
    displayName: 'Yuvraj Kumar',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80',
    accountType: 'Personal Profile',
    lastSynced: '2 minutes ago',
    health: 'healthy',
    color: '#0077b5',
    gradient: 'from-[#005582] to-[#0077b5]',
    permissions: ['r_liteprofile', 'w_member_social', 'w_organization_social', 'r_organization_social'],
    accountId: 'li-92384752',
    connectionDate: '2026-06-15',
    tokenStatus: 'Valid (Expires in 58 days)'
  },
  {
    id: 'facebook',
    name: 'Facebook Pages',
    logo: <FacebookLogo />,
    description: 'Post articles, announcements, and connect with local and global communities.',
    connected: true,
    username: 'SocialHubAIPage',
    displayName: 'SocialHub AI Page',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&h=80',
    accountType: 'Business Page',
    lastSynced: '12 minutes ago',
    health: 'healthy',
    color: '#1877f2',
    gradient: 'from-[#0f53b3] to-[#1877f2]',
    permissions: ['pages_manage_posts', 'pages_read_engagement', 'publish_video'],
    accountId: 'fb-84950293',
    connectionDate: '2026-06-20',
    tokenStatus: 'Valid (Long-lived Token)'
  },
  {
    id: 'instagram',
    name: 'Instagram Business',
    logo: <InstagramLogo />,
    description: 'Publish photos, reels, and stories directly to your business feed.',
    connected: false,
    health: 'healthy',
    color: '#e1306c',
    gradient: 'from-[#833ab4] via-[#fd1d1d] to-[#fcb045]'
  },
  {
    id: 'threads',
    name: 'Threads',
    logo: <ThreadsLogo />,
    description: 'Join text conversations, post threads, and engage with a fast-growing social circle.',
    connected: false,
    health: 'healthy',
    color: '#ffffff',
    gradient: 'from-[#111] to-[#333]'
  },
  {
    id: 'bluesky',
    name: 'Bluesky',
    logo: <BlueskyLogo />,
    description: 'Post micro-content and interact on an open, decentralized network.',
    connected: false,
    health: 'healthy',
    color: '#0285FF',
    gradient: 'from-[#005cb5] to-[#0285FF]'
  },
  {
    id: 'mastodon',
    name: 'Mastodon',
    logo: <MastodonLogo />,
    description: 'Publish updates on open, customized federated communities.',
    connected: false,
    health: 'healthy',
    color: '#6364ff',
    gradient: 'from-[#3c3db3] to-[#6364ff]'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    logo: <PinterestLogo />,
    description: 'Pin creative images, moodboards, and product ideas to global audience collections.',
    connected: false,
    health: 'healthy',
    color: '#bd081c',
    gradient: 'from-[#82000e] to-[#bd081c]'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    logo: <YouTubeLogo />,
    description: 'Upload video content, shorts, and schedule streams to your subscribers.',
    connected: false,
    health: 'healthy',
    color: '#ff0000',
    gradient: 'from-[#b30000] to-[#ff0000]'
  }
]

export function ConnectedAccountsPage() {
  const crumbs: BreadcrumbItem[] = [{ label: 'Connected Accounts' }]

  // States
  const [accounts, setAccounts] = useState<SocialAccount[]>(INITIAL_ACCOUNTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<SocialAccount | null>(null)
  const [showConnectModal, setShowConnectModal] = useState<SocialAccount | null>(null)
  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null)

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null)

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type })
  }

  // Filter Accounts
  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc) => {
      const matchSearch = acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (acc.username && acc.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (acc.displayName && acc.displayName.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchSearch
    })
  }, [accounts, searchQuery])

  // Connection Handler (Mock OAuth flow)
  const startOAuthFlow = (account: SocialAccount) => {
    setShowConnectModal(null)
    setLoadingPlatform(account.id)
    showToast(`Initiating OAuth connection with ${account.name}...`, 'info')

    setTimeout(() => {
      setAccounts((prev) =>
        prev.map((acc) => {
          if (acc.id === account.id) {
            return {
              ...acc,
              connected: true,
              username: `${account.id.toLowerCase()}_user`,
              displayName: `Demo ${account.name} User`,
              avatar: undefined, // Will fall back to letters
              accountType: account.id === 'youtube' ? 'Video Creator Channel' : 'Creator Profile',
              lastSynced: 'Just now',
              health: 'healthy',
              permissions: ['profile', 'posts_write', 'insights_read'],
              accountId: `${account.id.substring(0, 2).toLowerCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`,
              connectionDate: new Date().toISOString().split('T')[0],
              tokenStatus: 'Valid (Expires in 60 days)'
            }
          }
          return acc
        })
      )
      setLoadingPlatform(null)
      showToast(`Successfully connected to ${account.name}!`, 'success')
    }, 2000)
  }

  // Refresh Connection
  const refreshConnection = (accountId: string) => {
    setActiveDropdown(null)
    setLoadingPlatform(accountId)
    showToast(`Refreshing authorization tokens...`, 'info')

    setTimeout(() => {
      setAccounts((prev) =>
        prev.map((acc) => {
          if (acc.id === accountId) {
            return {
              ...acc,
              lastSynced: 'Just now',
              tokenStatus: 'Refreshed & Valid (Expires in 90 days)',
              health: 'healthy'
            }
          }
          return acc
        })
      )
      setLoadingPlatform(null)
      showToast(`Connection token refreshed successfully!`)
    }, 1500)
  }

  // Disconnect Account
  const disconnectAccount = (accountId: string) => {
    setActiveDropdown(null)
    if (window.confirm('Are you sure you want to disconnect this account? You will not be able to publish posts to it.')) {
      setAccounts((prev) =>
        prev.map((acc) => {
          if (acc.id === accountId) {
            return {
              ...acc,
              connected: false,
              username: undefined,
              displayName: undefined,
              lastSynced: undefined,
              permissions: undefined,
              accountId: undefined,
              connectionDate: undefined,
              tokenStatus: undefined
            }
          }
          return acc
        })
      )
      if (selectedAccount?.id === accountId) {
        setSelectedAccount(null)
      }
      showToast(`Disconnected account.`, 'info')
    }
  }

  return (
    <div className="relative pb-16 min-h-screen">
      {/* Toast popup */}
      {toast && (
        <div className="fixed right-6 top-6 z-50 flex items-center gap-2.5 rounded-shell bg-[#111113] border border-indigo-500/30 px-4 py-3 text-sm text-shell-primary shadow-glass animate-slide-in-right">
          <div className={`h-2 w-2 rounded-full ${toast.type === 'error' ? 'bg-red-500' : toast.type === 'info' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
          <span>{toast.message}</span>
          <button type="button" onClick={() => setToast(null)} className="ml-2 text-shell-muted hover:text-shell-primary">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Screen Header */}
      <PageHeader
        title="Connected Accounts"
        breadcrumbs={crumbs}
        actions={
          /* Search Input */
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-shell-muted" />
            <input
              type="text"
              placeholder="Search platforms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-56 sm:w-64 rounded-full border border-shell-subtle bg-shell-raised pl-10 pr-4 py-2 text-sm text-shell-primary placeholder:text-shell-muted focus:border-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-2.5 text-shell-muted hover:text-shell-primary"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        }
      />

      <p className="max-w-2xl text-sm text-shell-secondary -mt-6 mb-8 leading-relaxed">
        Connect your social media accounts to publish, schedule, and manage content from one place. SocialHub AI securely authenticates you using official platform OAuth endpoints.
      </p>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAccounts.length === 0 ? (
          <div className="col-span-full py-12 text-center text-sm text-shell-muted">
            No platforms found matching "{searchQuery}"
          </div>
        ) : (
          filteredAccounts.map((account) => {
            const initials = account.displayName
              ? account.displayName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
              : account.name[0]

            return (
              <div
                key={account.id}
                className="group relative rounded-shell-lg border border-shell-default bg-shell-raised p-5 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-premium hover:-translate-y-1 overflow-hidden"
              >
                {/* Platform color accent bar */}
                <div
                  className="absolute left-0 top-0 h-1.5 w-full bg-slate-800 transition-colors duration-300 group-hover:bg-gradient-to-r"
                  style={{ backgroundColor: account.color }}
                />

                {/* Card Header (Logo and Actions) */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-shell-elevated text-white border border-shell-default shadow-sm transition-all group-hover:scale-105"
                    style={{ color: account.color }}
                  >
                    {account.logo}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Badge */}
                    {account.connected ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Connected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-shell-elevated px-2.5 py-0.5 text-xs font-medium text-shell-muted border border-shell-subtle">
                        Disconnected
                      </span>
                    )}

                    {/* Options Dropdown for Connected State */}
                    {account.connected && (
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setActiveDropdown(activeDropdown === account.id ? null : account.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-shell-muted hover:bg-shell-hover hover:text-shell-primary transition-colors"
                        >
                          <MoreHorizontal className="h-4.5 w-4.5" />
                        </button>

                        {activeDropdown === account.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />
                            <div className="absolute right-0 mt-1.5 z-20 w-44 rounded-shell border border-shell-default bg-shell-raised p-1 shadow-glass animate-fade-in text-left">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedAccount(account)
                                  setActiveDropdown(null)
                                }}
                                className="flex w-full items-center gap-2 rounded-shell px-3 py-2 text-xs text-shell-primary hover:bg-shell-hover"
                              >
                                <Settings className="h-3.5 w-3.5 text-shell-secondary" />
                                <span>Manage Account</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => refreshConnection(account.id)}
                                className="flex w-full items-center gap-2 rounded-shell px-3 py-2 text-xs text-shell-primary hover:bg-shell-hover"
                              >
                                <RefreshCw className="h-3.5 w-3.5 text-shell-secondary" />
                                <span>Refresh Connection</span>
                              </button>
                              <div className="border-t border-shell-subtle my-1" />
                              <button
                                type="button"
                                onClick={() => disconnectAccount(account.id)}
                                className="flex w-full items-center gap-2 rounded-shell px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Disconnect</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Account Details Name */}
                <h3 className="text-base font-semibold text-shell-primary mb-1">
                  {account.name}
                </h3>
                <p className="text-xs text-shell-muted leading-relaxed line-clamp-2 min-h-[32px] mb-4">
                  {account.description}
                </p>

                {/* Conditional Connection Details Panel */}
                {account.connected ? (
                  <div className="mt-4 pt-4 border-t border-shell-subtle flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {account.avatar ? (
                        <img
                          src={account.avatar}
                          alt={account.displayName}
                          className="h-8 w-8 rounded-full border border-indigo-500/20 object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-indigo-600/20 text-xs font-bold text-indigo-400 flex items-center justify-center border border-indigo-500/15">
                          {initials}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-shell-primary truncate">
                          {account.displayName}
                        </p>
                        <p className="text-[10px] text-shell-muted truncate">
                          @{account.username}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="block text-[9px] font-semibold text-slate-500 uppercase tracking-wide">
                        Synced
                      </span>
                      <span className="text-[10px] text-shell-secondary font-medium whitespace-nowrap">
                        {account.lastSynced}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 pt-4 border-t border-shell-subtle">
                    <button
                      type="button"
                      onClick={() => setShowConnectModal(account)}
                      disabled={loadingPlatform === account.id}
                      className="w-full flex items-center justify-center gap-2 rounded-shell bg-shell-elevated border border-shell-subtle py-2 text-xs font-semibold text-slate-200 hover:bg-shell-hover hover:border-indigo-500/30 transition-all"
                    >
                      {loadingPlatform === account.id ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-400" />
                          <span>Connecting...</span>
                        </>
                      ) : (
                        <>
                          <span>Connect Account</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* CONNECT OAUTH MODAL */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[4px] animate-fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setShowConnectModal(null)}
          />
          <div className="relative w-full max-w-md rounded-shell-lg border border-shell-default bg-[#111113] p-6 shadow-glass animate-slide-in-right z-10 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-shell-elevated"
                  style={{ color: showConnectModal.color }}
                >
                  {showConnectModal.logo}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    Connect {showConnectModal.name}
                  </h3>
                  <p className="text-xs text-slate-400">OAuth Authorization</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConnectModal(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Description */}
            <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <p>
                You are about to authorize <strong>SocialHub AI</strong> to link to your {showConnectModal.name} account. This will allow the application to:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>Create and publish text, image, and video posts</li>
                <li>Retrieve basic profile identity and display names</li>
                <li>Fetch audience engagement analytics (likes, comments, reach)</li>
              </ul>
            </div>

            {/* Security Notice Card */}
            <div className="flex gap-2.5 rounded-shell bg-indigo-500/5 border border-indigo-500/10 p-3.5 text-left">
              <ShieldCheck className="h-5 w-5 text-indigo-400 shrink-0" />
              <div className="text-[11px] text-indigo-300 leading-normal">
                <span className="font-semibold block mb-0.5">Secure OAuth Authentication</span>
                We never store your passwords. Connection credentials are authentication tokens handled securely by {showConnectModal.name} via SSL.
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConnectModal(null)}
                className="flex-1 rounded-shell bg-shell-elevated border border-shell-subtle py-2 text-xs font-semibold text-slate-300 hover:bg-shell-hover"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => startOAuthFlow(showConnectModal)}
                className="flex-1 rounded-shell bg-indigo-600 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Continue to OAuth</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANAGE ACCOUNT SIDE DRAWER */}
      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-[2px] animate-fade-in">
          {/* Overlay Close */}
          <div
            className="fixed inset-0"
            onClick={() => setSelectedAccount(null)}
          />

          {/* Drawer Container */}
          <aside className="relative flex h-full w-full sm:w-[420px] flex-col border-l border-shell-default bg-[#0d0e12] shadow-glass animate-slide-in-right z-10 overflow-hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-shell-subtle px-5 py-4 bg-shell-raised">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded bg-shell-elevated"
                  style={{ color: selectedAccount.color }}
                >
                  {selectedAccount.logo}
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-100">
                    Manage {selectedAccount.name}
                  </h2>
                  <p className="text-xs text-slate-400">Connection Details</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAccount(null)}
                className="flex h-8 w-8 items-center justify-center rounded text-slate-400 hover:bg-shell-hover hover:text-slate-200 transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin">
              {/* Account Bio */}
              <div className="flex flex-col items-center text-center p-4 rounded-shell-lg border border-shell-subtle bg-shell-raised">
                {selectedAccount.avatar ? (
                  <img
                    src={selectedAccount.avatar}
                    alt={selectedAccount.displayName}
                    className="h-16 w-16 rounded-full border-2 border-indigo-500/30 object-cover mb-3"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-indigo-600/20 text-lg font-bold text-indigo-400 flex items-center justify-center border-2 border-indigo-500/15 mb-3">
                    {selectedAccount.displayName
                      ? selectedAccount.displayName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                      : selectedAccount.name[0]}
                  </div>
                )}
                <h4 className="text-sm font-bold text-slate-100">
                  {selectedAccount.displayName}
                </h4>
                <p className="text-xs text-slate-400">@{selectedAccount.username}</p>
                <span className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20">
                  {selectedAccount.accountType || 'Connected Profile'}
                </span>
              </div>

              {/* Specs Table */}
              <div className="space-y-3.5">
                <h5 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Account Metadata
                </h5>
                <div className="rounded-shell border border-shell-subtle divide-y divide-shell-subtle text-xs bg-shell-raised">
                  <div className="flex justify-between px-3.5 py-2.5">
                    <span className="text-slate-400">Account ID</span>
                    <span className="font-mono text-slate-200">{selectedAccount.accountId || 'n/a'}</span>
                  </div>
                  <div className="flex justify-between px-3.5 py-2.5">
                    <span className="text-slate-400">Connected Date</span>
                    <span className="text-slate-200">{selectedAccount.connectionDate || 'n/a'}</span>
                  </div>
                  <div className="flex justify-between px-3.5 py-2.5">
                    <span className="text-slate-400">Token Status</span>
                    <span className="text-emerald-400 font-medium">{selectedAccount.tokenStatus || 'Valid'}</span>
                  </div>
                  <div className="flex justify-between px-3.5 py-2.5">
                    <span className="text-slate-400">Last Synchronization</span>
                    <span className="text-slate-200">{selectedAccount.lastSynced}</span>
                  </div>
                </div>
              </div>

              {/* Permissions list */}
              <div className="space-y-2.5">
                <h5 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  OAuth Scopes Granted
                </h5>
                <div className="space-y-1.5">
                  {selectedAccount.permissions?.map((perm) => (
                    <div
                      key={perm}
                      className="flex items-center gap-2 rounded bg-shell-raised border border-shell-subtle px-3 py-2 text-xs text-slate-300"
                    >
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="font-mono text-[10px] text-slate-400">{perm}</span>
                    </div>
                  )) || (
                    <p className="text-xs text-slate-500 italic">No custom scopes saved.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="border-t border-shell-subtle p-4 bg-shell-raised flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedAccount(null)
                  refreshConnection(selectedAccount.id)
                }}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-shell bg-[#111113] border border-shell-subtle py-2.5 text-xs font-semibold text-slate-200 hover:bg-shell-hover"
              >
                <RefreshCw className="h-3.5 w-3.5 text-slate-400" />
                <span>Reconnect</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = selectedAccount.id
                  setSelectedAccount(null)
                  disconnectAccount(id)
                }}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-shell bg-red-950/20 border border-red-900/30 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-950/40"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Disconnect</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
