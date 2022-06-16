import React from 'react'
import styled from 'styled-components'
import { Editor } from './Editor'
import { Frame } from './frame'

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
  return (
    <Container>
      <Row>
        <Column>
          <Panel>{/* Add here steps */}</Panel>
          <Panel>
            <Editor />
          </Panel>
        </Column>
        <Column>
          <Frame />
        </Column>
      </Row>
    </Container>
  )
}

export { App }
