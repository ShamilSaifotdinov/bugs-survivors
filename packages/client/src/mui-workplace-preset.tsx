import { forwardRef } from 'react'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'
import { LinkProps } from '@mui/material/Link'
import { ThemeOptions } from '@mui/material'

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props
  return <RouterLink ref={ref} to={href} {...other} />
})

const breakpoints = {
  xs: 360,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1640,
}
const mediaBreakpoint = {
  xs: '@media (max-width:360px)',
  sm: '@media (max-width:576px)',
  md: '@media (max-width:768px)',
  lg: '@media (max-width:992px)',
  xl: '@media (max-width:1200px)',
  xxl: '@media (max-width:1640px)',
}

export const themeOptions: ThemeOptions = {
  breakpoints: {
    values: breakpoints,
  },
  palette: {
    mode: 'dark',
    primary: {
      light: '#C1E0DF',
      main: '#3F767B',
      dark: '#345256',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF5C00',
    },
    background: {
      default: '#2F464A',
      paper: '#2F464A',
    },
  },
  typography: {
    fontFamily: ['"Press Start 2P"', 'sans-serif'].join(','),
    fontSize: 16,
    fontWeightRegular: 400,
    h2: {
      fontSize: '3rem',
      [mediaBreakpoint.lg]: {
        fontSize: '2rem',
      },
      [mediaBreakpoint.sm]: {
        fontSize: '1.25rem',
      },
    },
    // h1
    // h2
    // h3
    // h4
    // h5
    // h6
    // subtitle1
    // subtitle2
    // body1
    // body2
    // button
    // caption
    // overline
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
      styleOverrides: {
        root: {
          textDecoration: 'none',
          transition: '.2s',
          ':hover': {
            opacity: '.7',
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
}
