import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../layouts/AppShell'
import { ShellDemoPage } from '../pages/ShellDemoPage'
import { CreatePostPage } from '../pages/CreatePostPage'
import { ConnectedAccountsPage } from '../pages/ConnectedAccountsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
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
