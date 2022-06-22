import { Params } from './utils/urlUtils'

const createIFrame = (
  params: Params,
  sdkInitText: string,
  sdkVersion: string
) => {
  const frameContainer = document.querySelector('#iframe-container')

  while (frameContainer.childNodes.length) {
    frameContainer.childNodes[0].remove()
  }

  const frame = document.createElement('iframe')
  frame.setAttribute('width', '100%')
  frame.setAttribute('height', '100%')
  frame.setAttribute(
    'style',
    `height: 100%; border-width: inherit; border-style: none;`
  )
  frame.setAttribute('allow', 'camera *;microphone *')
  frame.referrerPolicy = 'no-referrer'
  frame.setAttribute('name', 'result')

  frameContainer.appendChild(frame)

  const doc = frame.contentDocument

  const onfidoMountPoint = doc.createElement('div')
  onfidoMountPoint.id = 'onfido-mount'
  doc.body.appendChild(onfidoMountPoint)

  const styleSheet = doc.createElement('link')
  const pathAndVersion = `${params.basePath}/${sdkVersion}`
  styleSheet.rel = 'stylesheet'
  styleSheet.href = `${pathAndVersion}/style.css`

  const script = doc.createElement('script')
  script.src = `${pathAndVersion}/onfido.min.js`
  script.onload = () => {
    const sdkInitScript = doc.createElement('script')
    sdkInitScript.text = sdkInitText
    doc.head.appendChild(sdkInitScript)
  }

  doc.head.appendChild(styleSheet)
  doc.head.appendChild(script)
}

export { createIFrame }
