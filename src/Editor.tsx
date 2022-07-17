import React, { useEffect, useRef, useState } from 'react'
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

  &:last-child {
    margin-left: 15px;
  }

  flex-grow: 1;
`

const Buttons = styled.div`
  display: flex;
`

type EditorProps = {
  text: string
  onRun: (text: string) => void
  onClipboardCopy: (text: string) => void
  className?: string
}

// const Styledtooltip = styled(Tooltip)`
//   display: flex;
//   width: 50%;
// `

const Editor = ({ text, onRun, onClipboardCopy, className }: EditorProps) => {
  const el = useRef<HTMLDivElement | null>(null)
  const view = useRef<EditorView | null>(null)

  const [tooltipVisible, setTooltipVisible] = useState(false)

  const extraKeymap = () => {
    return keymap.of([
      {
        key: 'Cmd-Enter',
        run() {
          onRun(view.current?.state.doc.toJSON().join('\n').trimEnd() || '')
          return true
        },
      },
      {
        key: 'Ctrl-Enter',
        run() {
          onRun(view.current?.state.doc.toJSON().join('\n').trimEnd() || '')
          return true
        },
      },
    ])
  }

  useEffect(() => {
    view.current?.destroy()
    view.current = new EditorView({
      state: EditorState.create({
        doc: text,
        extensions: [
          extraKeymap(),
          basicSetup,
          javascript(),
          keymap.of(defaultKeymap),
        ],
      }),
      parent: el.current ?? undefined,
    })
  }, [el, onRun])

  return (
    <Container className={className}>
      <div ref={el}></div>
      <Buttons>
        {/* <Styledtooltip
          opened={tooltipVisible}
          label="URL successfully copied to clipboard!"
          withArrow
        >
          <Button
            onClick={() => {
              const text =
                view.current?.state.doc.toJSON().join('\n').trimEnd() || ''
              onClipboardCopy(text)
              setTooltipVisible(true)
              setTimeout(() => {
                setTooltipVisible(false)
              }, 2000)
            }}
          >
            COPY URL TO CLIPBOARD
          </Button>
        </Styledtooltip> */}
        <Button
          onClick={() => {
            const text =
              view.current?.state.doc.toJSON().join('\n').trimEnd() || ''
            onRun(text)
          }}
        >
          RUN
        </Button>
      </Buttons>
    </Container>
  )
}

export { Editor }
