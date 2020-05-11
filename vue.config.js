const path = require('path')
const resolve = dir => path.join(__dirname, dir)
console.log(this)
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
      args[0].title = 'Overseas agent background management system'
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
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://admin.nobook.cc/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}