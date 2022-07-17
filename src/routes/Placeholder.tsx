import React from 'react'
import styled from 'styled-components'
import { Text } from '@mantine/core'

export default () => (
  <Container>
    <Text color="dimmed">Not available yet</Text>
  </Container>
)

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
