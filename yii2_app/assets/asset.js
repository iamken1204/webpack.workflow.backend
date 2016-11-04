/*
default assets naming format: <moduleName><controllerName><actionName>.js|css

examples:
- You are at page rendered by app\controllers\SiteController->actionIndex() (the basic module)
  src="/dist/<?= md5('basicsite.index') ?>.js"
- You are at page rendered by app\modules\control\controllers\employee\leave\MainController->actionIndex() (the control module)
  src="/dist/<?= md5('controlemployee/leave/main.index') ?>.js"
 */


/**
 * The root path of js and css files.
 * All assets should be located under this path.
 * @type {String}
 */
module.exports.basePath = './assets/'

/**
 * Assets setting: modules.
 * format
   {
     < moduleName >: {
       < controllerName + actionName >: ['assetFile1', 'assetFile2', ...],
     }
   }
 * @type {Object}
 */
module.exports.modules = {
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
module.exports.assets = {
  vendors: [
    'modules/basic/vendors/app/css/app.css',
    'modules/basic/vendors/app/js/app.js',
  ],
}
