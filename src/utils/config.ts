import { readFileSync } from 'fs'
import { join } from 'path'

interface PathMapping {
  directory: string
  templates: string[]
}

interface InputConfig {
  key: string
  title?: string
  required?: boolean
}

export type Config = Partial<{
  paths: Array<PathMapping>
  templatesConfig: {
    templateName: string
    inputsVariables: InputConfig[]
  }[]
}>

export const getConfig = (templateDirectoryPath: string): Config => {
  return JSON.parse(readFileSync(join(templateDirectoryPath, 'config.json'), 'utf-8') || '') as Config
}
