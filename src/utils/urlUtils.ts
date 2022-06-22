import { Buffer } from 'buffer'

export type Params = {
  token: string
  basePath: string
  init: string
}

const base64Decode = (s: string) => {
  return Buffer.from(s, 'base64').toString('binary')
}

const base64Encode = (s: string) => {
  return Buffer.from(s, 'binary').toString('base64')
}

const parseParams = (): Params => {
  const searchParams = new URL(window.location.href).searchParams
  return {
    token: (searchParams.get('token') || '').toUpperCase(),
    basePath:
      searchParams.get('basePath') ||
      'https://assets.onfido.com/web-sdk-releases',
    init: base64Decode(searchParams.get('init') || ''),
  }
}

const buildUrl = (init: string): string => {
  const url = new URL(window.location.href)
  const searchParams = url.searchParams
  searchParams.delete('init')
  searchParams.append('init', base64Encode(init))
  return `${url.origin}${url.pathname}?${searchParams.toString()}`
}

const initialOnfidoInitSdkText = `Onfido.init({
  onComplete: function (data) {
    // callback for when everything is complete
    console.log('everything is complete')
  },
  steps: ['welcome', 'document', 'face', 'complete'],
})`

export { parseParams, buildUrl, initialOnfidoInitSdkText }
