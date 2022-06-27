import { setStore } from '.'

export const getSDKVersionList = async () => {
  const response = await fetch(
    'https://assets.onfido.com/web-sdk-base32-releases/base32map.json',
  )

  let s = await response.json()

  s = s.filter(i => i.releaseVersion != '5.9.2')

  setStore({
    sdkVersions: s.map(i => i.releaseVersion)
  })
}