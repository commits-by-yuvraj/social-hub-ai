import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Share2, Sparkles, Calendar, BarChart3, ShieldCheck } from 'lucide-react'
import {
  AuthCard,
  Input,
  PasswordInput,
  Checkbox,
  Button,
  Divider,
  SocialLoginButton,
  ErrorMessage,
  SuccessMessage,
} from '../../components/auth/AuthComponents'
import { useAuth } from '../../context/AuthContext'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
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
    if (!password) {
      setError('Password is required')
      return false
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
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

    // Simulate login request API
    setTimeout(() => {
      setLoading(false)
      if (email === 'demo@socialhub.ai' && password === 'password123') {
        setSuccess('Success! Signing in...')
        login('Demo User', email)
        setTimeout(() => {
          navigate('/')
        }, 1200)
      } else {
        setError('Invalid email or password. Use demo@socialhub.ai / password123')
      }
    }, 1500)
  }

  const handleGoogleLogin = () => {
    setLoading(true)
    setError('')
    setTimeout(() => {
      setLoading(false)
      setSuccess('Google OAuth mock successful! Redirecting...')
      login('Google User', 'google.user@gmail.com')
      setTimeout(() => {
        navigate('/')
      }, 1200)
    }, 1200)
  }

  return (
    <div className="flex min-h-screen bg-shell-base overflow-hidden">
      {/* LEFT SIDE: HERO FEATURE SECTION (Hidden on mobile) */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-shell-raised/40 p-12 lg:flex border-r border-shell-subtle">
        {/* Decorative Gradients */}
        <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

        {/* Brand Header */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gradient shadow-md shadow-indigo-500/20">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tight text-shell-primary bg-gradient-to-r from-indigo-200 to-indigo-400 bg-clip-text text-transparent">
            SocialHub AI
          </span>
        </div>

        {/* Feature Highlights */}
        <div className="relative space-y-8 my-auto max-w-lg">
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-shell-primary leading-tight lg:text-5xl">
              Manage every social platform from one intelligent workspace.
            </h1>
            <p className="text-base text-shell-secondary">
              Generate content, automate scheduling, and track unified analytics with next-gen AI models.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-400">
                <Share2 className="h-3.5 w-3.5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-shell-primary">Multi-platform publishing</h4>
                <p className="text-xs text-shell-secondary">Cross-post to LinkedIn, Instagram, Facebook, Threads and more in one click.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-400">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-shell-primary">AI-powered content creation</h4>
                <p className="text-xs text-shell-secondary">Generate copy, rewrite tones, and generate hashtags with a premium sidebar co-pilot.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-400">
                <Calendar className="h-3.5 w-3.5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-shell-primary">Smart scheduling</h4>
                <p className="text-xs text-shell-secondary">Queue content to publish automatically at high-engagement target intervals.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-400">
                <BarChart3 className="h-3.5 w-3.5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-shell-primary">Analytics</h4>
                <p className="text-xs text-shell-secondary">Audit posts analytics, follower growth, and click statistics in real time.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-400">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-shell-primary">Secure OAuth connections</h4>
                <p className="text-xs text-shell-secondary">Access account scopes using standard OAuth authentication pipelines securely.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative text-xs text-shell-muted">
          &copy; {new Date().getFullYear()} SocialHub AI. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE: AUTHENTICATION CONTAINER */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {/* Background blobs for mobile */}
        <div className="absolute inset-0 bg-radial-gradient from-indigo-500/5 via-transparent to-transparent pointer-events-none lg:hidden" />
        <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-indigo-600/5 blur-[100px] pointer-events-none lg:hidden" />

        {/* Mobile Header (Hidden on desktop) */}
        <div className="mb-8 flex flex-col items-center gap-2 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-gradient">
            <Sparkles className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="text-lg font-bold text-shell-primary">SocialHub AI</span>
        </div>

        <AuthCard>
          <div className="space-y-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h2 className="text-2xl font-bold tracking-tight text-shell-primary">Welcome Back</h2>
              <p className="text-sm text-shell-secondary">
                Sign in to continue managing your social media workspace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <ErrorMessage message={error} />
              <SuccessMessage message={success} />

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

              <div className="space-y-1.5">
                <PasswordInput
                  label="Password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <Checkbox
                  label="Remember Me"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" loading={loading} className="mt-2">
                Sign In
              </Button>
            </form>

            <Divider>OR</Divider>

            <SocialLoginButton onClick={handleGoogleLogin} />

            <div className="text-center text-xs text-shell-secondary">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none"
              >
                Create Account
              </Link>
            </div>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}
