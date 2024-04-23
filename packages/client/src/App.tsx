import { ThemeProvider, createTheme } from '@mui/material/styles'
import Discovery from './pages/Discovery'
import './global.scss'

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
}
const theme = createTheme(themeOptions)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Discovery />
      ывфыв
    </ThemeProvider>
  )
}

export default App
