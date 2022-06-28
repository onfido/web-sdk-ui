import { setStore } from '.'

// @ts-ignore
const secretToken = import.meta.env.VITE_TOKEN_FACTORY_SECRET_KEY

export const getJWTToken = async () => {
  var req = new Request('https://token-factory.onfido.com/sdk_token?')
  req.headers.append('Authorization', 'BASIC ' + secretToken)

  const response = await fetch(req)
  const data = await response.json()

  setStore({
    jwtToken: data?.message
  })
}