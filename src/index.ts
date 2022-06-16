console.log('aa')

const iframe = () => {
  const element = document.createElement('iframe')
  element.srcdoc = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>IFRAME</title>
  </head>
  <body>IFRAMEHERE</body>
</html>
    `

  return element
}

document.body.appendChild(iframe())
