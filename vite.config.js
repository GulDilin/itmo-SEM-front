import { resolve } from 'path'
// eslint-disable-next-line
import PagesPlugin from 'vite-plugin-pages'
import { defineConfig } from 'vite'
import VuePlugin from '@vitejs/plugin-vue'
import ESLintPlugin from 'vite-plugin-eslint'
import SvgLoaderPlugin from 'vite-svg-loader'

const isProduction = process.env.NODE_ENV === 'production'
const plugins = [
  VuePlugin(),
  PagesPlugin({
    exclude: ['**/components/*.{vue,js,jsx}', '**/utils/*.{vue,js,jsx}'],
  }),
  SvgLoaderPlugin({
    svgo: true,
    svgoConfig: {
      prefixIds: true,
      plugins: [
        {
          // https://github.com/svg/svgo
          name: 'preset-default',
          params: {
            overrides: {
              removeViewBox: false,
            },
          },
        },
        'prefixIds',
      ],
    },
  })
]
if (isProduction) plugins.push(ESLintPlugin())

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: { '@/': `${resolve(__dirname, 'src')}/` },
    extensions: ['.js', '.vue'],
  },
  plugins,
})
