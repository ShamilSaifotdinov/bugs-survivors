import { createBrowserRouter } from 'react-router-dom'

import Discovery from './pages/Discovery'
import Leaderboard from './pages/Leaderboard'
import RegisterPage from './pages/registration/RegisterPage'
import Login from './pages/Login'
import Forum from './pages/Forum'
import MainMenu from './pages/MainMenu'
import ProfilePage from './pages/Profile'
import ErrorPage404 from './pages/ErrorPage404'
import ErrorPage from './pages/Error'
import ErrorPage500 from './pages/Error500'
import GameOver from './pages/GameOver'
import Game from './pages/Game'

const errorBoundary = <ErrorPage title="Something went wrong :( Try later." />

const router = createBrowserRouter(
  [
    {
      path: '/error500',
      element: <ErrorPage500 />,
    },
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
      element: <Login />,
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
      path: '/game',
      element: <Game />,
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
    {
      path: '/gameOver',
      element: <GameOver />,
    },
  ].map(item => ({ ...item, errorElement: errorBoundary }))
)

export default router
