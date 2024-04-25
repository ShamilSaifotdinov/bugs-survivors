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
      },
      secondary: {
        main: '#C1E0DF',
        contrastText: 'black',
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          disableElevation: true,
        },

        styleOverrides: {
          root: {
            padding: '8px 23px',
            fontSize: '15px',
            lineHeight: '26px',
            color: '#F2F9F8',
            font: 'Press Start 2P',
            shadowBox: 'none',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            border: '1px solid #C1E0DF',
            fontSize: '16px',
            lineHeight: '24px',
            fontFamily: 'Roboto',
            fontWeight: '400',
            backgroundColor: '#FFFFFF',
            color: '#00000099',
            marginBottom: '24px',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            marginBottom: '24px',
          },
        },
      },
    },
  })
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <RegisterPage />
      </ThemeProvider>
    </div>
  )
}

export default App
