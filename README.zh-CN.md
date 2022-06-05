<p align="center">
  <img align='center' src='./res/icon.png'/>
</p>  
<p align="center">
  <a href="./README.md">English</a> | 简体中文  
</p>    

# Gold Right

> 为不同的目录指定各种模板，然后通过一键创建。

## 演示



## 安装

安装[Gold-Right](https://marketplace.visualstudio.com/items?itemName=Dohooo.Gold-Right)并重启VS Code后，`Gold-Right`会自动开启。

## 使用

1. 指定模板目录位置，可在工作区配置或用户配置下指定
```json
# 指定为根目录下的templates文件夹
{
    # 相对于当前工作区路径
    "goldRight.templateDirectoryPath": "./templates"
    "goldRight.templateDirectoryPath": "templates"
    # 绝对路径
    "goldRight.templateDirectoryPath": "/Users/user-name/Gold-Right-example/templates"
}
```

2. 在模板目录下创建配置（config.json）文件
```json
{
  "paths": [
    { 
      "directory": "src/pages",
      # 对src/pages使用 components/hooks 模板
      "templates": ["components", "hooks"]
    },
    {
      "directory": "src/hooks",
      # 对src/hooks使用 hooks 模板
      "templates": ["hooks"]
    }
  ],
  "templatesConfig": [
    {
      # 对 components 模板定义配置
      "templateName": "components",
      "inputsVariables": [
        {
          # 定义[COMPONENT_NAME]变量，并打开提示框输入变量内容
          "key": "[COMPONENT_NAME]",
          # 输入框标题
          "title": "Please input component name.",
          # 必填项为空时将会停止创建
          "required": true
        }
      ]
    },
    {
      # 对 hooks 模板定义配置
      "templateName": "hooks",
      "inputsVariables": [
        {
          # 定义[HOOKS_NAME]变量，并打开提示框输入变量内容
          "key": "[HOOKS_NAME]",
          # 输入框标题
          "title": "Please input hooks name."
        }
      ]
    }
  ]
}
```

3. 创建模板内容

目录结构
```shell
./templates
├── components
|   |   # [COMPONENT_NAME] 目录名将会被输入的内容替换
│   └── [COMPONENT_NAME]
│       ├── index.tsx
│       └── styles.css
├── config.json
└── hooks
|___|   # [HOOKS_NAME] 目录名将会被输入的内容替换
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

## 赞助者

<p align="center">
  <a href="./sponsorkit/sponsors.svg">
    <img src='./sponsorkit/sponsors.png'/>
  </a>
</p>

## License

MIT