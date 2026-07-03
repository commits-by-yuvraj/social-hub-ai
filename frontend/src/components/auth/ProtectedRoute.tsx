import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Sparkles } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-shell-base">
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-gradient shadow-lg shadow-indigo-500/20 animate-pulse">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <p className="mt-4 text-xs font-semibold tracking-wider uppercase text-shell-secondary animate-pulse">
          Loading workspace...
        </p>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login page and save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
