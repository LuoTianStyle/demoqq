const path = require('path')
const resolve = dir => path.join(__dirname, dir)

const Timestamp = new Date().getTime()
module.exports = {
  configureWebpack: {
    output: {
      filename: `js/[name].${Timestamp}.js`,
      chunkFilename: `js/[name].${Timestamp}.js`
    }
  },

  outputDir: process.env.outputDir,
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '云盘'
      return args
    })
    config.resolve.alias
      .set('@', resolve('src'))
      .set('imgs', resolve('src/assets/imgs'))
      .set('styles', resolve('src/assets/styles'))
    config.module.rule('svg').uses.clear()
    config.module
      .rule('svg1')
      .test(/\.svg$/)
      .use('svg-sprite')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
      .include.add(path.join(__dirname, 'src/assets/icons'))
      .end()
  },

  devServer: {
    proxy: {
      '/api_back': {
        target: 'http://pan.ciyun.vip',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api_back': ''
        }
      }
    }
  }
}
