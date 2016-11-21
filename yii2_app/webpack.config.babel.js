import ASSET from './assets/asset'
import path from 'path'
import webpack from 'webpack'

// webpack bundle css into js by default.
// For convenience of representing usual scenario we use css,
// this example uses ExtractTextPlugin to sepreate css out from bundled js file.
import ExtractTextPlugin from 'extract-text-webpack-plugin'

// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

var entry = ASSET.getEntry()

module.exports = {
  entry,
  // [name] correspond to config.entry's key
  output: {
    path: path.resolve(__dirname, './web/dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  resolve: {
    // Set default directory of assets,
    // to reduce length and complexity while
    // importing js files.
    modules: [
      path.resolve(__dirname, ASSET.basePath),
      "node_modules"
    ],
    // Let webpack resolve suffix automatically.
    extensions: ['.js', '.vue', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: 'css-loader?minimize!sass-loader'
            }),
            css: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: 'css-loader?minimize'
            }),
          }
        }
      },
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader?limit=2048'
      },
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
  // Add 'ExtractTextPlugin' into plugins array
  // to let webpack know css should output as a individual file
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      /* chunkName= */name: "vendors",
      /* filename= */ filename: "vendors.js"
    }),
    // new BundleAnalyzerPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false
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
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ])
}
