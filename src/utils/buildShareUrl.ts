import { base64Encode } from './util'
import { getStore } from '../store'

const buildShareUrl = (init): string => {
  const store = getStore()
  const url = new URL(window.location.href)
  const searchParams = url.searchParams
  searchParams.delete('init')
  searchParams.delete('version')
  searchParams.append('version', store.params.version)
  searchParams.append('init', base64Encode(init))
  return `${url.origin}${url.pathname}?${searchParams.toString()}`
}

export { buildShareUrl }
