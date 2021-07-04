const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map', //CRA recommends for dev env

  devServer: {
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: true
  },
  plugins: [new ReactRefreshWebpackPlugin()]
}
