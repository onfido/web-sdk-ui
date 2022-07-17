import React from 'react'
import styled from 'styled-components'
import { Routes, Route } from 'react-router-dom'

import Menu from './components/Menu/Menu'

import HomeContent from './routes/Home/Content'
import Demo from './routes/Demo'
import Placeholder from './routes/Placeholder'
import Code from './routes/Code'
import UserFlows from './routes/UserFlows'
import Console from './routes/Console'
import Localisation from './routes/Localisation'
import OnfidoSDK from './components/OnfidoSDK'

export const App = () => (
    <Routes>
      <Route path="/signin" element={<Placeholder />} />
      <Route path="/signout" element={<Placeholder />} />

      <Route path="/demo" element={<Demo />} />
      <Route path="*" element={<Configurator />} />
    </Routes>
)

const Configurator = () => (
  <Container>
    <Menu/>
    <Content>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/demo" element={<Demo />} />
        {/* <Route path='/demo/:hash' element={<Demo/>}/> */}

        <Route path='/code' element={<Code/>}/>
        {/* <Route path='/userflows' element={<UserFlows/>}/> */}
        {/* <Route path='/console' element={<Console/>}/> */}
        {/* <Route path='/localisation' element={<Localisation/>}/> */}
        <Route path="*" element={<Placeholder />} />
      </Routes>
    </Content>
    <OnfidoSDK />
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`

const Content = styled.div`
  display: flex;
  flex: 1;
  background: #f6f9fb;
`
