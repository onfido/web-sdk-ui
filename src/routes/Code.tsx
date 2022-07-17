import React from 'react'
import styled from 'styled-components'
import { Prism } from '@mantine/prism'
import { CodeEditor } from '../components/CodeEditor';

const demoCode = `import { Button } from '@mantine/core';

function Demo() {
  return <Button>Hello</Button>
}`;

export default () => (
  <Screen>
    <CodeEditor/>
  </Screen>
)

const Screen = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`