import React, { useEffect } from 'react'
import styled from 'styled-components'
import { replaceSdkInit } from '../utils/replaceSdkInit'
import { createIFrame } from '../frame'

const sdkInit = `Onfido.init({
  onComplete: function (data) {
    // callback for when everything is complete
    console.log('everything is complete')
  },
  steps: ['welcome', 'document', 'face', 'complete'],
})`
const jwtToken = `eyJhbGciOiJFUzUxMiJ9.eyJleHAiOjE2NTgwNTg0NzAsInBheWxvYWQiOnsiYXBwIjoiMjAxYjEzNDgtNDRiMy00ODEzLTgzZTQtMjFhMmJiMWRmY2M3IiwiY2xpZW50X3V1aWQiOiJjZTY5ZjE4Zi04MDA2LTQyM2QtYWZkYS1mY2FmZjBkZTIxNTQiLCJpc19zYW5kYm94IjpmYWxzZSwic2FyZGluZV9zZXNzaW9uIjoiMWI2NDBkNTctNDFmYy00Y2U0LWEyM2QtNWM1NjdkMGEzMjc0In0sInV1aWQiOiJicTlabGYtbmRjQiIsImVudGVycHJpc2VfZmVhdHVyZXMiOnsiY29icmFuZCI6dHJ1ZSwibG9nb0NvYnJhbmQiOnRydWUsImhpZGVPbmZpZG9Mb2dvIjp0cnVlLCJ1c2VDdXN0b21pemVkQXBpUmVxdWVzdHMiOnRydWUsImRpc2FibGVNb2JpbGVTZGtBbmFseXRpY3MiOnRydWV9LCJ1cmxzIjp7ImRldGVjdF9kb2N1bWVudF91cmwiOiJodHRwczovL3Nkay5vbmZpZG8uY29tIiwic3luY191cmwiOiJodHRwczovL3N5bmMub25maWRvLmNvbSIsImhvc3RlZF9zZGtfdXJsIjoiaHR0cHM6Ly9pZC5vbmZpZG8uY29tIiwiYXV0aF91cmwiOiJodHRwczovL2FwaS5vbmZpZG8uY29tIiwib25maWRvX2FwaV91cmwiOiJodHRwczovL2FwaS5vbmZpZG8uY29tIiwidGVsZXBob255X3VybCI6Imh0dHBzOi8vYXBpLm9uZmlkby5jb20ifX0.MIGIAkIBg1i00ckO82dxsm8-JDofkYsg-dYhVnHN47bnJYFXhnyH-VxP-AClFp_jMrQWUPFYtIIEEs6VICsvcjYQ1TBQUVkCQgCYIF_ZsPCIIHCdRSr5fpps2Q3YcsWaisXFmChPndf3azAYkZKTjE5-z8zaAt2ghVZkD77hLHB2JxxwaUMfx-sEDw`
const params = {
  basePath: 'https://assets.onfido.com/web-sdk-releases',
  token: jwtToken,
  version: '8.1.0',
}

const onClick = () => {
  const replacedSdkInit = replaceSdkInit(sdkInit, jwtToken)
  createIFrame(params, replacedSdkInit, params.version)
}

export default () => {
  useEffect(() => {
    onClick()
  }, [])

  return (
    <Placeholder id="iframe-container" onClick={onClick} />
  )
}

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  background: #f6f9fb;
  padding: 20px;
`

const Placeholder = styled.div``
