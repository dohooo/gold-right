export type Variables = { key: string; value: string }[]

export const injectVariables = (_content: string, variables: Variables): string => {
  let content = _content

  if (!content)
    return ''

  if (!variables.length)
    return content

  variables.forEach((v) => {
    content = content.replaceAll(v.key, v.value)
  })

  return content
}
