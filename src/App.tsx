import { Select } from '@mantine/core'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Editor } from './Editor'
import { createIFrame } from './frame'
import { buildShareUrl } from './utils/buildShareUrl'
import { replaceSdkInit } from './utils/replaceSdkInit'
import { useStore } from './store'
import { setParams } from './store/params'

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

const StyledSelect = styled(Select)`
  width: 80%;
`

const StyledEditor = styled(Editor)`
  height: 95%;
`

const App = () => {
  const { collect, jwtToken, sdkVersions, params } = useStore()

  useEffect(() => {
    collect()
  }, [])
  
  if(!jwtToken){
    return 'loading'
  }

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
                if (sdkVersions.indexOf(value) === -1) {
                  sdkVersions.push(value)
                }
                setParams({ ...params, version: value })
              }}
              shouldCreate={(query) => true}
              data={sdkVersions}
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
                createIFrame(params, replacedSdkInit, params.version)
              }}
              onClipboardCopy={async (sdkInit) => {
                const url = buildShareUrl(sdkInit)
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
