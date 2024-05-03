import { createBrowserRouter } from 'react-router-dom'

import Discovery from './pages/Discovery'
import Leaderboard from './pages/Leaderboard'
import Error_404 from './pages/404'
import Forum from './pages/Forum'
import MainMenu from './pages/MainMenu'
import Login from './pages/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Discovery />,
    errorElement: <Error_404 />,
  },
  {
    path: '/main_menu',
    element: <MainMenu />,
  },
  {
    path: '/signin',
    element: <Login />,
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
    element: <Forum />,
    children: [
      {
        path: '/forum/:forumId',
        element: <Forum />,
        children: [
          {
            path: '/forum/:forumId/:topicId',
            element: <Forum />,
          },
        ],
      },
    ],
    errorElement: <Error_404 />,
  },
])

export default router
