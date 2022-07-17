import React from 'react'

import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter } from "react-router-dom"

import { App } from './App'

import './styles/index.scss'
import '../node_modules/@onfido/castor/dist/castor.css'

const GlobalStyle = createGlobalStyle`
  #root {
    display: flex;
    flex: 1;
    height: 100%;
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
`

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </>
)
