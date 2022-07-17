import { getStore } from '../../store'

const functionNames = ['onComplete', 'onModalRequestClose']

export const createCodeSnippet = (executable = false) => {
  const store = getStore()

  const result = [
    `token: '${executable ? store?.jwtToken : "<Your token here>"}'`,
    `useMemoryHistory: true`,
  ]

  Object.entries(store.params).forEach(([key, value]) => {
    if(key === 'init' || key === 'version' || key === 'basePath' || key === 'token' ){ return }

    if(functionNames.indexOf(key) === -1){
      value = JSON.stringify(value, null, 8)
    }

    result.push(`${key}: ${value}`)
  })

  if(executable){
    return `Onfido.init({${result}});`
  }

  return `Onfido.init({\n\t${result.join(',\n\t')}\n});`
} 