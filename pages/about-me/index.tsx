import { Box, Typography, styled, Grid, Paper } from '@mui/material'
import { GlobalContext } from 'providers/global'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageIcon from '@components/LanguageIcon'
import projects from '@projects/index.json'
import ProjectDetail from 'interfaces/project_details'
import Image from 'next/image'

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
  const { t, i18n } = useTranslation()
  const { globalDispatch } = useContext(GlobalContext)
  const [projectDetailList, setProjectDetailList] = useState<
    Array<ProjectDetail>
  >([])

  useEffect(() => {
    globalDispatch({
      type: 'changePageName',
      pageName: 'about-me',
    })
    globalDispatch({
      type: 'changeTitle',
      title: 'about-me',
    })

    projects.forEach(async (project) => {
      try {
        const projectDetail = await import(`public/projects/${project.path}`)
        setProjectDetailList((list) => {
          const found =
            list.findIndex(
              (element) => element.title === projectDetail.title,
            ) !== -1
          return found ? list : [...list, projectDetail]
        })
      } catch (err) {
        console.error(`failed to load ${project.name}`)
      }
    })
  }, [globalDispatch, projects])

  return (
    <PageRoot>
      <DetailedDescriptionContainer>
        <Typography>{t('detailed-description-p1')}</Typography>
        <br />
        <Typography>{t('detailed-description-p2')}</Typography>
      </DetailedDescriptionContainer>
      <Typography textAlign="center" fontSize="24px">
        {t('comfortable-languages')}
      </Typography>
      <LanguageIconGroupContainer>
        <LanguageIcon code="TS" />
        <LanguageIcon code="JS" />
        <LanguageIcon code="Py" />
        <LanguageIcon code="Go" />
        <LanguageIcon code="C" />
        <LanguageIcon code="Lua" />
      </LanguageIconGroupContainer>
      <Typography textAlign="center">{t('more-languages')}</Typography>
      <Box sx={{ my: 4 }}>
        <Typography textAlign="center" variant="h4">
          {t('recent-projects')}
        </Typography>
        <Grid container>
          {projectDetailList.map((projectDetail, projectIndex) => (
            <Grid key={`project-${projectIndex}`} item xs={6}>
              <Paper
                sx={{
                  m: 1,
                  p: 1,
                }}
              >
                <Typography variant="h5">{projectDetail.title}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageRoot>
  )
}
