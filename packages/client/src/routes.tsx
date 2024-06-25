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
import GamePage from './pages/GamePage'
import { AppDispatch, RootState } from './store'

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
  ctx: PageInitContext
}

type Route = {
  path: string
  element: JSX.Element
  errorElement?: JSX.Element
  fetchData?: (args: PageInitArgs) => Promise<unknown>
}
export type PageInitContext = {
  clientToken?: string
}

const errorBoundary = <ErrorPage title="Something went wrong :( Try later." />

const routes = [
  {
    path: '/error500',
    element: <ErrorPage500 />,
  },
  {
    path: '*',
    element: <ErrorPage404 />,
  },
  {
    path: '/main_menu',
    element: <MainMenu />,
  },
  {
    path: '/',
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
    path: '/forum',
    element: <Forum />,
    children: [
      {
        path: '/forum/:topicId',
        element: <Forum />,
      },
    ],
  },
  {
    path: '/game',
    element: <GamePage />,
  },
  {
    path: '/gameOver',
    element: <GameOver />,
  },
].map((item: Route) => ({
  ...item,
  // TODO: Заменить на нужных страницах fetchData для загрузки данных с сервера
  //       для отображения данных на странице при первом рендеринге
  fetchData: item?.fetchData ? item.fetchData : () => Promise.resolve(),
  errorElement: errorBoundary,
}))

export default routes
