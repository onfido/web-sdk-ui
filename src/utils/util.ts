import { Buffer } from 'buffer'

export const base64Decode = (s: string) => {
  return Buffer.from(s, 'base64').toString('binary')
}

export const base64Encode = (s: string) => {
  return Buffer.from(s, 'binary').toString('base64')
}