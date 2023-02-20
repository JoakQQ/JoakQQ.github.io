import { Box, keyframes, SxProps, Theme } from '@mui/material'
import Image from 'next/image'

const Gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

export default function LazyImage({
  width,
  height,
  src,
  alt,
  styles,
}: {
  width: number | string
  height: number | string
  src: string
  alt: string
  styles?: SxProps<Theme>
}) {
  return (
    <Box
      width={width}
      height={height}
      sx={{
        ...styles,
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        background:
          'linear-gradient(-45deg, #dddddd, #f0f0f0, #dddddd, #f0f0f0)',
        backgroundSize: '400% 400%',
        animation: `${Gradient} 2.25s ease infinite`,
        WebkitAnimation: `${Gradient} 2.25s ease infinite`,
        MozAnimation: `${Gradient} 2.25s ease infinite`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        loading="lazy"
        fill
        style={{ objectFit: 'cover' }}
      />
    </Box>
  )
}
