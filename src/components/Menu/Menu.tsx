import {
  Divider,
  Burger,
  Drawer,
} from '@mantine/core'
import React from 'react'
import styled, { css } from 'styled-components'
import {
  Adjustments,
  Book2,
  BoxMultiple,
  Brush,
  Bug,
  Code,
  DeviceDesktopAnalytics,
  Home,
  Language,
} from 'tabler-icons-react'
import { Item } from './Item'
import { useToggle } from '@mantine/hooks'

import OnfidoSVG from '../../assets/onfido-logo.svg'

export default () => {
  const [opened, toggle] = useToggle(false, [false, true])

  return (
    <>
      <Menu small={true} onOpen={toggle} />
      <Drawer
        closeOnClickOutside={true}
        closeOnEscape={true}
        withCloseButton={false}
        opened={opened}
        onClose={toggle}
        styles={{
          drawer: { display: 'flex' },
        }}
      >
        <Menu small={false} />
      </Drawer>
    </>
  )
}

export const Menu = (props) => {
  const small = props.small

  return (
    <Container small={small}>
      <Header>
        {!small && <Logo src={OnfidoSVG} height={25} />}
        {small && <Burger size="sm" opened={!small} onClick={props.onOpen} />}
      </Header>
      <Divider />
      <Content>
        <Item small={small} label="Home" Icon={Home} to="/" />
        <Item
          small={small}
          label="User flow"
          Icon={BoxMultiple}
          to="/userflows"
        />
        <Item
          small={small}
          label="UI customization"
          Icon={Brush}
          to="/customization"
        />
        <Item
          small={small}
          label="Localisation"
          Icon={Language}
          to="/localisation"
        />
        <Item
          small={small}
          label="Options"
          Icon={Adjustments}
          description="See & try all configurations"
          to="/options"
        />
        <Item
          small={small}
          label="Console"
          description="See live analytics, errors & events"
          Icon={DeviceDesktopAnalytics}
          to="/console"
        />
         <Item
          small={small}
          label="Code"
          description="Write & change code"
          Icon={Code}
          to="/code"
        />
        <Spacer />
        <Divider />
        <Item
          small={small}
          label="Documentation"
          Icon={Book2}
          external
          to="https://documentation.onfido.com/sdk/web/"
        />
        <Item
          small={small}
          label="Report issue"
          Icon={Bug}
          external
          to="https://github.com/onfido/onfido-sdk-ui/issues"
        />
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);

  ${(props) =>
    !props.small &&
    css`
      flex: 1;
    `}
`

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
`

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Logo = styled.img`
  margin: 15px 0px;
`

const Spacer = styled.div`
  display: flex;
  flex: 1;
`

const Minimize = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
