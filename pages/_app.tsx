import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../i18n'
import Header from '@components/Header'
import Footer from '@components/Footer'
import {
  Box,
  CircularProgress,
  Components,
  createTheme,
  PaletteOptions,
  Theme,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { GlobalProvider } from 'providers/global'
import { useRouter } from 'next/router'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Fab from '@components/Fab'
import Background from '@components/Background'
import { circularProgressClasses } from '@mui/material/CircularProgress'

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
            color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#000'),
          }}
        >
          <Header toggleColorMode={toggleColorMode} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              position: 'relative',
              background: 'transparent',
              height: 'calc(100vh - 64px - 64px)',
            }}
          >
            <Box
              id="background"
              sx={{
                position: 'absolute',
                height: 'inherit',
                width: '100%',
                zIndex: -1,
                opacity: (mode ? mode === 'dark' : prefersDarkMode) ? 1 : 0.5,
              }}
            >
              <Background />
            </Box>
            <Box
              id="preload-background"
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: 'inherit',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                zIndex: -100,
                background: 'white',
              }}
            >
              <CircularProgress
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#242424' : '#b5d6f1',
                  animationDuration: '550ms',
                  [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: 'round',
                  },
                }}
                size={120}
                thickness={4}
              />
            </Box>
            <Box
              id="main"
              style={{
                display: 'none',
                flexDirection: 'column',
                width: '100%',
                height: 'inherit',
                position: 'absolute',
              }}
            >
              <Component {...pageProps} />
            </Box>
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
