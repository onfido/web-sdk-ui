import React from 'react'
import styled from 'styled-components'
import { Text } from '@mantine/core'

export const Group = ({ label, children }) => (
  <>
    <Header>
      <Text size='sm' weight='bold'>{label}</Text>
    </Header>
    {children}
  </>
)

const Header = styled.div`
  margin: 10px 0px;
`