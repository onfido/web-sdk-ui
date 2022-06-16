import React from 'react'
import styled from 'styled-components'
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

const Panel = styled.div`
  width: 50%;
`

const App = () => {
  return (
    <Container>
      <Row>
        <Panel>Left Panel</Panel>
        <Panel>
          <Frame />
        </Panel>
      </Row>
    </Container>
  )
}

export { App }
