const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')

module.exports = (env_variables) => {
  const { env } = env_variables
  const envConfig = require(`./webpack.${env}.js`)

  const _config = merge(commonConfig, envConfig)

  return _config
}
