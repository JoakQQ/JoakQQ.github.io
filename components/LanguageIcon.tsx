import { Box, styled, Typography } from '@mui/material'

const IconContainer = styled(Box)(({ theme }) => ({
  borderRadius: '10%',
  backgroundColor: 'transparent',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    height: '64px',
    width: '64px',
    border: 'red solid 2px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '32px',
    width: '32px',
    border: 'red solid 1px',
  },
}))

const IconText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  color: 'red',
  [theme.breakpoints.up('sm')]: {
    fontSize: 24,
    right: 8,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 12,
    right: 4,
  },
}))

export default function LanguageIcon({ code }: { code: string }) {
  return (
    <IconContainer>
      <IconText>{code}</IconText>
    </IconContainer>
  )
}
