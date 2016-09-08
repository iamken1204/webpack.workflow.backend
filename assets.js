let jsPath = './resources/assets/js/'
let cssPath = './resources/assets/sass/'

module.exports.assets = {
  // laravel 5.x
  'App\\Http\\Controllers\\IndexController@getIndex': [ jsPath+'app.js' ],

  // Yii 2 MainContoller actionIndex
  // 'mainindex': [ jsPath+'app.js' ]

  admincss: [ cssPath+'app.scss' ]
}
