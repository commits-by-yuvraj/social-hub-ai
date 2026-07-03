import React, { useState, useRef, useEffect } from 'react'
import {
  Image as ImageIcon,
  Smile,
  MapPin,
  Sparkles,
  PenLine,
  RotateCw,
  Sliders,
  Hash,
  Trash2,
  Clock,
  Send,
  Check,
  ChevronDown,
  Globe,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Share2,
  Repeat,
  Heart,
  Bookmark,
  Calendar,
  X,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { PageHeader } from '../components/layout/PageHeader'
import type { BreadcrumbItem } from '../components/layout/Breadcrumb'
import { useSidebar } from '../hooks/useSidebar'
import { cn } from '../lib/utils'

interface Platform {
  id: string
  name: string
  color: string
  selected: boolean
  maxChars: number
}

const INITIAL_PLATFORMS: Platform[] = [
  { id: 'linkedin', name: 'LinkedIn', color: '#0077b5', selected: true, maxChars: 3000 },
  { id: 'facebook', name: 'Facebook', color: '#1877f2', selected: true, maxChars: 5000 },
  { id: 'instagram', name: 'Instagram', color: '#e1306c', selected: true, maxChars: 2200 },
  { id: 'twitter', name: 'Twitter / X', color: '#1da1f2', selected: true, maxChars: 280 },
  { id: 'threads', name: 'Threads', color: '#ffffff', selected: true, maxChars: 500 }
]

const EMOJIS = ['🚀', '✨', '💡', '🔥', '👏', '🙌', '🎉', '📈', '💻', '🤔', '👍', '❤️']

const LOCATIONS = [
  'San Francisco, CA',
  'New York, NY',
  'London, UK',
  'Tokyo, Japan',
  'Bengaluru, India',
  'Remote Office'
]

const TONES = [
  { name: 'Professional', text: 'Optimizing our social media strategy with SocialHub AI. Streamlined cross-platform posting, AI-powered writing, and live interactive previews help teams coordinate campaigns with ease.' },
  { name: 'Casual', text: 'just testing out this new post builder on SocialHub AI. being able to write once and see exactly how it looks on LinkedIn, Facebook, and Instagram at the same time is super neat.' },
  { name: 'Excited', text: 'OH MY GOD! The new Create Post module is finally here! 🚀 Drafting, live previewing, and scheduling across all my social channels has never felt this smooth! Let\'s go!' },
  { name: 'Persuasive', text: 'Stop wasting hours manually publishing content across individual platforms. SocialHub AI brings your draft, preview, and scheduler into a single unified workspace. Elevate your presence today.' }
]

export function CreatePostPage() {
  const { collapsed } = useSidebar()
  const crumbs: BreadcrumbItem[] = [{ label: 'Create Post' }]

  // Form State
  const [content, setContent] = useState('')
  const [platforms, setPlatforms] = useState<Platform[]>(INITIAL_PLATFORMS)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [location, setLocation] = useState<string | null>(null)

  // Interactive UI State
  const [activePreview, setActivePreview] = useState<'linkedin' | 'facebook' | 'instagram'>('linkedin')
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [showTonePicker, setShowTonePicker] = useState(false)
  const [showSchedulePicker, setShowSchedulePicker] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiAction, setAiAction] = useState<string | null>(null)

  // Scheduling State
  const [scheduledDate, setScheduledDate] = useState<string>('')
  const [scheduledTime, setScheduledTime] = useState<string>('')
  const [isScheduled, setIsScheduled] = useState(false)

  // Toast System
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const selectedCount = platforms.filter((p) => p.selected).length

  // Toast auto-clear
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

  // Toggle platform selection
  const togglePlatform = (id: string) => {
    setPlatforms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p))
    )
  }

  const selectAllPlatforms = () => {
    const allSelected = platforms.every((p) => p.selected)
    setPlatforms((prev) => prev.map((p) => ({ ...p, selected: !allSelected })))
  }

  // Image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string)
          showToast('Image attached to draft')
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerImageUpload = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    showToast('Image removed from draft', 'info')
  }

  // Emoji insertion
  const insertEmoji = (emoji: string) => {
    if (!textareaRef.current) return
    const start = textareaRef.current.selectionStart
    const end = textareaRef.current.selectionEnd
    const text = textareaRef.current.value
    const before = text.substring(0, start)
    const after = text.substring(end, text.length)
    setContent(before + emoji + after)
    setShowEmojiPicker(false)

    // Reset cursor position after render
    setTimeout(() => {
      textareaRef.current?.focus()
      const newPos = start + emoji.length
      textareaRef.current?.setSelectionRange(newPos, newPos)
    }, 0)
  }

  // AI assistant handlers
  const handleAIAction = (action: 'improve' | 'rewrite' | 'hashtags' | 'tone', toneText?: string) => {
    if (!content.trim() && action !== 'rewrite' && action !== 'tone') {
      showToast('Please type some content first for AI to work with', 'error')
      return
    }

    setAiLoading(true)
    setAiAction(action)

    setTimeout(() => {
      setAiLoading(false)
      setAiAction(null)

      if (action === 'improve') {
        setContent((prev) => {
          const cleaned = prev.replace(/\s*(✨ Optimized|🚀 Check|🔄 Alternate|#\w+)+/g, '').trim()
          return `🚀 ${cleaned}\n\n✨ Optimized for maximum engagement & impact! Let me know your thoughts in the comments. 👇`
        })
        showToast('AI improved your post caption!')
      } else if (action === 'rewrite') {
        setContent('💡 Transforming how teams scale their brand. Meet SocialHub AI – your new workflow hub for cross-platform drafting, scheduling, and analytics. Real-time updates, AI assistants, and beautiful previews.')
        showToast('AI rewrote your post!')
      } else if (action === 'hashtags') {
        // Extract basic keywords to make it look smart
        const words = content.toLowerCase().split(/\s+/)
        const customTags: string[] = []
        if (words.some(w => ['code', 'dev', 'developer', 'react', 'program'].includes(w))) {
          customTags.push('#webdev', '#coding', '#reactjs')
        }
        if (words.some(w => ['ai', 'agent', 'smart', 'model', 'bot'].includes(w))) {
          customTags.push('#ai', '#artificialintelligence', '#innovation')
        }
        if (words.some(w => ['social', 'marketing', 'brand', 'post'].includes(w))) {
          customTags.push('#socialmedia', '#marketing', '#growth')
        }

        const fallbackTags = ['#contentcreation', '#productivity', '#socialhub']
        const finalTags = [...customTags, ...fallbackTags].slice(0, 4).join(' ')

        setContent((prev) => {
          const cleaned = prev.trim()
          return `${cleaned}\n\n${finalTags}`
        })
        showToast('Hashtags added!')
      } else if (action === 'tone' && toneText) {
        setContent(toneText)
        setShowTonePicker(false)
        showToast(`Switched tone to ${toneText.substring(0, 10)}...`)
      }
    }, 1200)
  }

  // Handle Scheduling
  const confirmSchedule = () => {
    if (!scheduledDate || !scheduledTime) {
      showToast('Please pick both date and time to schedule', 'error')
      return
    }
    setIsScheduled(true)
    setShowSchedulePicker(false)
    showToast(`Post scheduled for ${scheduledDate} at ${scheduledTime}`)
  }

  const cancelSchedule = () => {
    setIsScheduled(false)
    setScheduledDate('')
    setScheduledTime('')
    showToast('Scheduling cancelled', 'info')
  }

  // Discard draft
  const handleDiscard = () => {
    if (content || selectedImage || location || isScheduled) {
      if (window.confirm('Are you sure you want to discard your draft?')) {
        setContent('')
        setSelectedImage(null)
        setLocation(null)
        setIsScheduled(false)
        setScheduledDate('')
        setScheduledTime('')
        showToast('Draft discarded', 'info')
      }
    } else {
      showToast('Nothing to discard', 'info')
    }
  }

  // Publish / Submit
  const handlePublish = () => {
    if (!content.trim() && !selectedImage) {
      showToast('Cannot publish an empty post', 'error')
      return
    }
    if (selectedCount === 0) {
      showToast('Please select at least one social account', 'error')
      return
    }

    setAiLoading(true)
    setTimeout(() => {
      setAiLoading(false)
      showToast(
        isScheduled
          ? `Successfully scheduled to ${selectedCount} channels!`
          : `Successfully published to ${selectedCount} channels! 🎉`
      )
      // Reset
      setContent('')
      setSelectedImage(null)
      setLocation(null)
      setIsScheduled(false)
      setScheduledDate('')
      setScheduledTime('')
    }, 1500)
  }

  return (
    <div className="relative pb-24">
      {/* Toast Notification */}
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
      <PageHeader title="Create Post" breadcrumbs={crumbs} />

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT COLUMN: Drafting Toolset (7 cols) */}
        <div className="space-y-5 lg:col-span-7">
          {/* Account Channel Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}
              className="flex items-center gap-2 rounded-full border border-shell-default bg-shell-raised px-4 py-2 text-sm font-medium text-shell-primary hover:bg-shell-hover transition-colors"
            >
              <div className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              <span>
                {selectedCount === platforms.length
                  ? `All Selected (${selectedCount})`
                  : `${selectedCount} Platform${selectedCount === 1 ? '' : 's'} Selected`}
              </span>
              <ChevronDown className="h-4 w-4 text-shell-muted" />
            </button>

            {showPlatformDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowPlatformDropdown(false)} />
                <div className="absolute left-0 mt-2 z-20 w-64 rounded-shell border border-shell-default bg-shell-raised p-2 shadow-glass animate-fade-in">
                  <div className="flex items-center justify-between border-b border-shell-subtle px-3 py-2">
                    <span className="text-xs font-semibold text-shell-muted">Select Channels</span>
                    <button
                      type="button"
                      onClick={selectAllPlatforms}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                    >
                      {selectedCount === platforms.length ? 'Deselect All' : 'Select All'}
                    </button>
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {platforms.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => togglePlatform(p.id)}
                        className="flex w-full items-center justify-between rounded-shell px-3 py-2 text-sm hover:bg-shell-hover text-shell-primary"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: p.color }}
                          />
                          <span>{p.name}</span>
                        </div>
                        {p.selected && <Check className="h-4 w-4 text-indigo-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Text Editor Box */}
          <div className="relative rounded-shell-lg border border-shell-default bg-shell-raised overflow-hidden shadow-sm focus-within:border-indigo-500/40 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all duration-200">
            {aiLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px]">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
                <span className="mt-2 text-xs font-medium text-indigo-300">
                  {aiAction === 'improve' && 'AI optimizing writing...'}
                  {aiAction === 'rewrite' && 'AI generating rewrite...'}
                  {aiAction === 'hashtags' && 'AI matching hashtags...'}
                  {aiAction === 'tone' && 'AI adapting tone...'}
                  {!aiAction && 'Processing request...'}
                </span>
              </div>
            )}

            {/* Main Area */}
            <div className="p-4">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What do you want to share with your audience?"
                rows={12}
                className="w-full resize-none bg-transparent text-[15px] leading-relaxed text-shell-primary placeholder:text-shell-muted focus:outline-none scrollbar-thin"
              />

              {/* Uploaded Image Card inside Editor */}
              {selectedImage && (
                <div className="relative mt-3 inline-block max-w-[200px] rounded-shell overflow-hidden border border-shell-subtle group">
                  <img
                    src={selectedImage}
                    alt="Post attachment"
                    className="h-28 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button
                      type="button"
                      onClick={removeImage}
                      className="rounded-full bg-red-600 p-1.5 text-white hover:bg-red-700 transition-colors"
                      title="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Location Tag */}
              {location && (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 border border-indigo-500/20">
                  <MapPin className="h-3 w-3" />
                  <span>{location}</span>
                  <button type="button" onClick={() => setLocation(null)} className="ml-1 text-indigo-400 hover:text-indigo-200">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Editor Bar */}
            <div className="flex items-center justify-between border-t border-shell-subtle bg-shell-elevated px-4 py-3">
              {/* Left Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Media Attachment */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={triggerImageUpload}
                  className="flex h-8 w-8 items-center justify-center rounded-shell text-shell-muted hover:bg-shell-hover hover:text-shell-primary transition-colors"
                  title="Attach Image"
                >
                  <ImageIcon className="h-4 w-4" />
                </button>

                {/* Emoji Trigger */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="flex h-8 w-8 items-center justify-center rounded-shell text-shell-muted hover:bg-shell-hover hover:text-shell-primary transition-colors"
                    title="Insert Emoji"
                  >
                    <Smile className="h-4 w-4" />
                  </button>

                  {showEmojiPicker && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowEmojiPicker(false)} />
                      <div className="absolute bottom-10 left-0 z-20 grid grid-cols-4 gap-1.5 rounded-shell border border-shell-default bg-shell-raised p-2.5 shadow-glass animate-fade-in w-40">
                        {EMOJIS.map((e) => (
                          <button
                            key={e}
                            type="button"
                            onClick={() => insertEmoji(e)}
                            className="flex h-7 w-7 items-center justify-center rounded text-base hover:bg-shell-hover"
                          >
                            {e}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Location Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowLocationPicker(!showLocationPicker)}
                    className="flex h-8 w-8 items-center justify-center rounded-shell text-shell-muted hover:bg-shell-hover hover:text-shell-primary transition-colors"
                    title="Add Location"
                  >
                    <MapPin className="h-4 w-4" />
                  </button>

                  {showLocationPicker && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowLocationPicker(false)} />
                      <div className="absolute bottom-10 left-0 z-20 w-48 rounded-shell border border-shell-default bg-shell-raised p-1 shadow-glass animate-fade-in">
                        {LOCATIONS.map((loc) => (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => {
                              setLocation(loc)
                              setShowLocationPicker(false)
                              showToast(`Location set to ${loc}`)
                            }}
                            className="flex w-full items-center px-3 py-1.5 text-xs text-shell-primary hover:bg-shell-hover rounded-shell text-left"
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Character Limit Indicators */}
              <div className="flex items-center gap-4 text-xs font-semibold">
                {/* Twitter indicator */}
                <div className="flex items-center gap-1.5">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      content.length > 280 ? 'bg-red-500 animate-pulse' : 'bg-sky-400'
                    }`}
                  />
                  <span className={content.length > 280 ? 'text-red-400' : 'text-shell-muted'}>
                    {content.length}/280
                  </span>
                </div>

                {/* LinkedIn indicator */}
                <div className="flex items-center gap-1.5">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      content.length > 3000 ? 'bg-red-500 animate-pulse' : 'bg-indigo-500'
                    }`}
                  />
                  <span className={content.length > 3000 ? 'text-red-400' : 'text-shell-muted'}>
                    {content.length}/3000
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Assistant Toolkit */}
          <div className="rounded-shell-lg border border-[#312e81]/30 bg-shell-raised p-4 shadow-sm relative overflow-hidden">
            {/* Subtle glow background */}
            <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-3.5">
              <Sparkles className="h-4.5 w-4.5 text-indigo-400" />
              <h3 className="text-sm font-semibold text-shell-primary">AI Assistant</h3>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {/* Improve Writing */}
              <button
                type="button"
                onClick={() => handleAIAction('improve')}
                className="flex items-center gap-2.5 rounded-shell border border-shell-subtle bg-shell-elevated px-3 py-2.5 text-sm font-medium text-shell-secondary hover:bg-shell-hover hover:text-shell-primary hover:border-indigo-500/30 transition-all text-left"
              >
                <PenLine className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>Improve Writing</span>
              </button>

              {/* Rewrite */}
              <button
                type="button"
                onClick={() => handleAIAction('rewrite')}
                className="flex items-center gap-2.5 rounded-shell border border-shell-subtle bg-shell-elevated px-3 py-2.5 text-sm font-medium text-shell-secondary hover:bg-shell-hover hover:text-shell-primary hover:border-indigo-500/30 transition-all text-left"
              >
                <RotateCw className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>Rewrite</span>
              </button>

              {/* Tone Switcher */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowTonePicker(!showTonePicker)}
                  className="flex w-full items-center justify-between rounded-shell border border-shell-subtle bg-shell-elevated px-3 py-2.5 text-sm font-medium text-shell-secondary hover:bg-shell-hover hover:text-shell-primary hover:border-indigo-500/30 transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Sliders className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span>Tone Switcher</span>
                  </div>
                  <ChevronDown className="h-4.5 w-4.5 text-shell-muted" />
                </button>

                {showTonePicker && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowTonePicker(false)} />
                    <div className="absolute bottom-11 left-0 z-20 w-full rounded-shell border border-shell-default bg-shell-raised p-1 shadow-glass animate-fade-in max-h-48 overflow-y-auto scrollbar-thin">
                      {TONES.map((tone) => (
                        <button
                          key={tone.name}
                          type="button"
                          onClick={() => handleAIAction('tone', tone.text)}
                          className="flex w-full flex-col px-3 py-2 hover:bg-shell-hover rounded-shell text-left"
                        >
                          <span className="text-xs font-semibold text-indigo-300">{tone.name}</span>
                          <span className="text-[10px] text-shell-muted truncate w-full">{tone.text}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Generate Hashtags */}
              <button
                type="button"
                onClick={() => handleAIAction('hashtags')}
                className="flex items-center gap-2.5 rounded-shell border border-shell-subtle bg-shell-elevated px-3 py-2.5 text-sm font-medium text-shell-secondary hover:bg-shell-hover hover:text-shell-primary hover:border-indigo-500/30 transition-all text-left"
              >
                <Hash className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>Generate Hashtags</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Multi-platform Preview (5 cols) */}
        <div className="space-y-4 lg:col-span-5">
          {/* Top Platform Switcher Pills */}
          <div className="flex items-center gap-1 rounded-shell bg-shell-raised p-1 border border-shell-default max-w-max">
            <button
              type="button"
              onClick={() => setActivePreview('linkedin')}
              className={`flex items-center gap-1.5 rounded-shell px-3 py-1.5 text-xs font-semibold transition-all ${
                activePreview === 'linkedin'
                  ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-sm'
                  : 'text-shell-muted hover:text-shell-primary border border-transparent'
              }`}
            >
              <div className="h-2 w-2 rounded-full bg-[#0077b5]" />
              <span>LinkedIn</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePreview('facebook')}
              className={`flex items-center gap-1.5 rounded-shell px-3 py-1.5 text-xs font-semibold transition-all ${
                activePreview === 'facebook'
                  ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-sm'
                  : 'text-shell-muted hover:text-shell-primary border border-transparent'
              }`}
            >
              <div className="h-2 w-2 rounded-full bg-[#1877f2]" />
              <span>Facebook</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePreview('instagram')}
              className={`flex items-center gap-1.5 rounded-shell px-3 py-1.5 text-xs font-semibold transition-all ${
                activePreview === 'instagram'
                  ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-sm'
                  : 'text-shell-muted hover:text-shell-primary border border-transparent'
              }`}
            >
              <div className="h-2 w-2 rounded-full bg-[#e1306c]" />
              <span>Instagram</span>
            </button>
          </div>

          {/* Social Platform Mock Card Container */}
          <div className="rounded-shell-lg border border-shell-default bg-[#121318] p-5 shadow-premium min-h-[400px] flex flex-col">
            {activePreview === 'linkedin' && (
              <div className="flex-1 flex flex-col justify-between">
                {/* LinkedIn Card */}
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex gap-2.5">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-indigo-600 text-xs font-semibold flex items-center justify-center text-white border border-indigo-500/20">
                        YK
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold text-slate-100 hover:text-indigo-400 hover:underline cursor-pointer">
                            Yuvraj Kumar
                          </span>
                          <span className="text-xs text-slate-400">• 1st</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          Software Engineer & Content Creator
                        </p>
                        <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-400">
                          <span>Just now</span>
                          <span>•</span>
                          <Globe className="h-2.5 w-2.5" />
                        </div>
                      </div>
                    </div>
                    <button type="button" className="text-slate-400 hover:text-slate-200">
                      <MoreHorizontal className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="text-[13px] leading-relaxed text-slate-200 whitespace-pre-wrap select-text">
                    {content.trim() ? (
                      content
                    ) : (
                      <span className="text-slate-500 italic">Preview will appear here...</span>
                    )}
                  </div>

                  {/* Attached Media */}
                  {selectedImage && (
                    <div className="mt-3.5 rounded overflow-hidden border border-slate-800">
                      <img src={selectedImage} alt="Post content preview" className="w-full object-cover max-h-72" />
                    </div>
                  )}

                  {/* Location label (Custom addition inside feed if relevant) */}
                  {location && (
                    <p className="text-[11px] text-indigo-400 mt-2 font-medium">📍 {location}</p>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="mt-6 pt-2 border-t border-slate-800 flex items-center justify-between text-slate-400">
                  <button type="button" className="flex items-center gap-1.5 py-1 px-2.5 rounded hover:bg-slate-800 transition-colors text-xs font-semibold hover:text-slate-200">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Like</span>
                  </button>
                  <button type="button" className="flex items-center gap-1.5 py-1 px-2.5 rounded hover:bg-slate-800 transition-colors text-xs font-semibold hover:text-slate-200">
                    <MessageSquare className="h-4 w-4" />
                    <span>Comment</span>
                  </button>
                  <button type="button" className="flex items-center gap-1.5 py-1 px-2.5 rounded hover:bg-slate-800 transition-colors text-xs font-semibold hover:text-slate-200">
                    <Repeat className="h-4 w-4" />
                    <span>Repost</span>
                  </button>
                  <button type="button" className="flex items-center gap-1.5 py-1 px-2.5 rounded hover:bg-slate-800 transition-colors text-xs font-semibold hover:text-slate-200">
                    <Send className="h-4 w-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            )}

            {activePreview === 'facebook' && (
              <div className="flex-1 flex flex-col justify-between">
                {/* Facebook Card */}
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-2.5">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-indigo-600 text-xs font-semibold flex items-center justify-center text-white border border-indigo-500/20">
                        YK
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-100 hover:underline cursor-pointer">
                          Yuvraj Kumar
                        </span>
                        <div className="flex items-center gap-1 mt-0.5 text-[11px] text-slate-400">
                          <span>Just now</span>
                          <span>•</span>
                          <span className="font-semibold">👥</span>
                        </div>
                      </div>
                    </div>
                    <button type="button" className="text-slate-400 hover:text-slate-200">
                      <MoreHorizontal className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="text-[13px] leading-relaxed text-slate-200 whitespace-pre-wrap select-text">
                    {content.trim() ? (
                      content
                    ) : (
                      <span className="text-slate-500 italic">Preview will appear here...</span>
                    )}
                  </div>

                  {/* Attached Media */}
                  {selectedImage && (
                    <div className="mt-3 rounded overflow-hidden border border-slate-800">
                      <img src={selectedImage} alt="Post content preview" className="w-full object-cover max-h-72" />
                    </div>
                  )}

                  {/* Location label */}
                  {location && (
                    <p className="text-[11px] text-slate-400 mt-2">
                      — at <span className="font-semibold text-slate-200">{location}</span>
                    </p>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="mt-6 pt-2 border-t border-slate-850 flex items-center justify-around text-slate-400">
                  <button type="button" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-slate-800 transition-colors text-xs font-semibold hover:text-slate-200">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Like</span>
                  </button>
                  <button type="button" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-slate-800 transition-colors text-xs font-semibold hover:text-slate-200">
                    <MessageSquare className="h-4 w-4" />
                    <span>Comment</span>
                  </button>
                  <button type="button" className="flex items-center gap-2 py-1 px-4 rounded hover:bg-slate-800 transition-colors text-xs font-semibold hover:text-slate-200">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            )}

            {activePreview === 'instagram' && (
              <div className="flex-1 flex flex-col justify-between">
                {/* Instagram Card */}
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 shrink-0 rounded-full bg-indigo-600 text-[10px] font-semibold flex items-center justify-center text-white border border-indigo-500/20">
                        YK
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-100 hover:underline cursor-pointer">
                          yuvraj_kumar
                        </span>
                        {location && <span className="text-[9px] text-slate-400 leading-none">{location}</span>}
                      </div>
                    </div>
                    <button type="button" className="text-slate-400 hover:text-slate-200">
                      <MoreHorizontal className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  {/* Attached Media is CRITICAL for Instagram */}
                  <div className="my-2 rounded overflow-hidden bg-slate-900 border border-slate-850 aspect-video flex items-center justify-center text-center">
                    {selectedImage ? (
                      <img src={selectedImage} alt="Post content preview" className="w-full h-full object-cover max-h-64" />
                    ) : (
                      <div className="p-4 flex flex-col items-center">
                        <AlertCircle className="h-7 w-7 text-indigo-400 mb-2" />
                        <p className="text-xs text-slate-400 max-w-[240px]">
                          Instagram posts require an image. Please attach an image in the editor.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Engagement icons row */}
                  <div className="flex items-center justify-between text-slate-200 py-1.5">
                    <div className="flex items-center gap-3">
                      <button type="button" className="hover:text-slate-400 transition-colors">
                        <Heart className="h-4.5 w-4.5" />
                      </button>
                      <button type="button" className="hover:text-slate-400 transition-colors">
                        <MessageSquare className="h-4.5 w-4.5" />
                      </button>
                      <button type="button" className="hover:text-slate-400 transition-colors">
                        <Send className="h-4.5 w-4.5" />
                      </button>
                    </div>
                    <button type="button" className="hover:text-slate-400 transition-colors">
                      <Bookmark className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  {/* Post Caption */}
                  <div className="text-xs text-slate-200 mt-1 select-text">
                    <span className="font-bold text-slate-100 mr-2">yuvraj_kumar</span>
                    <span className="whitespace-pre-wrap">
                      {content.trim() ? (
                        content
                      ) : (
                        <span className="text-slate-500 italic">Caption preview...</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-4">
                  Just now
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM WORKSPACE ACTION BAR */}
      <footer className={cn(
        "fixed bottom-0 right-0 left-0 z-30 border-t border-shell-default bg-[#0d0e12]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-premium transition-all duration-300 ease-out",
        collapsed ? "lg:left-[72px]" : "lg:left-[260px]"
      )}>
        <div>
          <button
            type="button"
            onClick={handleDiscard}
            className="flex items-center gap-2 rounded-shell border border-shell-subtle bg-transparent px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all"
          >
            <Trash2 className="h-4 w-4" />
            <span>Discard</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {isScheduled && (
            <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 border border-indigo-500/20">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                Scheduled for {scheduledDate} at {scheduledTime}
              </span>
              <button
                type="button"
                onClick={cancelSchedule}
                className="ml-1 text-indigo-400 hover:text-indigo-200 font-bold"
                title="Cancel schedule"
              >
                ✕
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => showToast('Draft saved successfully', 'info')}
            className="rounded-shell border border-shell-subtle bg-shell-raised px-4.5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-shell-hover hover:text-shell-primary transition-all"
          >
            Save Draft
          </button>

          {/* Schedule Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSchedulePicker(!showSchedulePicker)}
              className={`flex items-center gap-2 rounded-shell border px-4.5 py-2.5 text-sm font-semibold transition-all ${
                isScheduled
                  ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
                  : 'border-shell-subtle bg-shell-raised text-slate-200 hover:bg-shell-hover hover:text-shell-primary'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>Schedule</span>
            </button>

            {showSchedulePicker && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowSchedulePicker(false)} />
                <div className="absolute bottom-12 right-0 z-20 w-72 rounded-shell border border-shell-default bg-shell-raised p-4 shadow-glass animate-fade-in space-y-3">
                  <div className="flex items-center justify-between border-b border-shell-subtle pb-2">
                    <span className="text-xs font-semibold text-shell-primary">Schedule Post</span>
                    <button type="button" onClick={() => setShowSchedulePicker(false)} className="text-shell-muted hover:text-shell-primary">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-shell-muted mb-1">Date</label>
                      <input
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="w-full rounded-shell border border-shell-subtle bg-shell-elevated px-3 py-1.5 text-xs text-shell-primary focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-shell-muted mb-1">Time</label>
                      <input
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="w-full rounded-shell border border-shell-subtle bg-shell-elevated px-3 py-1.5 text-xs text-shell-primary focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowSchedulePicker(false)}
                      className="flex-1 rounded-shell bg-shell-elevated py-1.5 text-xs font-semibold text-slate-300 hover:bg-shell-hover"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={confirmSchedule}
                      className="flex-1 rounded-shell bg-indigo-600 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Publish / Schedule Submit Button */}
          <button
            type="button"
            onClick={handlePublish}
            disabled={aiLoading}
            className="flex items-center gap-2 rounded-shell bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-premium hover:opacity-95 active:opacity-90 transition-opacity"
          >
            <span>{isScheduled ? 'Schedule Post' : 'Publish Now'}</span>
            <Send className="h-3.5 w-3.5 rotate-45" />
          </button>
        </div>
      </footer>
    </div>
  )
}
