const getOnfidoToken = async (token: string): Promise<string> => {
  var req = new Request('https://token-factory.onfido.com/sdk_token?')
  req.headers.append('Authorization', 'BASIC ' + token)
  const resp = await fetch(req)
  return (await resp.json()).message
}

export { getOnfidoToken }
