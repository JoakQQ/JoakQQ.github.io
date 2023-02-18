import { useMediaQuery, useTheme } from "@mui/material"

export default function useMobileView() {
  const theme = useTheme()
  const isTabletView = useMediaQuery(theme.breakpoints.down('lg'))

  return isTabletView
}