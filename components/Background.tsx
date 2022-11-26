import { useEffect, useState } from 'react'
import { Box } from '@mui/material'

export default function Background() {
  const html = `
  <html>
    <head>
      <script src="/webvr/aframe-master.min.js"></script>
    </head>
    <body>
      <a-scene>
        <a-sky src="/images/bg.jpg" rotation="0 -130 0"></a-sky>
      </a-scene>
    </body>
  </html>  
  `

  const [fkey, setFkey] = useState<string>('original-key')

  useEffect(() => {
    setFkey('refresh-key')
  }, [])

  return <Box key={fkey} dangerouslySetInnerHTML={{ __html: html }} />
}
