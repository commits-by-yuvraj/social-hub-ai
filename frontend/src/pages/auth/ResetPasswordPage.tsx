import React, { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import {
  AuthCard,
  PasswordInput,
  Button,
  ErrorMessage,
  SuccessMessage,
} from '../../components/auth/AuthComponents'

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: 'bg-transparent' }
    let score = 0
    if (password.length >= 8) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    switch (score) {
      case 1:
        return { score: 25, label: 'Weak', color: 'bg-red-500' }
      case 2:
        return { score: 50, label: 'Fair', color: 'bg-amber-500' }
      case 3:
        return { score: 75, label: 'Good', color: 'bg-indigo-500' }
      case 4:
        return { score: 100, label: 'Strong', color: 'bg-emerald-500' }
      default:
        return { score: 10, label: 'Too short', color: 'bg-red-500' }
    }
  }, [password])

  const handleValidation = () => {
    setError('')
    if (!password) {
      setError('New Password is required')
      return false
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
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

    // Simulate password reset save
    setTimeout(() => {
      setLoading(false)
      setSuccess('Your password has been reset successfully!')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
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
              <h2 className="text-2xl font-bold tracking-tight text-shell-primary">Reset Password</h2>
              <p className="text-sm text-shell-secondary">
                Set a strong, secure new password for your workspace account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <ErrorMessage message={error} />
              <SuccessMessage message={success} />

              {!success && (
                <>
                  <div className="space-y-1.5">
                    <PasswordInput
                      label="New Password"
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />

                    {/* Password Strength Meter */}
                    {password && (
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] font-medium text-shell-secondary">
                          <span>Password Strength</span>
                          <span className="font-semibold text-shell-primary">{passwordStrength.label}</span>
                        </div>
                        <div className="h-1 w-full bg-shell-elevated/60 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${passwordStrength.color} transition-all duration-300`}
                            style={{ width: `${passwordStrength.score}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <PasswordInput
                    label="Confirm New Password"
                    id="confirm-password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />

                  <Button type="submit" loading={loading} className="mt-2">
                    Update Password
                  </Button>
                </>
              )}
            </form>

            <div className="text-center text-xs text-shell-secondary">
              Remember your password?{' '}
              <Link
                to="/login"
                className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none"
              >
                Sign In
              </Link>
            </div>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}
