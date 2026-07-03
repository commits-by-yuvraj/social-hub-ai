import React, { useState } from 'react'
import { Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

// ==========================================
// 1. INPUT COMPONENT
// ==========================================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <div className="flex justify-between items-center">
          <label htmlFor={id} className="text-xs font-medium text-shell-secondary">
            {label}
          </label>
        </div>
        <input
          id={id}
          ref={ref}
          className={cn(
            "w-full rounded-xl bg-shell-elevated/40 border border-shell-subtle px-3.5 py-2.5 text-sm text-shell-primary transition-all placeholder:text-shell-muted focus:border-indigo-500/80 focus:bg-shell-elevated/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/10",
            error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/10",
            className
          )}
          {...props}
        />
        {error && (
          <p className="flex items-center gap-1.5 text-xs text-red-400 font-medium">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

// ==========================================
// 2. PASSWORD INPUT COMPONENT
// ==========================================
interface PasswordInputProps extends InputProps {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="w-full space-y-1.5">
        <div className="flex justify-between items-center">
          <label htmlFor={id} className="text-xs font-medium text-shell-secondary">
            {label}
          </label>
        </div>
        <div className="relative">
          <input
            id={id}
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            className={cn(
              "w-full rounded-xl bg-shell-elevated/40 border border-shell-subtle pl-3.5 pr-10 py-2.5 text-sm text-shell-primary transition-all placeholder:text-shell-muted focus:border-indigo-500/80 focus:bg-shell-elevated/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/10",
              error && "border-red-500/50 focus:border-red-500 focus:ring-red-500/10",
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-shell-muted hover:text-shell-primary transition-colors focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
        {error && (
          <p className="flex items-center gap-1.5 text-xs text-red-400 font-medium">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {error}
          </p>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

// ==========================================
// 3. BUTTON & LOADING BUTTON COMPONENT
// ==========================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  loading?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading = false,
  className,
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "relative flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variant === 'primary' &&
          "bg-accent-gradient text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:opacity-95 focus-visible:outline-indigo-500 active:scale-[0.98]",
        variant === 'secondary' &&
          "bg-shell-elevated border border-shell-subtle text-shell-primary hover:bg-shell-hover focus-visible:outline-shell-primary active:scale-[0.98]",
        variant === 'danger' &&
          "bg-red-600/90 text-white shadow-lg shadow-red-600/10 hover:bg-red-600 focus-visible:outline-red-600 active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  )
}

// ==========================================
// 4. CHECKBOX COMPONENT
// ==========================================
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, id, ...props }, ref) => {
    return (
      <div className="flex items-start gap-2.5">
        <input
          id={id}
          ref={ref}
          type="checkbox"
          className={cn(
            "h-4 w-4 rounded border-shell-subtle bg-shell-elevated/40 text-indigo-600 transition focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-0 focus:outline-none accent-indigo-500 shrink-0 mt-0.5 cursor-pointer",
            className
          )}
          {...props}
        />
        <label htmlFor={id} className="text-xs text-shell-secondary cursor-pointer select-none leading-relaxed">
          {label}
        </label>
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

// ==========================================
// 5. DIVIDER COMPONENT
// ==========================================
export const Divider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex items-center py-2">
      <div className="flex-grow border-t border-shell-subtle"></div>
      {children && (
        <span className="mx-3 shrink-0 text-[10px] font-semibold tracking-wider uppercase text-shell-muted">
          {children}
        </span>
      )}
      <div className="flex-grow border-t border-shell-subtle"></div>
    </div>
  )
}

// ==========================================
// 6. AUTHENTICATION CARD
// ==========================================
export const AuthCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-shell-subtle bg-shell-raised/40 p-6 sm:p-8 glass-panel shadow-premium animate-fade-in",
        className
      )}
    >
      {children}
    </div>
  )
}

// ==========================================
// 7. SOCIAL LOGIN BUTTON (GOOGLE)
// ==========================================
export const SocialLoginButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-center gap-2.5 rounded-xl border border-shell-subtle bg-shell-elevated/20 px-4 py-2.5 text-sm font-medium text-shell-primary transition-all duration-200 hover:bg-shell-elevated/60 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/20",
        className
      )}
      {...props}
    >
      <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          fill="#EA4335"
        />
      </svg>
      Continue with Google
    </button>
  )
}

// ==========================================
// 8. STATUS ALERTS (ERROR & SUCCESS)
// ==========================================
export const ErrorMessage: React.FC<{ message: string; className?: string }> = ({
  message,
  className,
}) => {
  if (!message) return null
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-red-500/10 bg-red-500/5 p-3.5 text-xs font-medium text-red-400 animate-slide-in",
        className
      )}
    >
      <AlertCircle className="h-4 w-4 shrink-0 text-red-400/90" />
      <span className="leading-normal">{message}</span>
    </div>
  )
}

export const SuccessMessage: React.FC<{ message: string; className?: string }> = ({
  message,
  className,
}) => {
  if (!message) return null
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-3.5 text-xs font-medium text-emerald-400 animate-slide-in",
        className
      )}
    >
      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400/90" />
      <span className="leading-normal">{message}</span>
    </div>
  )
}
