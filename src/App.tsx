import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Editor } from './Editor'
import { createIFrame } from './frame'
import { getOnfidoToken } from './getOnfidoToken'
import { parseParams } from './parseParams'

const Container = styled.div`
  display: flex;
  width: 100%;
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
  height: 98vh;
`

const Panel = styled.div`
  height: 50%;
  border: 1px solid black;
  border-radius: 5px;
  margin: 0 0 15px 0;
  padding: 10px 0;
`

const Title = styled.div`
  font-size: larger;
  font-weight: bold;
  text-align: center;
`

const FRameContainer = styled.div`
  border: 4px dashed gray;
  border-radius: 5px;
  margin-left: 10px;
  height: 100%;
`

const App = () => {
  const [jwtToken, setJwtToken] = useState('')
  const [params] = useState(parseParams())
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
          <Panel>
            <Title>Steps selection (Will be added soon)</Title>
          </Panel>
          <Panel>
            <Title>SDK init code</Title>
            <Editor
              onClick={(text) => {
                text = text.replace('TOKEN_HERE', jwtToken)
                createIFrame(params, text)
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
