import React from 'react'

import { createRoot } from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import { App } from './App'

const GlobalStyle = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }
  body {
    padding: 0 1%
  }
`

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <>
    <GlobalStyle />
    <App />
  </>
)
