import React from 'react'
import styled, { css } from 'styled-components'
import { Text, Tooltip } from '@mantine/core'
import { ExternalLink } from 'tabler-icons-react'
import { Link } from '../Link'

export const Item = ({ label, description, Icon, external, small, to }) => (
  <Link to={to} external={external}>
    <Container small={small}>
      {small && (
        <Tooltip position="right" label={label} withArrow gutter={10}>
          <Icon size={20} />
        </Tooltip>
      )}

      {!small && (
        <Row>
          <Icon size={20} />
          <Info>
            <Text size="sm">{label}</Text>
            <Text size="xs" color="dimmed">
              {description}
            </Text>
          </Info>
          {external && <ExternalLink size={14} />}
        </Row>
      )}
    </Container>
  </Link>
)

const Container = styled.div`
  display: flex;
  margin: 5px 0px;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;

  outline: none;
  text-decoration: none;
  color: black;

  ${(props) =>
    props.small &&
    css`
      align-items: center;
      justify-content: center;
    `}
  &:hover {
    background: rgba(0, 0, 255, 0.05);
  }
`

const Content = styled.div`
  flex: 1;
  margin-left: 5px;
`

const Row = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 5px 5px;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 10px;
  /* background: red; */
`
