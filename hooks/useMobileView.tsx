import { useMediaQuery, useTheme } from "@mui/material"

export default function useMobileView() {
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('md'))

  return isMobileView
}