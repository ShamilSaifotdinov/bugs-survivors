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
      main: '#F2F9F8',
      contrastText: '#3F767B',
      // light: '#C1E0DF',
      // main: '#3F767B',
      // dark: '#345256',
      // contrastText: '#fff',
    },
    secondary: {
      main: '#3F767B',
      contrastText: '#F2F9F8',
      // main: '#FF5C00',
    },
    text: {
      primary: '#345256',
      secondary: '#fff',
      disabled: '#ddd',
    },
    background: {
      // default: 'var(--primary-color-main)',
      default: 'var(--primary-color-light)',
      paper: '#2F464A',
    },
    // error: {
    //   main: '#f44336',
    //   light: '#e57373',
    //   dark: '#d32f2f',
    //   contrastText: '#fff',
    // },
    // warning: {
    //   main: '#ff9800',
    //   light: '#ffb74d',
    //   dark: '#f57c00',
    //   contrastText: '#fff',
    // },
    // info: {
    //   main: '#2196f3',
    //   light: '#64b5f6',
    //   dark: '#1976d2',
    //   contrastText: '#fff',
    // },
    // success: {
    //   main: '#4caf50',
    //   light: '#81c784',
    //   dark: '#388e3c',
    //   contrastText: '#fff',
    // },
    divider: '#fff',
  },
  typography: {
    fontFamily: ['"Press Start 2P"', 'sans-serif'].join(','),
    fontSize: 16,
    fontWeightRegular: 400,
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
          color: 'var(--primary-color-dark)',
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
          fontFamily: 'var(--secondary-font)',
          fontWeight: '400',
          padding: '1px 0.25rem 1px 0.25rem',
          borderRadius: '0.25rem',
          fontSize: '1rem',
          backgroundColor: 'var(--primary-color-light)',
          color: 'var(--background-color)',
        },
      },
    },
    MuiAvatar: {
      defaultProps: {
        src: '/images/defaultAvatar.png',
      },
    },
  },
})
