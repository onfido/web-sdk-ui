import create from 'zustand'

import { Params, parseUrlParamsOrDefault, setParams } from './params'
import { getJWTToken } from './getJWTToken'
import { getSDKVersionList } from './getSDKVersionList'

interface StoreState {
  collect: () => void

  sdkVersions: string[]
  jwtToken?: string
  params: Params
}

export const useStore = create<StoreState>(() => ({
  collect: async () => {
    console.log('collecing....')
    getJWTToken()
    getSDKVersionList()
  },

  jwtToken: undefined,
  sdkVersions: [],

  params: {
    onComplete: `() => { console.log('completed') }`,
    steps: ['welcome', 'document', 'face', 'complete'],
    useModal: true,
    isModalOpen: true,
    
    // place for defaults
    ...parseUrlParamsOrDefault(),
  },
}))

const localStorageKey = 'onfido-ui-sdk-demo-storage'

// Additionals
export const {
  getState: getStore,
  setState: setStore,
  subscribe,
  destroy,
} = useStore

export const saveToLocalStorage = () => {
  localStorage.setItem(localStorageKey, JSON.stringify(getStore()))
}

export const loadFromLocalStorage = () => {
  let data

  try {
    data = JSON.parse(localStorage.getItem(localStorageKey))
  } catch (e) {
    console.error(e)
  }

  if (data) {
    setStore(data)
  }
}

getStore().collect()