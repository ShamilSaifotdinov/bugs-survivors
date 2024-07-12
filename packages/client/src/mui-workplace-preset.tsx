import { forwardRef } from 'react'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'
import { LinkProps } from '@mui/material/Link'
import { createTheme } from '@mui/material'

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

export const theme = createTheme({
  breakpoints: {
    values: breakpoints,
  },

  palette: {
    mode: 'dark',
    common: {
      black: '#000',
      white: '#fff',
    },
    primary: {
      main: '#3F767B',
      contrastText: '#F2F9F8',
    },
    secondary: {
      main: '#C1E0DF',
      contrastText: '#2F464A',
      // main: '#FF5C00',
    },
    text: {
      primary: '#fff',
      secondary: '#000',
      disabled: '#ddd',
    },
    background: {
      default: '#2F464A',
      paper: '#2F464A',
    },
    divider: '#fff',
  },
  typography: {
    fontFamily: ['"Press Start 2P"', 'sans-serif'].join(','),
    fontSize: 16,
    fontWeightRegular: 400,
    body1: {
      color: '#FFFFFF',
    },
    body2: {
      fontSize: '1rem',
    },
    h1: {
      fontSize: '5.3rem',
      // [mediaBreakpoint.lg]: {
      //   fontSize: '2rem',
      // },
      // [mediaBreakpoint.sm]: {
      //   fontSize: '1.75rem',
      // },
    },
    h2: {
      fontSize: '2.3rem',
      // [mediaBreakpoint.lg]: {
      //   fontSize: '1.5rem',
      // },
      // [mediaBreakpoint.sm]: {
      //   fontSize: '1.25rem',
      // },
    },
    h3: {
      fontSize: '1.75rem',
      [mediaBreakpoint.lg]: {
        fontSize: '1.25rem',
      },
      [mediaBreakpoint.sm]: {
        fontSize: '1.1rem',
      },
    },
    h4: {
      fontSize: '1.4rem',
      [mediaBreakpoint.lg]: {
        fontSize: '1.1rem',
      },
      [mediaBreakpoint.sm]: {
        fontSize: '1rem',
      },
    },
    h5: {
      color: '#FFFFFF',
      fontSize: '1.5rem',
      [mediaBreakpoint.lg]: {
        fontSize: '1rem',
      },
      [mediaBreakpoint.sm]: {
        fontSize: '.8rem',
      },
    },
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

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          boxSizing: 'border-box',
          fontSize: '1rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '3px',
          border: '1px solid #C1E0DF',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: 'var(--primary-font)',
          color: '#00000099',
        },
      },
    },

    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          fontFamily: 'var(--primary-font)',
          fontWeight: '400',
          padding: '1px 0.25rem 1px 0.25rem',
          borderRadius: '0.25rem',
          fontSize: '.75rem',
          backgroundColor: '#C1E0DF',
          color: '#2F464A',
        },
      },
    },
  },
})
