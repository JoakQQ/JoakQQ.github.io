import { Box, styled, Typography } from '@mui/material'
import { GlobalContext } from 'providers/global'
import { Fragment, useContext } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { keyframes } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '@components/Button'

const translateDown = keyframes`
  from {
    transform: translateY(-120px);
  }
  to {
    transform: translateY(0px);
  }
`

const visible = keyframes`
  99% {
    visibility: hidden;
  }
  100% {
    visibility: visible;
  }
`

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const GreetingTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
  textAlign: 'center',
}))

const SelfDescriptionTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
  textAlign: 'center',
}))

const SelfDescriptionBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '64px 16px',
    gap: 8,
  },
  [theme.breakpoints.up('md')]: {
    padding: '64px',
    gap: 16,
  },
}))

const AboutMeButtonHolder = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
})

export default function HomePage() {
  const { t } = useTranslation()
  const { globalDispatch } = useContext(GlobalContext)
  const router = useRouter()

  useEffect(() => {
    globalDispatch({
      type: 'changePageName',
      pageName: 'home-page',
    })
    globalDispatch({
      type: 'changeTitle',
      title: 'home-page',
    })
  }, [globalDispatch])

  return (
    <SelfDescriptionBox>
      <GreetingTypography variant="h2">{t('greeting')}</GreetingTypography>
      <Box
        sx={{
          overflow: 'hidden',
        }}
      >
        <SelfDescriptionTypography
          variant="h1"
          sx={{
            animation: `${translateDown} 2000ms ease-in-out`,
          }}
        >
          {t('my-name')}
        </SelfDescriptionTypography>
      </Box>
      <Box
        sx={{
          overflow: 'hidden',
        }}
      >
        <SelfDescriptionTypography
          variant="h1"
          sx={{
            visibility: 'hidden',
            animation: `${visible} 2500ms forwards, ${translateDown} 2000ms ease-in-out 2000ms`,
          }}
        >
          {t('self-description')}
        </SelfDescriptionTypography>
      </Box>
      <AboutMeButtonHolder>
        <Button
          onClick={() => {
            router.push('/about-me')
          }}
          sx={{
            opacity: 0,
            animation: `${fadeIn} 2000ms forwards 2000ms`,
          }}
        >
          {t('about-me')}
        </Button>
      </AboutMeButtonHolder>
    </SelfDescriptionBox>
  )
}
