/*
default assets naming format: <moduleName><controllerName>.<actionName>.js|css
examples:
- You are at page rendered by app\controllers\SiteController->actionIndex() (the basic module)
  src="/dist/<?= md5('basicsite.index') ?>.js"
- You are at page rendered by app\modules\control\controllers\employee\leave\MainController->actionIndex() (the control module)
  src="/dist/<?= md5('controlemployee/leave/main.index') ?>.js"
 */

var md5 = require('md5')
// Get ASSET_ENV from .env file,
// md5 chunk names if ASSET_ENV is 'prod'.
require('dotenv').config()
console.log('Processing under environment:', process.env.ASSET_ENV)

/**
 * Assets setting: modules.
 * format
   {
     < moduleName >: require('./modules/< moduleName >/asset'),
     ...
   }
 * @type {Object}
 */
let modules = {
  basic: require('./modules/basic/asset'),
}

/**
 * Assets setting: special assets are not belong to modules.
 * format
   {
     < key >: ['assetFile1', 'assetFile2', ...],
   }
 * @type {Object}
 */
let assets = {
  vendors: [
    'modules/basic/vendors/app/css/app.css',
    'modules/basic/vendors/app/js/app.js',
  ],
}

/**
 * The root path of js and css files.
 * All assets should be located under this path.
 * @type {String}
 */
module.exports.basePath = './assets/'

/**
 * getEntry returns arranged entry object
 * @return object
 */
module.exports.getEntry = function () {
  let entry = {}
  // flat modules' assets
  for (moduleName in modules) {
    for (chunkName in modules[moduleName]) {
      let key = moduleName + chunkName
      let hash = process.env.ASSET_ENV==='prod' ? md5(key) : key
      entry[hash] = modules[moduleName][chunkName]
    }
  }
  for (chunkName in assets) {
    entry[chunkName] = assets[chunkName]
  }
  return entry
}
