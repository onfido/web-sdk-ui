import React from 'react'
import styled from 'styled-components'
import { font, color } from '@onfido/castor'
import { Select, ActionIcon, Text, Divider, TextInput } from '@mantine/core'
import { IconReset, IconChevronDown } from '@onfido/castor-icons'
import { Ban } from 'tabler-icons-react'

type LabelProps = {
  title: string
  description?: string
}

// Support: Select, TextInput, Checkbox
export const Label = (props: LabelProps) => (
  <Container>
    <Text size="sm">{props.title}</Text>
    <Text size="xs" color="dimmed">{props.description}</Text>
    <Content>

      <Select
        // label="Your favorite framework/library"
        placeholder="Pick one"
        // rightSection={<IconChevronDown size={14} />}

        data={[
          { value: 'react', label: 'React' },
          { value: 'ng', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'vue', label: 'Vue' },
        ]}
      />
      {/* <TextInput
      placeholder="Your name"
      // label="Full name"
      required
    /> */}
      {/* <ActionIcon>
        <Ban size={20}/>
      </ActionIcon> */}
    </Content>
    <Divider my="sm" />
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
  /* border: 1px solid red; */
`

const Content = styled.div`
  display: flex;
  flex: 1;
  /* align-items: center; */
  margin-top: 10px;
  /* background:red; */
  flex-direction: column;
`