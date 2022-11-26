import { Fab } from '@mui/material'
import { styled } from '@mui/material/styles'

export default styled(Fab)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0px 2px 4px 1px rgb(0 0 0 / 20%), 0px 4px 5px 10px rgb(0 0 0 / 14%), 0px 1px 10px 10px rgb(0 0 0 / 12%)'
      : '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  opacity: 0.7,
  ':hover': {
    background: 'transparent',
    opacity: 1,
  },
}))
