import React, { useEffect, useRef } from 'react'
import { basicSetup } from 'codemirror'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { defaultKeymap } from '@codemirror/commands'
import styled from 'styled-components'
import { keymap } from '@codemirror/view'

import { githubLight  } from '@uiw/codemirror-theme-github'
import { Button, ActionIcon } from '@mantine/core'
import { Copy, Link } from 'tabler-icons-react'
import { createCodeSnippet } from './OnfidoSDK/createCodeSnippet'
import { snippetToConfig } from './OnfidoSDK/snippetToConfig'

export const CodeEditor = () => {
  const codeMirrorRef = useRef()
  const rawText = useRef('')

  const onChange = React.useCallback((value, viewUpdate) => {
    rawText.current = value
  }, []);


  return (
    <Container>
      <Header>
        {/* <Button size='xs' leftIcon={<Copy size={20}/>}>Copy code</Button> */}
        {/* <Button size='xs' leftIcon={<Link size={20}/>}>Copy link</Button> */}
        <Button size='xs' leftIcon={<Link size={20}/>} onClick={() => {
          console.log(rawText)
          snippetToConfig(rawText.current || createCodeSnippet(true))
        }}>Snippet to Config</Button>
      </Header>
      <CodeMirrorContainer>
        <CodeMirror
          ref={codeMirrorRef}
          value={createCodeSnippet(false)}
          theme={githubLight}
          extensions={[
            basicSetup,
            javascript({ jsx: true }),
            keymap.of(defaultKeymap),
          ]}
          onChange={onChange}/>
      </CodeMirrorContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: scroll;

  .cm-editor {
    height:100%;
    width: 100%;
  }
  .cm-theme{
    width: 100%;
    height: 100%;
  }
`

const CodeMirrorContainer = styled.div`
  flex: 1;
`

const Header = styled.div`
  height: 50px;
  /* background: red; */
`