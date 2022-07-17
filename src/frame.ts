import { Params } from './store/params'

const createIFrame = (
  params: Params,
  sdkInitText: string,
  sdkVersion: string
) => {
  const frameContainer = document.querySelector('#iframe-container')
  if (!frameContainer) {
    console.error('no frame container')
    return
  }

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
  if (!doc) {
    console.error('no doc')
    return
  }

  const onfidoMountPoint = doc.createElement('div')
  onfidoMountPoint.id = 'onfido-mount'
  doc.body.appendChild(onfidoMountPoint)

  const styleSheet = doc.createElement('link')
  const pathAndVersion = `${params.basePath}/${sdkVersion}`
  styleSheet.rel = 'stylesheet'
  styleSheet.href = `${pathAndVersion}/style.css`

  const script = doc.createElement('script')
  script.src = `${pathAndVersion}/onfido.min.js`
  console.log('sdkInitText', sdkInitText)
  script.onload = () => {
    const sdkInitScript = doc.createElement('script')
    sdkInitScript.text = `
      window.onfidoSdkHandle = ${sdkInitText}

      window.addEventListener('message', function (e) {
        console.log('received message', onfidoSdkHandle)
        window.parent.postMessage(JSON.stringify(onfidoSdkHandle.options))
        window.parent.postMessage(onfidoSdkHandle.options.onComplete.toString())
      })
    
    `
    doc.head.appendChild(sdkInitScript)
  }

  doc.head.appendChild(styleSheet)
  doc.head.appendChild(script)
}

export { createIFrame }

const getOptionsFromFrame = () => {
  const frameContainer = document.querySelector('#iframe-container iframe')
  console.log(frameContainer.contentWindow)
  window.addEventListener('message', (e) => {
    console.log('from iframe message', e.data)
  })
  frameContainer.contentWindow.postMessage({ event: 'getConfig' })
}
window.getOptionsFromFrame = getOptionsFromFrame