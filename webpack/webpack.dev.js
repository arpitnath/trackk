const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map', //CRA recommends for dev env

  devServer: {
    hot: true,
    open: true
  },
  plugins: [new ReactRefreshWebpackPlugin()]
}
