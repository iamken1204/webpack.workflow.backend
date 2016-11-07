# Webpack workflow for Yii2

## Steps

* copy all files to corresponding path in your yii2 basic app.
* install dependencies :point_down:

```bash
# WORK_DIR=/path/to/your/yii/app
npm i
composer require vlucas/phpdotenv
vim .env
```

* `.env`

```
# dev | prod
ASSET_ENV=dev
```
