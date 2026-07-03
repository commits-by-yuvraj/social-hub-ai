import { zodResolver } from '@hookform/resolvers/zod'
import { Bot, Send, Sparkles, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAIPanel } from '../../hooks/useAIPanel'
import { cn } from '../../lib/utils'

const promptSchema = z.object({
  prompt: z.string().min(1, 'Enter a prompt'),
})

type PromptForm = z.infer<typeof promptSchema>

const recentActions = [
  'Generated caption for Instagram post',
  'Suggested hashtags for product launch',
  'Rewrote LinkedIn thread intro',
  'Scheduled reply tone adjustment',
]

interface AIPanelProps {
  className?: string
}

export function AIPanel({ className }: AIPanelProps) {
  const { isOpen, close } = useAIPanel()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PromptForm>({
    resolver: zodResolver(promptSchema),
    defaultValues: { prompt: '' },
  })

  const onSubmit = (data: PromptForm) => {
    reset()
    void data
  }

  if (!isOpen) return null

  return (
    <>
      <button
        type="button"
        aria-label="Close AI panel overlay"
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
        onClick={close}
      />
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 flex h-full w-full flex-col border-l border-shell-default glass-panel shadow-glass animate-slide-in-right sm:w-[380px]',
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-shell-subtle px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-shell bg-accent-gradient">
              <Bot className="h-4 w-4 text-white" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-shell-primary">AI Assistant</h2>
              <p className="text-xs text-shell-muted">Powered by SocialHub AI</p>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close AI assistant"
            className="flex h-8 w-8 items-center justify-center rounded-shell text-shell-muted transition-colors hover:bg-shell-hover hover:text-shell-primary"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-shell-muted">
            Recent actions
          </p>
          <ul className="space-y-2">
            {recentActions.map((action) => (
              <li
                key={action}
                className="flex items-start gap-2 rounded-shell bg-shell-elevated p-3 text-sm text-shell-secondary"
              >
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-400" />
                {action}
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-t border-shell-subtle p-4"
        >
          <div className="relative">
            <textarea
              {...register('prompt')}
              rows={3}
              placeholder="Ask AI to draft, schedule, or optimize..."
              className="w-full resize-none rounded-shell-lg border border-shell-subtle bg-shell-elevated px-4 py-3 pr-12 text-sm text-shell-primary placeholder:text-shell-muted transition-all focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <button
              type="submit"
              aria-label="Send prompt"
              className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-shell bg-accent-gradient text-white transition-opacity hover:opacity-90"
            >
              <Send className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
          {errors.prompt && (
            <p className="mt-2 text-xs text-red-400">{errors.prompt.message}</p>
          )}
        </form>
      </aside>
    </>
  )
}
