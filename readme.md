# Webpack workflow for PHP back-end 📦

## Requirements
> Server
>
> * node v6.4.0     [install](https://github.com/creationix/nvm#install-script)
> * npm  v3.10.3

> Project
>
> * .babelrc
> * package.json
> * webpack.config.js
> * assets.js

## Manage project assets
Clone this boilerplate into your project's root path
```
$ git clone https://github.com/iamken1204/webpack.workflow.backend.git
```
Initialize npm packages
```
$ npm i
```
Edit asset files   
The only file you have to edit is `asset.js`, see [example](https://github.com/iamken1204/webpack.workflow.backend/blob/master/assets.js)   
Once done, you can start to build asset files
```bash
# webpack will watch file and re-compile after every modification
$ npm run dev
# webpack will build assets within production mode
$ npm run build
```

##### .babelrc
```
{
  "presets": [
    ["es2015", { "modules": false }],
    ["stage-1"]
  ]
}
```

##### package.json
```json
{
  "private": true,
  "scripts": {
    "live": "webpack-dev-server --inline --hot",
    "dev": "webpack --watch",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
  },
  "devDependencies": {
    "babel-core": "^6.0.0",
    "babel-loader": "^6.0.0",
    "babel-polyfill": "^6.13.0",
    "babel-preset-es2015": "^6.13.2",
    "babel-preset-stage-1": "^6.13.0",
    "cross-env": "^1.0.6",
    "css-loader": "^0.23.1",
    "extract-text-webpack-plugin": "^2.0.0-beta.3",
    "file-loader": "^0.8.4",
    "md5": "^2.2.1",
    "node-sass": "^3.9.3",
    "sass-loader": "^4.0.2",
    "style-loader": "^0.13.1",
    "url-loader": "^0.5.7",
    "vue": "^2.0.1",
    "vue-loader": "^9.5.0",
    "vue-resource": "^1.0.3",
    "vuex": "^2.0.0",
    "webpack": "^2.1.0-beta.25",
    "webpack-dev-server": "^2.1.0-beta.0"
  }
}
```

##### webpack.config.js
```javascript
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
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
  output: {
    path: path.resolve(__dirname, './public/dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
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
```

##### assets.js
```javascript
let jsPath = './resources/assets/js/'
let cssPath = './resources/assets/sass/'

module.exports.assets = {
  // laravel 5.x
  'App\\Http\\Controllers\\IndexController@getIndex': [ jsPath+'app.js' ],

  // Yii 2 MainContoller actionIndex
  // 'mainindex': [ jsPath+'app.js' ]

  admincss: [ cssPath+'app.scss' ]
}
```

##### example.layout.php
```php
<?php

$cssfile = '/dist/' . md5('admincss') . '.css';

// laravel 5.x
$file = md5(Route::getCurrentRoute()->getActionName()).'.js';
$fileflag = 'dist/'.$file;
$filepath = public_path($fileflag);
$jsfile = is_file($filepath) ? asset($fileflag) : '';

// Yii 2
$file = md5(Yii::$app->controller->id . Yii::$app->controller->action->id) . '.js';
$fileflag = '/dist/' . $file;
$filepath = Yii::getAlias('@webroot') . $fileflag;
$jsfile = is_file($filepath) ? $fileflag : '';

?>

<!DOCTYPE html>
<html>
<head>
    <link href="<?= $cssfile ?>" rel="stylesheet">
</head>
<body>

    <script src="<?= $jsfile ?>"></script>

</body>
</html>
```
