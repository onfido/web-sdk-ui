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
`

const Panel = styled.div`
  min-height: 50vh;
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
          <Panel>{/* Add here steps */}</Panel>
          <Panel>
            <Editor
              onClick={(text) => {
                text = text.replace('TOKEN_HERE', jwtToken)
                createIFrame(params, text)
              }}
            />
          </Panel>
        </Column>
        <Column>
          <div id="iframe-container"></div>
        </Column>
      </Row>
    </Container>
  )
}

export { App }
