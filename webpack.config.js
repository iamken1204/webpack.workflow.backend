var path = require('path')
var webpack = require('webpack')

// Kettan:
// webpack bundle css into js by default.
// For convenience of representing usual scenario we use css,
// this example uses ExtractTextPlugin to sepreate css out from bundled js file.
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// Kettan:
// List all files are waiting to be compiled under config.entry
// The path should start from the location of webpack.config.js
var md5 = require('md5')
var assets = require('./assets').assets
let generate = function () {
  let entry = {}
  for (chunkName in assets) {
    let hash = md5(chunkName)
    entry[hash] = assets[chunkName]
  }
  return entry
}
let entry = generate()

module.exports = {
  entry,
  // Kettan:
  // [name] correspond to config.entry's key
  output: {
    path: path.resolve(__dirname, './public/dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url?limit=2048'
      },
      // Kettan:
      // Add '?minimize' right after 'css-loader' to compress css file
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?minimize'
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?minimize!sass-loader'
        })
      }
    ]
  },
  // Kettan:
  // Add 'ExtractTextPlugin' into plugins array
  // to let webpack know css should output as a individual file
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
