import { useEffect, useState } from 'react'
import { Box } from '@mui/material'

export default function Background() {
  const html = `
  <html>
    <head>
      <script src="/webvr/aframe-master.min.js"></script>
      <script>
        var rerender = 0;

        function startRerender() {
          var mainComponent = document.getElementById('main');
          var disp = mainComponent.style.display;
          mainComponent.style.display = 'none';
          var trick = mainComponent.offsetHeight;
          mainComponent.style.display = 'flex';

          var scene = document.getElementById('scene');
          scene.style.display = 'block';

          var preloadBackground = document.getElementById('preload-background');
          preloadBackground.style.display = 'none';
        };

        AFRAME.registerComponent("log", {
          init: function () {
            this.el.addEventListener("loaded", () => {
              if (rerender === 1) {
                setTimeout(startRerender, 5000);
              }
              rerender++;
            });
          }
        });
      </script>
    </head>
    <body>
      <a-scene log id="scene" style="z-index:-99;display:none;">
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
