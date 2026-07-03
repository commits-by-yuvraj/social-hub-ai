import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../layouts/AppShell'
import { ShellDemoPage } from '../pages/ShellDemoPage'
import { CreatePostPage } from '../pages/CreatePostPage'
import { ConnectedAccountsPage } from '../pages/ConnectedAccountsPage'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage'
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage'
import {
  EmailVerificationPendingPage,
  EmailVerificationSuccessPage,
} from '../pages/auth/EmailVerificationPages'

import { ProtectedRoute } from '../components/auth/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/verify-email-pending',
    element: <EmailVerificationPendingPage />,
  },
  {
    path: '/verify-email-success',
    element: <EmailVerificationSuccessPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <ShellDemoPage title="Dashboard" />,
      },
      {
        path: 'create',
        element: <CreatePostPage />,
      },
      {
        path: 'scheduled',
        element: <ShellDemoPage title="Scheduled" />,
      },
      {
        path: 'published',
        element: <ShellDemoPage title="Published" />,
      },
      {
        path: 'analytics',
        element: <ShellDemoPage title="Analytics" />,
      },
      {
        path: 'ai-studio',
        element: <ShellDemoPage title="AI Studio" />,
      },
      {
        path: 'media',
        element: <ShellDemoPage title="Media Library" />,
      },
      {
        path: 'accounts',
        element: <ConnectedAccountsPage />,
      },
      {
        path: 'team',
        element: <ShellDemoPage title="Team" />,
      },
      {
        path: 'settings',
        element: <ShellDemoPage title="Settings" />,
      },
    ],
  },
])
