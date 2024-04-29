import { useEffect } from 'react'
import RegisterPage from './pages/registration/RegisterPage'
import { createTheme, ThemeProvider } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/login/LoginPage'

const theme = createTheme({
  typography: {
    fontFamily: 'PressStart2P',
    body1: {
      color: '#FFFFFF',
    },
    h5: {
      color: '#FFFFFF',
    },
    h1: {
      fontSize: '5.3rem',
      lineHeight: '4.9rem',
      textAlign: 'center',
    },
    h2: {
      fontSize: '2.3rem',
      lineHeight: '2.2rem',
      textAlign: 'center',
    },
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
          fontSize: '1rem',
          lineHeight: '1.5rem',
          font: 'Press Start 2P',
          shadowBox: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          boxSizing: 'border-box',
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
          fontSize: '1rem',
          lineHeight: '1.4rem',
          fontFamily: 'Roboto',
          fontWeight: '400',
          width: '100%',
          backgroundColor: '#FFFFFF',
          color: '#00000099',
          padding: '1rem 0,75rem ',
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          fontFamily: 'Roboto, sans-serif',
          fontWeight: '400',
          padding: '1px 0.25rem 1px 0.25rem',
          borderRadius: '0.25rem',
          fontSize: '1rem',
          lineHeight: '1.4rem',
          backgroundColor: '#C1E0DF',
          color: '#2F464A',
        },
      },
    },
  },
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
