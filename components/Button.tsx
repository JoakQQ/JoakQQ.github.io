import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export default styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow:
    '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  textTransform: 'none',
  [theme.breakpoints.up('sm')]: {
    padding: 16,
  },
  [theme.breakpoints.down('sm')]: {
    padding: 8,
    fontSize: 12,
  },
}))
