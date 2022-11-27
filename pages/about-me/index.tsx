import { Box, Typography } from '@mui/material'
import { GlobalContext } from 'providers/global'
import { Fragment, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

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
    <Box>
      {temp.map((_, index) => {
        return <Typography key={index}>{t('about-me')}</Typography>
      })}
    </Box>
  )
}
