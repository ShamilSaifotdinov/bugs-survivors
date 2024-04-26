import { createBrowserRouter } from 'react-router-dom'

import Discovery from './pages/Discovery'
import Leaderboard from './pages/Leaderboard'
import Error_404 from './pages/404'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Discovery />,
    errorElement: <Error_404 />,
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
    element: <Leaderboard />,
    errorElement: <Error_404 />,
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
])

export default router
