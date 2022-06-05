import { isAbsolute, join } from 'path'
import { workspace } from 'vscode'

export const getWorkspacePath = (): string | undefined => {
  if (!workspace.workspaceFolders?.length)
    return undefined

  const workspacePath = workspace.workspaceFolders[0].uri.path
  return workspacePath
}

export const fillPath = (path: string) => {
  if (isAbsolute(path))
    return path

  return join(getWorkspacePath()!, path)
}
