const path = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    symlinks: false,
    cacheWithContext: false,
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  output: {
    library: {
      type: 'commonjs'
    },
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  target: 'node',
  externals: [nodeExternals()],
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack')
          ]
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true
        }
      }
    ]
  },
  plugins: []
}
