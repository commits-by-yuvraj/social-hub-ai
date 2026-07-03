import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowLeft } from 'lucide-react'
import {
  AuthCard,
  Input,
  Button,
  ErrorMessage,
  SuccessMessage,
} from '../../components/auth/AuthComponents'

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleValidation = () => {
    setError('')
    if (!email.trim()) {
      setError('Email address is required')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!handleValidation()) return

    setLoading(true)
    setError('')
    setSuccess('')

    // Simulate password reset send
    setTimeout(() => {
      setLoading(false)
      setSuccess('We have emailed your password reset link! Check your inbox.')
      setEmail('')
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
          <div className="space-y-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h2 className="text-2xl font-bold tracking-tight text-shell-primary">Forgot Password</h2>
              <p className="text-sm text-shell-secondary">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <ErrorMessage message={error} />
              <SuccessMessage message={success} />

              {!success && (
                <>
                  <Input
                    label="Email address"
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />

                  <Button type="submit" loading={loading} className="mt-2">
                    Send Reset Link
                  </Button>
                </>
              )}
            </form>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}
