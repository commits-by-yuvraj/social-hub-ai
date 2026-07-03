import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Mail, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react'
import { AuthCard, Button } from '../../components/auth/AuthComponents'

// ==========================================
// 1. EMAIL VERIFICATION PENDING PAGE
// ==========================================
export const EmailVerificationPendingPage: React.FC = () => {
  const navigate = useNavigate()
  const [resending, setResending] = useState(false)
  const [message, setMessage] = useState('')

  const handleResend = () => {
    setResending(true)
    setMessage('')
    setTimeout(() => {
      setResending(false)
      setMessage('Verification link resent successfully!')
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-shell-base items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative">
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gradient shadow-md shadow-indigo-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-shell-primary bg-gradient-to-r from-indigo-200 to-indigo-400 bg-clip-text text-transparent">
            SocialHub AI
          </span>
        </div>

        <AuthCard>
          <div className="space-y-6 text-center">
            {/* SVG Illustration Placeholder: Mail Sending */}
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-500/5 border border-indigo-500/10">
              <div className="absolute inset-0 rounded-full bg-indigo-500/2 blur-lg animate-pulse" />
              <Mail className="h-10 w-10 text-indigo-400 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-shell-primary">Verify your email</h2>
              <p className="text-sm text-shell-secondary leading-relaxed px-2">
                We've sent a verification link to your email address. Please check your inbox and click the link to activate your account.
              </p>
            </div>

            {message && (
              <p className="text-xs text-emerald-400 font-medium bg-emerald-500/5 border border-emerald-500/10 py-2 rounded-xl">
                {message}
              </p>
            )}

            <div className="space-y-3">
              <Button
                variant="primary"
                onClick={() => navigate('/verify-email-success')}
                className="group"
              >
                <span className="flex items-center gap-1.5">
                  Simulate Email Link Click
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Button>

              <button
                type="button"
                disabled={resending}
                onClick={handleResend}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-shell-subtle bg-shell-elevated/20 px-4 py-2.5 text-xs font-semibold text-shell-secondary hover:text-shell-primary transition-colors focus:outline-none"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${resending ? 'animate-spin' : ''}`} />
                {resending ? 'Resending verification email...' : "Didn't receive email? Resend"}
              </button>
            </div>

            <div className="text-xs text-shell-muted">
              Need help? Contact{' '}
              <a href="mailto:support@socialhub.ai" className="text-indigo-400 hover:text-indigo-300">
                support@socialhub.ai
              </a>
            </div>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}

// ==========================================
// 2. EMAIL VERIFICATION SUCCESS PAGE
// ==========================================
export const EmailVerificationSuccessPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen bg-shell-base items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative">
        {/* Brand Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gradient shadow-md shadow-indigo-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-shell-primary bg-gradient-to-r from-indigo-200 to-indigo-400 bg-clip-text text-transparent">
            SocialHub AI
          </span>
        </div>

        <AuthCard>
          <div className="space-y-6 text-center">
            {/* SVG Illustration Placeholder: Success Shield */}
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/5 border border-emerald-500/10">
              <div className="absolute inset-0 rounded-full bg-emerald-500/2 blur-lg" />
              <ShieldCheck className="h-12 w-12 text-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-shell-primary">Verification Successful</h2>
              <p className="text-sm text-shell-secondary leading-relaxed px-2">
                Your email address has been verified. You can now access all of the smart publishing tools inside SocialHub AI.
              </p>
            </div>

            <Button variant="primary" onClick={() => navigate('/login')}>
              Continue to Login
            </Button>

            <div className="text-xs text-shell-muted">
              Redirecting you or click above to continue.
            </div>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}
