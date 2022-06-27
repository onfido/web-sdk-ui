/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly TOKEN_FACTORY_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}