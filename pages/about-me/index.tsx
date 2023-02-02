import { Box, Typography, styled } from '@mui/material'
import { GlobalContext } from 'providers/global'
import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageIcon from '@components/LanguageIcon'

const PageRoot = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    marginLeft: '20%',
    marginRight: '20%',
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10%',
    marginRight: '10%',
  },
}))

const DetailedDescriptionContainer = styled(Box)({
  margin: '32px 0px',
  textAlign: 'center',
})

const LanguageIconGroupContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    gap: 16,
  },
  [theme.breakpoints.down('sm')]: {
    gap: 8,
  },
  margin: '16px 0px',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
}))

export default function AboutMe() {
  const { t } = useTranslation()
  const { globalDispatch } = useContext(GlobalContext)

  useEffect(() => {
    globalDispatch({
      type: 'changePageName',
      pageName: 'about-me',
    })
    globalDispatch({
      type: 'changeTitle',
      title: 'about-me',
    })
  }, [globalDispatch])

  // TODO add elements :)
  const temp = new Array(50).fill(1)

  return (
    <PageRoot>
      <DetailedDescriptionContainer>
        <Typography>{t('detailed-description-p1')}</Typography>
        <br />
        <Typography>{t('detailed-description-p2')}</Typography>
      </DetailedDescriptionContainer>
      <Typography textAlign="center" fontSize="24px">{t('comfortable-languages')}</Typography>
      <LanguageIconGroupContainer>
        <LanguageIcon code="TS" />
        <LanguageIcon code="JS" />
        <LanguageIcon code="Py" />
        <LanguageIcon code="Go" />
        <LanguageIcon code="C" />
        <LanguageIcon code="Lua" />
      </LanguageIconGroupContainer>
      <Typography textAlign="center">{t('more-languages')}</Typography>
    </PageRoot>
  )
}
