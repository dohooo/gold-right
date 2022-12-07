import fs, { readFileSync, statSync } from 'fs'
import { dirname, isAbsolute, join } from 'path'
import type { ExtensionContext } from 'vscode'
import { commands, window, workspace } from 'vscode'
import { fillPath, getWorkspacePath } from './utils/path'
import type { Variables } from './utils/processContent'
import { injectVariables } from './utils/processContent'
import { getConfig } from './utils/config'

function walkDir(dir: string, callback: (path: string) => void) {
  fs.readdirSync(dir).forEach((filePath) => {
    const dirPath = join(dir, filePath)
    const isDirectory = fs.statSync(dirPath).isDirectory()
    isDirectory
      ? walkDir(dirPath, callback)
      : callback(dirPath)
  })
}

const writeFile = (path: string, contents: string, cb: fs.NoParamCallback) => {
  fs.mkdir(dirname(path), { recursive: true }, (err) => {
    if (err)
      return cb(err)

    fs.writeFile(path, contents, cb)
  })
}

export async function activate(context: ExtensionContext) {
  async function create(params: {
    targetPath: string
    templateName: string
    templateDirectoryPath: string
  }) {
    const { targetPath, templateName, templateDirectoryPath } = params

    const config = getConfig(templateDirectoryPath)
    const templateConfig = config?.templatesConfig?.find(template => template.templateName === templateName)

    const variables: Variables = []

    for (let i = 0; i < (templateConfig?.inputsVariables?.length || 0); i++) {
      const inputConfig = templateConfig?.inputsVariables[i]

      if (!inputConfig?.key)
        continue

      let value: string

      try {
        value = (await window.showInputBox({ title: inputConfig.title })) || ''

        if (inputConfig.required && !value) {
          window.showErrorMessage(`The variable ${inputConfig.key} is required.`)
          return
        }
      }
      catch (error) {
        continue
      }

      variables.push({
        key: inputConfig.key,
        value,
      })
    }

    const templatePath = join(templateDirectoryPath, templateName)
    const templateStat = statSync(templatePath)
    if (templateStat.isDirectory()) {
      walkDir(templatePath, (filePath) => {
        const fileStat = statSync(filePath)
        if (fileStat.isFile()) {
          const targetFilePath = injectVariables(join(targetPath, filePath.replace(templatePath, '')), variables)
          if (!fs.existsSync(targetFilePath)) {
            const content = injectVariables(readFileSync(filePath, 'utf-8'), variables)
            writeFile(targetFilePath, content, (err) => {
              if (err)
                window.showErrorMessage(err.message)
            })
          }
        }
      })
    }

    window.showInformationMessage(
      'Successful create!',
    )
  }

  const workspacePath = getWorkspacePath()

  if (workspacePath) {
    const cfc = commands.registerCommand(
      'gold-right.createFileFromTemplate',
      (param) => {
        const _templateDirectoryPath = workspace
          .getConfiguration('goldRight')
          .get('templateDirectoryPath') as string

        if (!_templateDirectoryPath) {
          window.showErrorMessage(
            'The property of \'goldRight.templateDirectoryPath\' is not set.',
          )
          return
        }
        const templateDirectoryPath = isAbsolute(_templateDirectoryPath) ? _templateDirectoryPath : join(workspacePath, _templateDirectoryPath)
        const config = getConfig(templateDirectoryPath)
        const paths = config?.paths || []
        const folderPath = param.path

        const path = paths.find((path) => {
          if (path)
            return String(folderPath).startsWith(fillPath(path.directory))

          return false
        })

        if (!path) {
          window.showInformationMessage('Current directory doesn\'t have a template.')
          return
        }

        // Check whether the template exists
        const templates = path.templates.filter((templateName) => {
          const templatePath = join(templateDirectoryPath, templateName)
          const isExist = fs.existsSync(templatePath)
          if (!isExist)
            window.showErrorMessage(`Template ${templateName} doesn't exist.`)
          return isExist
        })

        window.showQuickPick(templates).then((templateName) => {
          if (templates.includes(templateName!)) {
            create({
              targetPath: fillPath(path.directory),
              templateName: templateName!,
              templateDirectoryPath,
            })
          }
        })
      },
    )

    context.subscriptions.push(cfc)
  }
  else {
    window.showErrorMessage('Please open a workspace first!')
  }
}

export function deactivate() { }
