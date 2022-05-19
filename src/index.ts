import fs from 'fs'
import path from 'path'
import type { ExtensionContext } from 'vscode'
import { commands, window, workspace } from 'vscode'

export function activate(context: ExtensionContext) {
  function createComponent(dirInfo: {
    folderPath: string
    componentName: string
    componentExtension: string
    componentFilename: string
    cssExtension: string
    cssFilename: string
  }) {
    const { folderPath, componentName: _componentName, componentExtension, componentFilename, cssExtension, cssFilename } = dirInfo
    const componentName = _componentName.charAt(0).toLocaleUpperCase() + _componentName.slice(1)

    const componentTemplateSrc = path.resolve(__dirname, 'template/component')
    const styledTemplateSrc = path.resolve(__dirname, 'template/styled')
    const dest = path.join(folderPath, componentName)
    const componentTemplate = fs.readFileSync(componentTemplateSrc, { encoding: 'utf-8' })
    const styledTemplate = fs.readFileSync(styledTemplateSrc, { encoding: 'utf-8' })

    if (fs.existsSync(dest)) {
      window.showInformationMessage(`${componentName} already exists, please choose another name.`)
      return
    }

    fs.mkdirSync(dest)
    fs.writeFileSync(path.resolve(`${dest}/${cssFilename}.${cssExtension}`), styledTemplate)
    fs.writeFileSync(
      path.resolve(`${dest}/${componentFilename}.${componentExtension}`),
      componentTemplate
        .replace(/\[componentName\]/g, componentName)
        .replace(/\[cssExtension\]/, cssExtension)
        .replace(/\[cssFileName\]/, cssFilename),
    )
    window.showInformationMessage(
      `Succeeded in creating ${componentName} component!`,
    )
  }

  const cfc = commands.registerCommand(
    'gold-right.createComponent',
    (param) => {
      const folderPath = param.fsPath
      const defaultComponentName = folderPath.split('/').pop()
      const options = {
        prompt: 'Please input the component name: ',
        placeHolder: `Component Name (default:${defaultComponentName})`,
      }

      const componentExtension = workspace
        .getConfiguration('goldRight')
        .get('componentExtension') as string
      const componentFilename = workspace
        .getConfiguration('goldRight')
        .get('componentFilename') as string
      const cssExtension = workspace
        .getConfiguration('goldRight')
        .get('cssExtension') as string
      const cssFilename = workspace
        .getConfiguration('goldRight')
        .get('cssFilename') as string

      if (!componentExtension)
        window.showInformationMessage('Please set the componentExtension in the settings. ')

      if (!cssExtension)
        window.showInformationMessage('Please set the cssExtension in the the settings.')

      if (!cssFilename)
        window.showInformationMessage('Please set the cssFilename in the settings.')

      window.showInputBox(options).then((componentName) => {
        createComponent({
          folderPath,
          // inputName -> current directory name
          componentName: componentName || defaultComponentName,
          componentFilename,
          componentExtension,
          cssExtension,
          cssFilename,
        })
      })
    },
  )

  context.subscriptions.push(cfc)
}

export function deactivate() { }
