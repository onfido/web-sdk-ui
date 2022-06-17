import { Params } from './parseParams'

const createIFrame = (params: Params, sdkInitText: string) => {
  const frameContainer = document.querySelector('#iframe-container')

  while (frameContainer.childNodes.length) {
    frameContainer.childNodes[0].remove()
  }

  const frame = document.createElement('iframe')
  frame.setAttribute('width', '100%')
  frame.setAttribute('height', '100%')
  frame.setAttribute('style', `height: 95vh;`)
  frame.referrerPolicy = 'origin'
  frame.src = 'about:blank'

  frameContainer.appendChild(frame)

  const doc = frame.contentDocument

  const onfidoMountPoint = doc.createElement('div')
  onfidoMountPoint.id = 'onfido-mount'
  doc.body.appendChild(onfidoMountPoint)

  const styleSheet = doc.createElement('link')
  styleSheet.rel = 'stylesheet'
  styleSheet.href = `${params.basePath}/style.css`

  const script = doc.createElement('script')
  script.src = `${params.basePath}/onfido.min.js`
  script.onload = () => {
    const sdkInitScript = doc.createElement('script')
    sdkInitScript.text = sdkInitText
    doc.head.appendChild(sdkInitScript)
  }

  doc.head.appendChild(styleSheet)
  doc.head.appendChild(script)
}

export { createIFrame }
