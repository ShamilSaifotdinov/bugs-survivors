import { createBrowserRouter } from 'react-router-dom'

import Discovery from './pages/Discovery'
import ErrorPage from './pages/Error'

const errorBoundary = <ErrorPage title="Something went wrong :( Try later." />

const router = createBrowserRouter(
  [
    {
      path: '*',
      element: <ErrorPage title="404" />,
    },
    {
      path: '/',
      element: <Discovery />,
    },
    {
      path: '/signin',
      element: <div>Sign in!</div>,
    },
    {
      path: '/signup',
      element: <div>Sign up!</div>,
    },
    {
      path: '/profile',
      element: <div>Profile!</div>,
    },
    {
      path: '/leaderboard',
      element: <div>Leaderboard!</div>,
    },
    {
      path: '/forum',
      element: <div>Forum!</div>,
    },
    {
      path: '/forum/:forumId',
      element: <div>One of forums!</div>,
    },
    {
      path: '/forum/:forumId/:topicId',
      element: <div>Topic of forum!</div>,
    },
  ].map(item => ({ ...item, errorElement: errorBoundary }))
)

export default router
