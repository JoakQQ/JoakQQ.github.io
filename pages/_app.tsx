import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../i18n'
import Header from '@components/Header'
import Footer from '@components/Footer'
import {
  Box,
  Components,
  createTheme,
  keyframes,
  PaletteOptions,
  Theme,
  ThemeProvider,
  useMediaQuery,
  // Fab,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { GlobalProvider } from 'providers/global'
import { useRouter } from 'next/router'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Fab from '@components/Fab'

const slide = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-2560px);
  }
`

const componentsTheme: Components<Omit<Theme, 'components'>> = {
  MuiInputBase: {
    styleOverrides: {
      root: {
        padding: '0px !important',
      },
      input: {
        paddingTop: '8px !important',
        paddingBottom: '8px !important',
        background: 'transparent',
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: {
        paddingTop: '0px !important',
        paddingBottom: '0px !important',
      },
    },
  },
}

const paletteTheme: PaletteOptions = {
  primary: {
    light: '#b5d6f1',
    dark: '#ffffff',
    main: '#b5d6f1',
    contrastText: '#000000',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState<'light' | 'dark'>()
  const router = useRouter()

  const toggleColorMode = () => {
    setMode((prevMode) => {
      switch (prevMode) {
        case 'dark': {
          return 'light'
        }
        case 'light': {
          return 'dark'
        }
        default: {
          return prefersDarkMode ? 'light' : 'dark'
        }
      }
    })
  }

  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode ? mode : prefersDarkMode ? 'dark' : 'light',
          ...paletteTheme,
        },
        components: componentsTheme,
      }),
    [prefersDarkMode, mode],
  )

  const handleRouteToHome = () => {
    router.push('/')
  }

  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: '100vh',
            ...((mode ? mode === 'dark' : prefersDarkMode) && {
              color: '#fff',
            }),
          }}
        >
          <Header toggleColorMode={toggleColorMode} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              // ...((mode ? mode === 'dark' : prefersDarkMode) && {
              //   backgroundColor: '#383838',
              // }),
              overflow: 'hidden',
              position: 'relative',
              background: 'transparent',
              height: 'calc(100vh - 64px - 64px)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                background: 'url("/images/bg.jpg") repeat-x center',
                height: 'inherit',
                width: 7480,
                zIndex: -1,
                opacity: (mode ? mode === 'dark' : prefersDarkMode) ? 1 : 0.5,
                animation: `${slide} 60s linear infinite;`,
              }}
            ></Box>
            <Component {...pageProps} />
            {router.pathname !== '/' && (
              <Fab
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  background: 'transparent',
                }}
                onClick={handleRouteToHome}
              >
                <ArrowBackIosNewIcon />
              </Fab>
            )}
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </GlobalProvider>
  )
}
