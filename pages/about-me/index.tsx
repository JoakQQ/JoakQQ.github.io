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

  return <Fragment>{t('about-me')}</Fragment>
}
