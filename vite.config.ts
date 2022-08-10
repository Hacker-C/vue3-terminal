import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: ['vue', 'pinia'], // 自动引入外部 api
      dirs: ['./src/hooks', './src/store'], // 自动引入 hooks
      dts: './auto-imports.d.ts',
      // eslint报错解决
      eslintrc: {
        enabled: true, // 默认 false，需要更新配置时开启，要重新运行项目生成
        filepath: './.eslintrc-auto-import.json'
      }
    }),
    Components({
      dirs: ['src/components'], // 自动引入 components 中的组件
      resolvers: []
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
