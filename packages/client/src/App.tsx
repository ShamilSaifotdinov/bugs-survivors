import { forwardRef } from 'react'
import {
  RouterProvider,
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'
import router from './router'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import './global.scss'
import { LinkProps } from '@mui/material/Link'

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
