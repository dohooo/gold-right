<p align="center">
  <img width="70%" align='center' src='./res/icon-light-large.png'/>
</p>  
<p align="center">
  English | <a href="./README.zh-CN.md">简体中文</a>  
</p>    

# Gold Right

> Specify various templates for different directories and create them with one click.

## Reason
Usually there is something in the project directory in a particular format, code snippet, configuration, directory structure, etc... Copying or right-clicking a new file frequently doesn't make us any more productive, so maybe we can make right-clicking `easier`.

<img width="1428" alt="IMG_6849" src="https://user-images.githubusercontent.com/32405058/173213811-529b593a-9252-4f12-9244-c9b70dabd3c7.PNG">

## Demo

https://user-images.githubusercontent.com/32405058/173213637-e1d0ea89-ad7b-434f-8d6b-a7035282838c.mp4

## installation

After [Gold-Right](https://marketplace.visualstudio.com/items?itemName=Dohooo.Gold-Right) is installed and reload VS Code, `Gold-Right` is automatically enabled
## Usage

1. Specifies the template directory location, which can be specified under workspace configuration or user configuration
```json
# Specify the templates folder in the root directory
{
    # Relative to the current workspace path
    "goldRight.templateDirectoryPath": "./templates"
    "goldRight.templateDirectoryPath": "templates"
    # An absolute path
    "goldRight.templateDirectoryPath": "/Users/user-name/Gold-Right-example/templates"
}
```

2. Create the configuration (config.json) file in the template directory
```json
{
  "paths": [
    { 
      "directory": "src/pages",
      # Use the components/hooks templates for ”src/pages“
      "templates": ["components", "hooks"]
    },
    {
      "directory": "src/hooks",
      # Use the hooks template for ”src/hooks“
      "templates": ["hooks"]
    }
  ],
  "templatesConfig": [
    {
      # Define the configuration for the Components template
      "templateName": "components",
      "inputsVariables": [
        {
          # Define the "[COMPONENT_NAME]" variable, and open the prompt box to enter the variable content
          "key": "[COMPONENT_NAME]",
          # The title of prompt box.
          "title": "Please input component name.",
          # If the this field is empty, creation will stop.
          "required": true
        }
      ]
    },
    {
      # Define the configuration for the hooks template
      "templateName": "hooks",
      "inputsVariables": [
        {
          # Define the "[HOOKS_NAME]" variable, and open the prompt box to enter the variable content
          "key": "[HOOKS_NAME]",
          # The title of prompt box.
          "title": "Please input hooks name."
        }
      ]
    }
  ]
}
```

3. Create templates

The directory structure
```shell
./templates
├── components
|   |   # The directory name "[COMPONENT_NAME]" will be replaced with the input.
│   └── [COMPONENT_NAME]
│       ├── index.tsx
│       └── styles.css
├── config.json
└── hooks
|___|   # The directory name "[HOOKS_NAME]" will be replaced with the input.
    └── [HOOKS_NAME]
        └── index.ts
```
`./templates/components/[COMPONENT_NAME]/index.tsx`
```tsx
import React from 'react';
import './styles.css';

export interface [COMPONENT_NAME]Props {

}

export const [COMPONENT_NAME]: React.FC<[COMPONENT_NAME]Props> = props => {
    return <div></div>
}
```
`./templates/hooks/[HOOKS_NAME]/index.ts`
```ts
import React from 'react'

export const [HOOKS_NAME] = () => {
  return React.useState()
}
```

## Sponsors

<p align="center">
  <a href="./sponsorkit/sponsors.svg">
    <img src='./sponsorkit/sponsors.png'/>
  </a>
</p>

## License

[MIT]('./LICENSE.md)
