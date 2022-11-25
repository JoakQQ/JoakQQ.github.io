import { Box, Divider, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export default function Footer() {
  const { t } = useTranslation()
  const theme = useTheme()
  const darkMode = theme.palette.mode === 'dark'

  return (
    <Box
      id="footer"
      sx={{
        height: 64,
        maxHeight: 64,
        display: 'flex',
        width: '100%',
        background: darkMode ? '#242424' : '#edf7f7',
        ...(darkMode && {
          boxShadow:
            '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        }),
        gap: 2,
        p: 2,
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
        }}
      >
        <Link
          href="mailto:u3560667@connect.hku.hk"
          style={{
            color: darkMode ? '#8f29b1' : '#ff0081',
          }}
        >
          <Typography>{t('email-me')}</Typography>
        </Link>
      </Box>
      <Divider
        orientation="vertical"
        {...(darkMode && {
          sx: {
            background: '#ffffff',
          },
        })}
      />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
        }}
      >
        <Link
          href="https://github.com/JoakQQ"
          style={{
            color: darkMode ? '#8f29b1' : '#ff0081',
          }}
        >
          <Typography>{t('github-page')}</Typography>
        </Link>
        <Typography sx={{ fontSize: 9 }}>{t('foot-page-declaimer')}</Typography>
      </Box>
    </Box>
  )
}
