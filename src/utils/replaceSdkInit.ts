const replaceSdkInit = (text: string, jwtToken: string) => {
  let copy = `${text}`.trim()

  copy = copy.slice(0, -3) // remove the }) characters.

  if (text.indexOf('token') === -1) {
    copy = copy + `\ntoken: '${jwtToken}',`
  }
  if (text.indexOf('useMemoryHistory') === -1) {
    copy = copy + `\nuseMemoryHistory: true,`
  }

  copy = copy + '\n})'

  return copy
}

export { replaceSdkInit }
