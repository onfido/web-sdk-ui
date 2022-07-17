import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default () => (
  <Container>
    Page not found
    <Link to='/'>Go to home</Link>
  </Container>
)

const Container = styled.div``