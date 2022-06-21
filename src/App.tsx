import { NativeSelect, Select, SelectItem } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Editor } from './Editor'
import { createIFrame } from './frame'
import { getOnfidoToken } from './getOnfidoToken'
import { parseParams } from './parseParams'

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
  const [params] = useState(parseParams())
  const [sdkVersion, setSdkVersion] = useState('8.1.0')
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
  console.log(sdkVersion)
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
                setSdkVersion(value)
              }}
              getCreateLabel={() =>
                'Free type and press enter for other SDK version'
              }
              shouldCreate={(query) => true}
              data={SDKVersions}
              value={sdkVersion}
              onChange={(value) => setSdkVersion(value)}
            ></StyledSelect>
          </SdkVersionPanel>
          <Panel>
            <Title>Steps selection (Will be added soon)</Title>
          </Panel>
          <Panel>
            <Title>SDK init code</Title>
            <StyledEditor
              onClick={(text) => {
                text = text.replace('TOKEN_HERE', jwtToken)
                createIFrame(params, text, sdkVersion)
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
