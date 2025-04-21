// vite-plugin-css-modules-import.ts
import { Plugin } from 'vite'
import path from 'path'
import fs from 'fs'
import postcss from 'postcss'
import modules from 'postcss-modules'
import MagicString from 'magic-string'

interface Options {
  libDir?: string
  include?: (string | RegExp)[]
  exclude?: (string | RegExp)[]
}

export default function cssModulesImport(options: Options = {}): Plugin {
  const defaultOptions = {
    libDir: 'src/components',
    include: [/\.(jsx|tsx)$/],
    exclude: [/node_modules/]
  }

  const mergedOptions = { ...defaultOptions, ...options }
  const cssModulesMap = new Map<string, string>()

  return {
    name: 'vite-plugin-css-modules-import',
    enforce: 'pre',

    // 统一处理所有文件转换
    async transform(code, id) {
      // 1. 处理 CSS Modules 文件
      if (id.includes('.module.css')) {
        // 使用 Promise 获取生成的 tokens
        const tokens = await new Promise<Record<string, string>>((resolve) => {
          postcss([
            modules({
              generateScopedName: '[name]__[local]___[hash:base64:5]',
              getJSON: (_, json) => resolve(json) // 通过回调函数返回值
            })
          ]).process(code)
        })

        cssModulesMap.set(id, JSON.stringify(tokens))
        return {
          code: `export default ${JSON.stringify(tokens)};`,
          map: null
        }
      }

      // 2. 处理组件文件
      const { include, exclude } = mergedOptions
      if (
        include.some(p => id.match(p)) &&
        !exclude.some(p => id.match(p))
      ) {
        const componentDir = path.dirname(id)
        const cssModulePath = await findCSSModule(componentDir)

        if (!cssModulePath) return null

        const s = new MagicString(code)
        const importStatement = `import __styles from '${cssModulePath}';`

        // 智能插入导入语句
        if (/export default \w+/.test(code)) {
          s.prepend(importStatement)
        } else {
          s.prepend(`${importStatement}\n`)
        }

        // 开发环境添加 HMR 支持
        if (process.env.NODE_ENV !== 'production') {
          s.prepend(`import.meta.hot?.accept();\n`)
        }

        return {
          code: s.toString(),
          map: s.generateMap()
        }
      }

      return null
    },

    // 生成类型声明
    generateBundle() {
      const typeContent = Array.from(cssModulesMap)
        .map(([filePath, tokens]) => {
          const relativePath = path.relative(process.cwd(), filePath)
          return `declare module '${relativePath}' {\n  const classes: ${tokens};\n  export default classes;\n}`
        })
        .join('\n\n')

      this.emitFile({
        type: 'asset',
        fileName: 'css-modules.d.ts',
        source: typeContent
      })
    }
  }

  // 查找 CSS Module 文件
  async function findCSSModule(dir: string) {
    const baseName = path.basename(dir)
    const possibleFiles = [
      `${baseName}.module.css`,
      'index.module.css',
      'style.module.css'
    ]

    for (const file of possibleFiles) {
      const fullPath = path.join(dir, file)
      if (fs.existsSync(fullPath)) {
        return fullPath
      }
    }
    return null
  }
}
