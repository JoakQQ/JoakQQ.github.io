import { useEffect, useState } from 'react'
import { Box } from '@mui/material'

export default function Background() {
  const html = `
  <html>
    <head>
      <script src="/webvr/aframe-master.min.js"></script>
      <script>
        AFRAME.registerComponent("log", {
          init: function () {
            this.el.addEventListener("loaded", () => {
              console.log ("loaded");
              var mainComponent = document.getElementById('main');
              var disp = mainComponent.style.display;
              mainComponent.style.display = 'none';
              var trick = mainComponent.offsetHeight;
              mainComponent.style.display = 'flex';

              var loader = document.getElementById('loader');
              loader.style.display = 'none';
            });
          }
        });
      </script>
    </head>
    <body>
      <a-scene log>
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
