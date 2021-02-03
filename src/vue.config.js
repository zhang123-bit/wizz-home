const proxyObj = {}
proxyObj['/'] = {
  target: 'https://homepage.backend.wizzstudio.com/api',
  changeOrigin: true,
  pathRewrite: {
    '^/': ''
  }
}
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
}