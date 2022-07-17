import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { createPortal } from 'react-dom'
import { createCodeSnippet } from "./createCodeSnippet"

export const OnfidoSDKIframe = () => {
  const iframeRef = useRef()
  const [mountNode, setMountNode] = useState(null)
  
  useEffect(() => {
    setMountNode(
      iframeRef?.current?.contentWindow?.document?.body
    )
  }, [])

  const setScript = () => {
    console.log('-------- setScript')

    const onfidoMountPoint = document.createElement('div')
    onfidoMountPoint.id = 'onfido-mount'

    const oldScript =  iframeRef.current.contentWindow?.document?.getElementById('onfido-script')
    var newScript = document.createElement("script");
    newScript.type = "text/javascript";
    // newScript.text = `console.log('iframe works')`
    newScript.text = `
   
        ${createCodeSnippet()}
        console.log(Onfido)
    
    `
    newScript.id = 'onfido-script'
    
    oldScript?.remove()

    const onfidoScript = document.createElement('script')
    onfidoScript.src = `${baseUrl}/onfido.min.js`
    onfidoScript.onload = () => {
      iframeRef?.current?.contentWindow?.document?.body?.appendChild(newScript)
    }

    const styles = document.createElement('link')
    styles.src = `${baseUrl}/style.css`
    styles.rel = 'stylesheet'

    iframeRef?.current?.contentWindow?.document?.body?.appendChild(onfidoMountPoint)
    iframeRef?.current?.contentWindow?.document?.body?.appendChild(styles)
    iframeRef?.current?.contentWindow?.document?.body?.appendChild(onfidoScript)
    
  }

  const baseUrl = 'https://assets.onfido.com/web-sdk-releases/8.1.0'

  // useEffect(() => {
  //   setTimeout(() => {
  //     setScript()
  //   }, 1000)
  // })

  return (
    <Iframe
      onLoad={setScript}
      width="100%"
      height="100%"
      allow="camera *;microphone *;"
      referrerPolicy="no-referrer"
      name="result"
      ref={iframeRef}>
        <div></div>
        <link href={`${baseUrl}/style.css`} rel='stylesheet'/>
        <script src={`${baseUrl}/onfidoAuth.min.js`}/>
     
      {/* {mountNode && createPortal(children, mountNode)} */}
    </Iframe>
  )
}

const Iframe = styled.iframe`
  height: 100%;
  border-width: inherit;
  border-style: none;

  border: 1px solid red;
`