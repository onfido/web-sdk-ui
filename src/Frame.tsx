import React from 'react'

const srcdoc = () => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>IFRAME</title>
    </head>
    <body>IFRAME BODY</body>
  </html>
      `
}

const Frame = () => {
  return (
    <iframe
      srcDoc={srcdoc()}
      width="100%"
      height="100%"
      style={{ height: '95vh' }}
    />
  )
}

export { Frame }
