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
