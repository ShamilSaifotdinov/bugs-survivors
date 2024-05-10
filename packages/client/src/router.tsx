import { createBrowserRouter } from 'react-router-dom'

import Discovery from './pages/Discovery'
import Leaderboard from './pages/Leaderboard'
import RegisterPage from './pages/registration/RegisterPage'
import Forum from './pages/Forum'
import MainMenu from './pages/MainMenu'
import ProfilePage from './pages/Profile/ProfilePage'
import ErrorPage404 from './pages/ErrorPage404'
import ErrorPage from './pages/Error'

const errorBoundary = <ErrorPage title="Something went wrong :( Try later." />

const router = createBrowserRouter(
  [
    {
      path: '*',
      element: <ErrorPage404 />,
    },
    {
      path: '/',
      element: <Discovery />,
    },
    {
      path: '/main_menu',
      element: <MainMenu />,
    },
    {
      path: '/signin',
      element: <div>Sign in!</div>,
    },
    {
      path: '/signup',
      element: <RegisterPage />,
    },
    {
      path: '/profile',
      element: <ProfilePage />,
    },
    {
      path: '/leaderboard',
      element: <Leaderboard />,
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
    },
  ].map(item => ({ ...item, errorElement: errorBoundary }))
)

export default router
