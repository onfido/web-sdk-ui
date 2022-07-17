const sandboxPermissions = [
  'forms',
  'modals',
  'orientation-lock',
  'pointer-lock',
  'popups',
  'popups-to-escape-sandbox',
  'presentation',
  'same-origin',
  'scripts',
  'top-navigation',
].map((x) => `allow-${x}`)

const featurePermissions = ['camera', 'microphone', 'geolocation']

type OptionProps = {
  url: string // includes version or PR
  codeSnippet: string
}

class OnfidoIFrame {
  private frame: HTMLIFrameElement = undefined
  private mount = undefined
  private mountId: string

  constructor(id: string) {
    this.mountId = id
  }

  private createFrame = () => {
    const frame: HTMLIFrameElement = document.createElement('iframe')
    frame.setAttribute(
      'style',
      'width: 100%; min-height: 600px; height: 100%; border: 0'
    )
    frame.allowFullscreen = true
    frame.setAttribute('sandbox', sandboxPermissions.join(' '))
    frame.allow = featurePermissions.map((x) => `${x} *`).join(';')
    
    return frame
  }

  private injectScripts = (options, iframe) => {
    const mount = document.createElement('div')
    mount.id = 'onfido-mount'

    const style = document.createElement('link')
    style.rel = 'stylesheet'
    style.href = `${options.url}/style.css`

    const script = document.createElement('script')
    script.src = `${options.url}/onfido.min.js`

    const snippet = document.createElement('script')
    snippet.text = `
      const originalInit = Onfido.init
      OnfidoMiddleware = {
        init: function (config) {
          window.onfidoSdkHandler = originalInit(config)
        }
      }

      ${options.code.replace('Onfido.init', 'OnfidoMiddleware.init')}

      // TODO: Add bridge
    `

    script.onload = () => {
      iframe.contentDocument.body.appendChild(snippet)
    }

    iframe.contentDocument.body.appendChild(mount)
    iframe.contentDocument.body.appendChild(style)
    iframe.contentDocument.body.appendChild(script)
  }



  public refresh = (options) => {
    this.mount = document.getElementById(this.mountId)

    if(this.frame){
      this.frame.remove()
    }

    const frame = this.createFrame()
    this.mount.appendChild(frame)
    this.injectScripts(options, frame)

    // return this.createHandler(frame)
  }
}

export default new OnfidoIFrame('iframe-container')
