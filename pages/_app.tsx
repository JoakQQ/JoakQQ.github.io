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
  keyframes,
  PaletteOptions,
  Theme,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { GlobalProvider } from 'providers/global'
import { useRouter } from 'next/router'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Fab from '@components/Fab'
import Background from '@components/Background'
import { circularProgressClasses } from '@mui/material/CircularProgress'
import { useTranslation } from 'react-i18next'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'

const slide = keyframes`
  from {
    transform: translateY(-60px);
  }
  to {
    transform: translateY(60px);
  }
`

const visible = keyframes`
  to {
    visibility: visible;
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
  const [moveBackground, setMoveBackground] = useState<boolean>(false)
  const { t } = useTranslation()
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

  useEffect(() => {
    const moveBackgroundButton = document.getElementById('movable-background')
    if (moveBackgroundButton) {
      moveBackgroundButton.style.display = 'none'
    }
  }, [])

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
                zIndex: moveBackground ? 1 : -1,
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
                gap: 8,
                backgroundColor: (mode ? mode === 'dark' : prefersDarkMode)
                  ? '#444444'
                  : '#f4fffb',
              }}
            >
              <CircularProgress
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#fff' : '#000',
                  animationDuration: '550ms',
                  [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: 'round',
                  },
                }}
                size={120}
                thickness={4}
              />
              <Typography>{t('loading-text')}</Typography>
              <Box
                sx={{
                  overflow: 'hidden',
                  height: 30,
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    visibility: 'hidden',
                    position: 'absolute',
                    animation: `${visible} 0ms forwards, ${slide} 6000ms infinite 0ms;`,
                  }}
                >
                  {t('loading-image')}
                </Typography>
                <Typography
                  sx={{
                    visibility: 'hidden',
                    position: 'absolute',
                    animation: `${visible} 0ms 2050ms forwards, ${slide} 6000ms infinite 2000ms;`,
                  }}
                >
                  {t('loading-model')}
                </Typography>
                <Typography
                  sx={{
                    visibility: 'hidden',
                    position: 'absolute',
                    animation: `${visible} 0ms 4050ms forwards, ${slide} 6000ms infinite 4000ms;`,
                  }}
                >
                  {t('loading-mesh')}
                </Typography>
              </Box>
            </Box>
            <Box
              id="main"
              style={{
                display: 'none',
                flexDirection: 'column',
                width: '100%',
                height: 'inherit',
                position: 'absolute',
                ...(moveBackground && {
                  zIndex: -1,
                }),
              }}
            >
              <Component {...pageProps} />
            </Box>
            {router.pathname !== '/' ? (
              <Fab
                style={{
                  display: 'flex',
                  position: 'fixed',
                  bottom: 80,
                  right: 16,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={handleRouteToHome}
              >
                <ArrowBackIosNewIcon />
              </Fab>
            ) : (
              <Fab
                id="movable-background"
                style={{
                  display: 'flex',
                  position: 'fixed',
                  bottom: 80,
                  right: 16,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => {
                  setMoveBackground((prev) => !prev)
                }}
              >
                {moveBackground ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </Fab>
            )}
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </GlobalProvider>
  )
}
