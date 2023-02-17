import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Drawer,
  useTheme,
  Divider,
  Tooltip,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useTranslation } from 'react-i18next'
import { Fragment, useContext, useEffect, useState } from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { GlobalContext } from 'providers/global'
import GitHubIcon from '@mui/icons-material/GitHub'

export default function Header(props: {
  toggleColorMode: () => void
  openGithubRepository: () => void
}) {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState<string>('en')
  const [mobileOpen, setMobileOpen] = useState<boolean>(false)
  const theme = useTheme()
  const darkMode = theme.palette.mode === 'dark'
  const { state: globalState } = useContext(GlobalContext)

  useEffect(() => {
    document.title = t(globalState.pageName)
  }, [globalState.pageName, t])

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const lng = event.target.value
    i18n.changeLanguage(lng)
    setLanguage(lng)
  }

  const handleDrawerToggle = () => {
    setMobileOpen((open) => !open)
  }

  return (
    <Fragment>
      <AppBar
        id="header"
        position="static"
        sx={{
          height: 64,
          maxHeight: 64,
          color: darkMode ? '#ffffff' : '#000000',
          backgroundColor: darkMode ? '#000000' : '#b5d6f1',
          zIndex: 2,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 'inherit',
            backgroundColor: 'inherit',
          }}
        >
          <Box>
            <IconButton
              size="large"
              edge="start"
              sx={{
                mr: 2,
                color: 'white',
                display: { sm: 'none' },
                height: 'inherit',
              }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t(globalState.headerName)}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            <Tooltip title={t('github-page-repository')} placement="bottom">
              <IconButton
                size="large"
                edge="start"
                sx={{
                  mr: 2,
                  color: 'white',
                  height: 'inherit',
                }}
                onClick={props.openGithubRepository}
              >
                <GitHubIcon
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={
                theme.palette.mode === 'dark' ? t('light-mode') : t('dark-mode')
              }
              placement="bottom"
            >
              <IconButton
                size="large"
                edge="start"
                sx={{
                  mr: 2,
                  color: 'white',
                  height: 'inherit',
                }}
                onClick={props.toggleColorMode}
              >
                {theme.palette.mode === 'dark' ? (
                  <Brightness7Icon
                    sx={{
                      color: '#ffffff',
                    }}
                  />
                ) : (
                  <Brightness4Icon
                    sx={{
                      color: '#000000',
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>
            <Select value={language} onChange={handleLanguageChange}>
              <MenuItem value={'en'}>{t('en')}</MenuItem>
              <MenuItem value={'zh'}>{t('zh')}</MenuItem>
            </Select>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        id="header-drawer"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          style: {
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            gap: 8,
          },
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 300,
          },
        }}
      >
        <Typography variant="h6">{t('home-page')}</Typography>
        <Divider />
        <Select value={language} onChange={handleLanguageChange}>
          <MenuItem value={'en'}>{t('en')}</MenuItem>
          <MenuItem value={'zh'}>{t('zh')}</MenuItem>
        </Select>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{
              color: 'white',
            }}
            onClick={() => {}}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            sx={{
              color: 'white',
            }}
            onClick={props.toggleColorMode}
          >
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon
                sx={{
                  color: '#ffffff',
                }}
              />
            ) : (
              <Brightness4Icon
                sx={{
                  color: '#000000',
                }}
              />
            )}
          </IconButton>
          <Typography sx={{ ml: 1 }}>
            {theme.palette.mode === 'dark' ? t('dark-mode') : t('light-mode')}
          </Typography>
        </Box>
      </Drawer>
    </Fragment>
  )
}
