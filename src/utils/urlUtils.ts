import { Buffer } from 'buffer'

const DEFAULT_SDK_VERSION = '8.1.0'
const DEFAULT_BASEPATH = 'https://assets.onfido.com/web-sdk-releases'
const DEFAULT_INIT = `Onfido.init({
  onComplete: function (data) {
    // callback for when everything is complete
    console.log('everything is complete')
  },
  steps: ['welcome', 'document', 'face', 'complete'],
})`

export type Params = {
  token: string
  basePath: string
  init: string
  version: string
}

const base64Decode = (s: string) => {
  return Buffer.from(s, 'base64').toString('binary')
}

const base64Encode = (s: string) => {
  return Buffer.from(s, 'binary').toString('base64')
}

const parseUrlParamsOrDefault = (): Params => {
  const searchParams = new URL(window.location.href).searchParams
  return {
    token: (searchParams.get('token') || '').toUpperCase(),
    basePath: searchParams.get('basePath') || DEFAULT_BASEPATH,
    init: base64Decode(searchParams.get('init') || '') || DEFAULT_INIT,
    version: searchParams.get('version') || DEFAULT_SDK_VERSION,
  }
}

const buildShareUrl = (init: string, version: string): string => {
  const url = new URL(window.location.href)
  const searchParams = url.searchParams
  searchParams.delete('init')
  searchParams.delete('version')
  searchParams.append('version', version)
  searchParams.append('init', base64Encode(init))
  return `${url.origin}${url.pathname}?${searchParams.toString()}`
}

export { parseUrlParamsOrDefault, buildShareUrl }
