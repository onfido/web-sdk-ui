import React, { useEffect, useRef } from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import styled from 'styled-components'
import { EditorState } from '@codemirror/state'
import { keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'

const Container = styled.div`
  padding: 0 5% 0 0;
`

const onfidoInitSdkText = `Onfido.init({
  useModal: false,
  token: 'TOKEN_HERE', // don't set this, it will be set for you
  useMemoryHistory: true, // fix for iframe issue, necessary for now
  onComplete: function (data) {
    // callback for when everything is complete
    console.log('everything is complete')
  },
  steps: ['welcome', 'document', 'face', 'complete'],
})`

type EditorProps = {
  onClick: (text: string) => void
}

const Editor = ({ onClick }: EditorProps) => {
  const el = useRef<HTMLDivElement | null>(null)
  const view = useRef<EditorView | null>(null)

  useEffect(() => {
    view.current = new EditorView({
      state: EditorState.create({
        doc: onfidoInitSdkText,
        extensions: [basicSetup, javascript(), keymap.of(defaultKeymap)],
      }),
      parent: el.current,
    })
  }, [el])

  return (
    <Container>
      <div ref={el}></div>
      <button
        onClick={() => {
          const text = view.current.state.doc.toJSON().join('\n').trimEnd()
          onClick(text)
        }}
      >
        RUN
      </button>
    </Container>
  )
}

export { Editor }
