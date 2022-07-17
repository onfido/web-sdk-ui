import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { createPortal } from 'react-dom'
import { createCodeSnippet } from "./createCodeSnippet"

export const OnfidoSDKFrame = () => {
  const iframeRef = useRef()
  const [mountNode, setMountNode] = useState(null)
  
  useEffect(() => {
    console.log('setSTrct')
    const onfidoScript = document.createElement('script')
    onfidoScript.src = `${baseUrl}/onfido.min.js`
    // onfidoScript.onload = () => {
    //   Onfido.init(
    //     createCodeSnippet()
    //   )
    //   // iframeRef?.current?.contentWindow?.document?.body?.appendChild(newScript)
    // }

    const styles = document.createElement('link')
    styles.href = `${baseUrl}/style.css`
    styles.rel = 'stylesheet'

    // document?.body?.appendChild(onfidoMountPoint)
    document?.body?.appendChild(styles)
    document?.body?.appendChild(onfidoScript)
  }, [])

 

  const baseUrl = 'https://assets.onfido.com/web-sdk-releases/8.1.0'

  /*
    TODO: 
      Inject scripts & links
      Start onfido


  */

      const setScripts = () => {
        
      }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setScript()
  //   }, 1000)
  // })

  return (
    <>
      <link href={`${baseUrl}/style.css`} rel='stylesheet'/>
      <script src={`${baseUrl}/onfidoAuth.min.js`}/>
    </>
    // <Iframe
    //   onLoad={setScript}
    //   width="100%"
    //   height="100%"
    //   allow="camera *;microphone *;"
    //   referrerPolicy="no-referrer"
    //   name="result"
    //   ref={iframeRef}>
    //     <div></div>
    //     <link href={`${baseUrl}/style.css`} rel='stylesheet'/>
    //     <script src={`${baseUrl}/onfidoAuth.min.js`}/>
     
    //   {/* {mountNode && createPortal(children, mountNode)} */}
    // </Iframe>
  )
}

const Iframe = styled.iframe`
  height: 100%;
  border-width: inherit;
  border-style: none;

  border: 1px solid red;
`