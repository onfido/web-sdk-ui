import { setStore } from '.'
import { base64Encode, base64Decode } from '../utils/util'

export type Params = {
  token: string
  basePath: string
  init: string
  version: string
}

const DEFAULT_SDK_VERSION = '8.1.0'
const DEFAULT_BASEPATH = 'https://assets.onfido.com/web-sdk-releases'
const DEFAULT_INIT = `Onfido.init({
  onComplete: function (data) {
    // callback for when everything is complete
    console.log('everything is complete')
  },
  steps: ['welcome', 'document', 'face', 'complete'],
})`

export const parseUrlParamsOrDefault = (): Params => {
  const searchParams = new URL(window.location.href).searchParams
  return {
    token: (searchParams.get('token') || '').toUpperCase(),
    basePath: searchParams.get('basePath') || DEFAULT_BASEPATH,
    init: base64Decode(searchParams.get('init') || '') || DEFAULT_INIT,
    version: searchParams.get('version') || DEFAULT_SDK_VERSION,
  }
}

export const setParams = (params) => setStore({
  params
})