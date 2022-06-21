import React, { useEffect, useRef } from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import styled from 'styled-components'
import { EditorState } from '@codemirror/state'
import { keymap } from '@codemirror/view'
import { defaultKeymap } from '@codemirror/commands'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 5px 10px;
`

const Button = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background-color: #8caf50; /* Green */
    color: gray;
  }
`

const onfidoInitSdkText = `Onfido.init({
  useModal: false,
  onComplete: function (data) {
    // callback for when everything is complete
    console.log('everything is complete')
  },
  steps: ['welcome', 'document', 'face', 'complete'],
})`

type EditorProps = {
  onClick: (text: string) => void
  className?: string
}

const Editor = ({ onClick, className }: EditorProps) => {
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
    <Container className={className}>
      <div ref={el}></div>
      <Button
        onClick={() => {
          const text = view.current.state.doc.toJSON().join('\n').trimEnd()
          onClick(text)
        }}
      >
        RUN
      </Button>
    </Container>
  )
}

export { Editor }
