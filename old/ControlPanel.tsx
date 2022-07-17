import React from 'react'
import styled from 'styled-components'
import { useStore } from '../store'
import { buildShareUrl } from '../utils/buildShareUrl'
import { replaceSdkInit } from '../utils/replaceSdkInit'
import { Editor } from '../Editor'
import { createIFrame } from '../frame'


const StyledEditor = styled(Editor)`
  height: 95%;
`

export const ControlPanel = () => {
  const { sdkVersions, jwtToken, params } = useStore()

  return (
    <Container>
      <StyledEditor
        text={params.init}
        onRun={(sdkInit) => {
          console.log({ sdkInit, jwtToken, params })
          const replacedSdkInit = replaceSdkInit(sdkInit, jwtToken)
          createIFrame(params, replacedSdkInit, params.version)
        }}
        onClipboardCopy={async (sdkInit) => {
          const url = buildShareUrl(sdkInit)
          await navigator.clipboard.writeText(url)
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  background: white;
`