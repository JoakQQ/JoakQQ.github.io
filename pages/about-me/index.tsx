import {
  Box,
  Typography,
  styled,
  Grid,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material'
import { GlobalContext } from 'providers/global'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageIcon from '@components/LanguageIcon'
import projects from '@projects/index.json'
import ProjectDetail from 'interfaces/project_details'
import Image from 'next/image'
import useTabletView from '@hooks/useTabletView'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkIcon from '@mui/icons-material/Link'
import { useRouter } from 'next/router'
import Button from '@components/Button'
import {
  JoakGithubIconLink,
  MatchapizzaGithubIconLink,
  OpenHobbyCodingPage,
  OpenJoakGithub,
  OpenMatchaPizzaGithub,
} from '@utils/github'

const PageRoot = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    marginLeft: '15%',
    marginRight: '15%',
  },
  [theme.breakpoints.down('lg')]: {
    marginLeft: '5%',
    marginRight: '5%',
  },
}))

const DetailedDescriptionContainer = styled(Box)({
  margin: '32px 0px',
  textAlign: 'center',
})

const LanguageIconGroupContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    gap: 16,
  },
  [theme.breakpoints.down('lg')]: {
    gap: 8,
  },
  margin: '16px 0px',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
}))

const CardGroupTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    fontSize: 40,
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 32,
  },
  textAlign: 'center',
}))

const ProjectPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(1),
  padding: theme.spacing(2),
}))

const ProjectPaperTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    fontSize: 32,
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 24,
  },
}))

const ProjectImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 400,
  position: 'relative',
  marginTop: 8,
  marginBottom: 8,
}))

const ProjectButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 8,
  justifyContent: 'flex-end',
  marginTop: 8,
}))

const HobbyRelatedProjectContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 32,
  gap: 8,
}))

const GithubPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 16,
  alignItems: 'center',
  margin: 8,
  ':hover': {
    cursor: 'pointer',
    transform: 'scale(1.02);',
  },
}))

const GithubUser = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    fontSize: 24,
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 16,
  },
  marginTop: 8,
}))

const GithubAvatarContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: 200,
  width: 200,
  borderRadius: '100%',
  backgroundColor: 'gray',
  overflow: 'hidden',
}))

export default function AboutMe() {
  const { t, i18n } = useTranslation()
  const { globalDispatch } = useContext(GlobalContext)
  const [projectDetailList, setProjectDetailList] = useState<
    Array<ProjectDetail>
  >([])
  const tabletView = useTabletView()
  const router = useRouter()

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
        <CardGroupTitle>{t('recent-projects')}</CardGroupTitle>
        <Grid container>
          {projectDetailList.map((projectDetail, projectIndex) => (
            <Grid key={`project-${projectIndex}`} item xs={tabletView ? 12 : 6}>
              <ProjectPaper>
                <ProjectPaperTitle>{projectDetail.title}</ProjectPaperTitle>
                {projectDetail.imagePath && (
                  <ProjectImageContainer>
                    <Image
                      src={`projects/images/${projectDetail.imagePath}`}
                      alt={projectDetail.title}
                      loading="lazy"
                      fill
                      placeholder="empty"
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </ProjectImageContainer>
                )}
                <Typography>
                  {i18n.language === 'en'
                    ? projectDetail.enDescription
                    : projectDetail.zhDescription}
                </Typography>
                <ProjectButtonGroup>
                  {projectDetail.website && (
                    <Tooltip title={t('link')}>
                      <IconButton
                        onClick={() => window.open(projectDetail.website)}
                      >
                        <LinkIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {projectDetail.github && (
                    <Tooltip title={t('github-repository')}>
                      <IconButton
                        onClick={() => window.open(projectDetail.github)}
                      >
                        <GitHubIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </ProjectButtonGroup>
              </ProjectPaper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <HobbyRelatedProjectContainer>
        <Typography>{t('hobby-related-projects')}</Typography>
        <Button onClick={OpenHobbyCodingPage}>{t('hobby-page-coding')}</Button>
      </HobbyRelatedProjectContainer>
      <Box sx={{ my: 4 }}>
        <CardGroupTitle>{t('check-out-github')}</CardGroupTitle>
        <Grid container>
          <Grid item xs={tabletView ? 12 : 6}>
            <GithubPaper onClick={OpenJoakGithub}>
              <GithubAvatarContainer>
                <Image
                  src={JoakGithubIconLink}
                  alt="joak-icon"
                  loading="lazy"
                  fill
                />
              </GithubAvatarContainer>

              <GithubUser>Joak</GithubUser>
            </GithubPaper>
          </Grid>
          <Grid item xs={tabletView ? 12 : 6}>
            <GithubPaper onClick={OpenMatchaPizzaGithub}>
              <GithubAvatarContainer>
                <Image
                  src={MatchapizzaGithubIconLink}
                  alt="matchapizza-icon"
                  loading="lazy"
                  fill
                />
              </GithubAvatarContainer>
              <GithubUser>MatchaPizza</GithubUser>
            </GithubPaper>
          </Grid>
        </Grid>
      </Box>
    </PageRoot>
  )
}
