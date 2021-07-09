const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      //js,ts loader
      {
        test: /\.(ts|js)x?$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      //styles loaders
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      //assets
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      //__test__
      {
        test: /test\.ts$/,
        use: 'mocha-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html')
    })
  ]
}
