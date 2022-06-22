import { Select } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Editor } from './Editor'
import { createIFrame } from './frame'
import { getOnfidoToken } from './getOnfidoToken'
import { buildShareUrl, parseUrlParamsOrDefault } from './utils/urlUtils'
import { replaceSdkInit } from './utils/replaceSdkInit'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 98vh;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
`

const Panel = styled.div`
  height: 100%;
  border: 1px solid black;
  border-radius: 5px;
  margin: 0 0 15px 0;
  padding: 10px 0;

  &:last-child {
    margin-bottom: 0px;
  }
`

const SdkVersionPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  justify-content: space-around;
`

const Title = styled.div`
  font-size: large;
  font-weight: bold;
  text-align: center;
  height: 5%;
`

const FRameContainer = styled.div`
  border: 2px dashed gray;
  border-radius: 5px;
  margin-left: 10px;
  height: 100%;
`

const SDKVersions = ['6.20.0', '8.0.0', '8.1.0', '9.0.0-beta.3']

const StyledSelect = styled(Select)`
  width: 80%;
`

const StyledEditor = styled(Editor)`
  height: 95%;
`

const App = () => {
  const [jwtToken, setJwtToken] = useState('')
  const [params, setParams] = useState(parseUrlParamsOrDefault())
  if (SDKVersions.indexOf(params.version) === -1) {
    // allow the select to show even custom versions
    SDKVersions.push(params.version)
  }
  if (!params.token) {
    return (
      <Container>
        Please set the onfido sdk ?token= parameter in the URL
      </Container>
    )
  }
  useEffect(() => {
    const fetchToken = async () => {
      const jwt = await getOnfidoToken(params.token)
      setJwtToken(jwt)
    }
    fetchToken().catch(console.error)
  }, [])
  return (
    <Container>
      <Row>
        <Column>
          <SdkVersionPanel>
            <Title>Select SDK Version</Title>
            <StyledSelect
              creatable
              searchable
              onCreate={(value) => {
                if (SDKVersions.indexOf(value) === -1) {
                  SDKVersions.push(value)
                }
                setParams({ ...params, version: value })
              }}
              getCreateLabel={(value) => {
                if (!value || SDKVersions.indexOf(value) > -1) {
                  return 'Free type for custom SDK version'
                }
                return `Click here or press enter for '${value}' SDK version`
              }}
              shouldCreate={(query) => true}
              data={SDKVersions}
              value={params.version}
              onChange={(value) => {
                console.log(value)
                if (value) {
                  setParams({ ...params, version: value })
                }
              }}
            ></StyledSelect>
          </SdkVersionPanel>
          <Panel>
            <Title>Steps selection (Will be added soon)</Title>
          </Panel>
          <Panel>
            <Title>SDK init code</Title>
            <StyledEditor
              text={params.init}
              onRun={(sdkInit) => {
                const replacedSdkInit = replaceSdkInit(sdkInit, jwtToken)
                console.log(replacedSdkInit)
                createIFrame(params, replacedSdkInit, params.version)
              }}
              onClipboardCopy={async (sdkInit) => {
                console.log(sdkInit)
                const url = buildShareUrl(sdkInit, params.version)
                await navigator.clipboard.writeText(url)
              }}
            />
          </Panel>
        </Column>
        <Column>
          <FRameContainer id="iframe-container"></FRameContainer>
        </Column>
      </Row>
    </Container>
  )
}

export { App }