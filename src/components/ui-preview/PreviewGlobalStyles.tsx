'use client'

export default function PreviewGlobalStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Kalnia:wght@400;500;700&display=swap');

:root {
  --token-08b0c0ab-26ee-4445-9737-2a35adb2438a: rgb(3, 3, 3);
  --token-6ba02981-2279-4d33-a8b8-353ad611e0ff: rgb(247, 247, 247);
  --token-cf5aac01-3fc4-453a-a04f-c350255779b2: rgb(242, 103, 61);
  --token-cfc0fde9-680d-4640-ae43-a7a5aeebce91: rgb(181, 181, 181);
  --token-81be5cde-a8d9-43df-9b4a-dcbedf0135b5: rgb(249, 230, 224);
  --framer-aspect-ratio-supported: auto;
  --framer-ease: cubic-bezier(0.44, 0, 0.56, 1);
  --framer-font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: inherit;
}

html {
  margin: 0px;
  padding: 0px;
  height: auto;
  scroll-behavior: auto;
}

body {
  margin: 0px;
  padding: 0px;
  font-size: 12px;
  font-family: 'Montserrat', 'Inter', sans-serif;
  background: rgba(247, 247, 247, 1);
  color: var(--token-08b0c0ab-26ee-4445-9737-2a35adb2438a, #030303);
  overflow-x: hidden;
}

button {
  font-family: inherit;
}

img {
  display: block;
  max-width: 100%;
}
        `,
      }}
    />
  )
}
