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
          var trick = mainComponent.offsetHeight;
          mainComponent.style.display = 'flex';

          var scene = document.getElementById('scene');
          scene.style.visibility = 'visible';

          var preloadBackground = document.getElementById('preload-background');
          preloadBackground.style.display = 'none';

          var moveBackgroundButton = document.getElementById('movable-background');
          if (moveBackgroundButton && moveBackgroundButton.style && moveBackgroundButton.style.display) {
            moveBackgroundButton.style.display = 'flex';
          }

          var aCanvas = document.querySelector('.a-canvas');
          if (aCanvas) {
            aCanvas.className = 'new-canvas';
          }
        };

        AFRAME.registerComponent("log", {
          init: function () {
            this.el.addEventListener("materialtextureloaded", () => {
              if (rerender === 3) {
                setTimeout(startRerender, 1000);
              }
              rerender++;
            });
          }
        });
      </script>
    </head>
    <body>
      <a-scene id="scene" style="z-index:-99;visibility:hidden;">
        <a-sky log src="/images/bg.jpg" rotation="0 -130 0"></a-sky>
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
