export type Params = {
  token: string
  basePath: string
}

const parseParams = (): Params => {
  const searchParams = new URL(window.location.href).searchParams

  return {
    token: (searchParams.get('token') || '').toUpperCase(),
    basePath:
      searchParams.get('basePath') ||
      'https://assets.onfido.com/web-sdk-releases/8.1.0',
  }
}

export { parseParams }
