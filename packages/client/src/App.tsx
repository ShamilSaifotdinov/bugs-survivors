import { useEffect } from 'react'
import RegisterPage from './pages/registration/RegisterPage'
import { createTheme, ThemeProvider } from '@mui/material'
import './App.css'

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'PressStart2P',
    },
    palette: {
      primary: {
        main: '#3F767B',
        contrastText: '#F2F9F8',
      },
      secondary: {
        main: '#C1E0DF',
        contrastText: '#2F464A',
      },
    },

    components: {
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          disableElevation: true,
          variant: 'contained',
        },

        styleOverrides: {
          root: {
            padding: '0.5rem 1.3rem',
            fontSize: '16px',
            lineHeight: '26px',
            font: 'Press Start 2P',
            shadowBox: 'none',
          },
        },
      },

      MuiInputBase: {
        defaultProps: {
          color: 'secondary',
        },
        styleOverrides: {
          root: {
            border: '1px solid #C1E0DF',
            fontSize: '16px',
            lineHeight: '24px',
            fontFamily: 'Roboto',
            fontWeight: '400',
            width: '100%',
            backgroundColor: '#FFFFFF',
            color: '#00000099',
            marginBottom: '1.5rem',
            padding: '1rem 0,75rem ',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontFamily: 'Roboto, sans-serif',
            fontWeight: '400',
            padding: '1px 0.25rem 1px 0.25rem',
            borderRadius: '0.25rem',
            fontSize: '16px',
            lineHeight: '24px',
            color: '#00000099',
            backgroundColor: '#inherit',
            '&.Mui-focused': {
              backgroundColor: '#C1E0DF',
              fontSize: '16px',
              color: '#2F464A',
            },
          },
        },
      },

      MuiTypography: {
        styleOverrides: {
          root: {
            marginBottom: '1.5rem',
          },
        },
      },
    },
  })

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <RegisterPage />
      </ThemeProvider>
    </div>
  )
}

export default App
