import { forwardRef } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import './global.scss'
import { LinkProps } from '@mui/material/Link'

import Discovery from './pages/Discovery'
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
])

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props
  return <RouterLink ref={ref} to={href} {...other} />
})

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#117738',
    },
    secondary: {
      main: '#d9ba20',
    },
  },
  typography: {
    fontFamily: ['"Press Start 2P"', '"Roboto"'].join(','),
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
}
const theme = createTheme(themeOptions)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
