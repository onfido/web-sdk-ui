import React from 'react'
import { Prism } from '@mantine/prism'
import { Modal } from '@mantine/core'

const demoCode = `import { Button } from '@mantine/core';

function Demo() {
  return <Button>Hello</Button>
}`

export default (props) => (
  <Modal
    opened={props.opened}
    onClose={props.onClose}
    title="Code snippet"
    centered
    // overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
    overlayOpacity={0.55}
    overlayBlur={3}
    overflow="inside"
  >
    <Prism withLineNumbers colorScheme="light" language="tsx">
      {demoCode}
    </Prism>
  </Modal>
)
