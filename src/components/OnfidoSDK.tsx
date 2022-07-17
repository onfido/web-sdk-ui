import React, { useState } from 'react'
import styled from 'styled-components'
import { replaceSdkInit } from '../utils/replaceSdkInit'
import { createIFrame } from '../frame'
import { ActionIcon, Button, Loader, LoadingOverlay } from '@mantine/core'
import { Code, Devices, Qrcode, Refresh, Settings } from 'tabler-icons-react'

import SettingsModal from '../modals/Settings'
import CodeSnippetModal from '../modals/CodeSnippet'
import { OnfidoSDKFrame } from './OnfidoSDK/OnfidoSDKIframe'
import { createCodeSnippet } from './OnfidoSDK/createCodeSnippet'

import OnfidoSDK from './OnfidoSDK/IFrame'

const sdkInit = `Onfido.init({
  onComplete: function (data) {
    // callback for when everything is complete
    console.log('everything is complete')
  },
  steps: ['welcome', 'document', 'face', 'complete'],
})`
const jwtToken = `eyJhbGciOiJFUzUxMiJ9.eyJleHAiOjE2NTgwNTg0NzAsInBheWxvYWQiOnsiYXBwIjoiMjAxYjEzNDgtNDRiMy00ODEzLTgzZTQtMjFhMmJiMWRmY2M3IiwiY2xpZW50X3V1aWQiOiJjZTY5ZjE4Zi04MDA2LTQyM2QtYWZkYS1mY2FmZjBkZTIxNTQiLCJpc19zYW5kYm94IjpmYWxzZSwic2FyZGluZV9zZXNzaW9uIjoiMWI2NDBkNTctNDFmYy00Y2U0LWEyM2QtNWM1NjdkMGEzMjc0In0sInV1aWQiOiJicTlabGYtbmRjQiIsImVudGVycHJpc2VfZmVhdHVyZXMiOnsiY29icmFuZCI6dHJ1ZSwibG9nb0NvYnJhbmQiOnRydWUsImhpZGVPbmZpZG9Mb2dvIjp0cnVlLCJ1c2VDdXN0b21pemVkQXBpUmVxdWVzdHMiOnRydWUsImRpc2FibGVNb2JpbGVTZGtBbmFseXRpY3MiOnRydWV9LCJ1cmxzIjp7ImRldGVjdF9kb2N1bWVudF91cmwiOiJodHRwczovL3Nkay5vbmZpZG8uY29tIiwic3luY191cmwiOiJodHRwczovL3N5bmMub25maWRvLmNvbSIsImhvc3RlZF9zZGtfdXJsIjoiaHR0cHM6Ly9pZC5vbmZpZG8uY29tIiwiYXV0aF91cmwiOiJodHRwczovL2FwaS5vbmZpZG8uY29tIiwib25maWRvX2FwaV91cmwiOiJodHRwczovL2FwaS5vbmZpZG8uY29tIiwidGVsZXBob255X3VybCI6Imh0dHBzOi8vYXBpLm9uZmlkby5jb20ifX0.MIGIAkIBg1i00ckO82dxsm8-JDofkYsg-dYhVnHN47bnJYFXhnyH-VxP-AClFp_jMrQWUPFYtIIEEs6VICsvcjYQ1TBQUVkCQgCYIF_ZsPCIIHCdRSr5fpps2Q3YcsWaisXFmChPndf3azAYkZKTjE5-z8zaAt2ghVZkD77hLHB2JxxwaUMfx-sEDw`
const params = {
  basePath: 'https://assets.onfido.com/web-sdk-releases',
  token: jwtToken,
  version: '8.1.0',
}

const onClick = () => {
  // const replacedSdkInit = replaceSdkInit(sdkInit, jwtToken)
  // console.log('replacedSdkInit', replacedSdkInit, createCodeSnippet())
  // createIFrame(params, createCodeSnippet(), params.version)
  OnfidoSDK.refresh({
    url: `https://assets.onfido.com/web-sdk-releases/8.1.1`,
    code: createCodeSnippet() 
  })
}

export default () => {
  const [opened, setOpened] = useState(false)
  const [opened2, setOpened2] = useState(false)
  const [opened3, setOpened3] = useState(false)

  return (
    <Container>
      <Placeholder id="iframe-container"/>
      <RefreshMenu>
        <Button
          variant="subtle"
          size="xs"
          onClick={onClick}
          leftIcon={<Refresh size={20} />}
        >
          Refresh
        </Button>
      </RefreshMenu>
      <Menu>
        <Button
          variant="default"
          size="xs"
          onClick={() => setOpened((o) => !o)}
          leftIcon={<Settings size={20} />}
        >
          Settings
        </Button>
        {/* <ActionIcon>
          <Devices size={20} onClick={() => setOpened2((o) => !o)} />
        </ActionIcon> */}
        {/* <ActionIcon>
          <Code size={20} onClick={() => setOpened2((o) => !o)} />
        </ActionIcon>
        <ActionIcon>
          <Qrcode size={20} onClick={() => setOpened3((o) => !o)} />
        </ActionIcon> */}
      </Menu>
      
      <SettingsModal opened={opened} onClose={() => setOpened((o) => !o)}/>
      {/* <CodeSnippetModal opened={opened2} onClose={() => setOpened2((o) => !o)}/> */}
      {/* <CodeSnippetModal opened={opened3} onClose={() => setOpened3((o) => !o)}/> */}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 32em;
`

const Placeholder = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Menu = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-top: 1px solid rgba(0, 0, 0, 0.1);
`

const RefreshMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
`
