import { useMediaQuery } from "@mui/material"

export default function useDarkMode() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  return prefersDarkMode
}
