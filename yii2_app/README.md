# Webpack workflow for Yii2

## Steps

* copy all files to corresponding path in your yii2 basic app.
* install dependencies :point_down:

```bash
# WORK_DIR=/path/to/your/yii/app
npm i
composer require vlucas/phpdotenv
mv .env.example .env
# if the ASSET_ENV === 'prod', webpack will md5 chumk name
```
