import OnfidoSDK from '../OnfidoSDK/IFrame'
import { getStore } from '../../store'

export const snippetToConfig = (snippet: string) => {
  const store = getStore()
console.log('---', snippet)
  createIFrame(store.params, snippet, store.params.version)


}